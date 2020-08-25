(function () {
var panel = document.createElement("div");
var list = document.createElement("ul");
var nowli = document.createElement("li");
var nowa = document.createElement("a");
var nowtext = document.createElement("input");
var textarea = document.createElement("textarea");
var buttonImport = document.createElement("input");
var buttonAdd = document.createElement("input");
var buttonCopy = document.createElement("input");
var style = document.createElement("style");

function clickStamp(e) {
	if (typeof e.target.dataset.time != "undefined") {
		e.preventDefault();
		var video = document.querySelector("video");
		video.currentTime = e.target.dataset.time;
	}
}

function watchTime() {
	var video = document.querySelector("video");
	var time = Math.floor(video.getDuration());

	nowa.href = "https://youtu.be/" + location.search.split(/=|&/)[1] + "?t=" + time;
	nowa.dataset.time = time;
	nowa.innerHTML = formatTime(time);

	setTimeout(e => requestAnimationFrame(watchTime), 500);
}

function unformatTime(stamp) {
	var hms = stamp.split(":").map(e => parseInt(e));
	if (hms.length == 3) {
		return 3600 * hms[0] + 60 * hms[1] + hms[2];
	}
	return 60 * hms[0] + hms[1];
}

function importList() {
	var lines = textarea.value.split("\n");
	list.innerHTML = "";
	for (var i = 0; i < lines.length; i++) {
		var stamp = lines[i].split(" ", 1)[0];
		var time = unformatTime(stamp);
		var note = lines[i].slice(stamp.length + 1);

		var li = document.createElement("li");

		var a = document.createElement("a");
		a.href = "https://youtu.be/" + location.search.split(/=|&/)[1] + "?t=" + time;
		a.dataset.time = time;
		a.innerHTML = stamp;
		li.appendChild(a);

		var text = document.createElement("input");
		text.type = "text";
		text.value = note;
		li.appendChild(text);

		list.appendChild(li);
	}
	list.appendChild(nowli);
}

function formatTime(t) {
	var h = Math.floor(t / 3600);
	var m = Math.floor(t / 60) % 60;
	var s = Math.floor(t) % 60;
	return (h ? (h + ":" + String(m).padStart(2, 0)) : m) + ":" + String(s).padStart(2, 0);
}

function addStamp() {
	var video = document.querySelector("video");
	var time = Math.max(0, Math.floor(video.getCurrentTime()) - 5);

	var li = document.createElement("li");

	var a = document.createElement("a");
	a.href = "https://youtu.be/" + location.search.split(/=|&/)[1] + "?t=" + time;
	a.dataset.time = time;
	a.innerHTML = formatTime(time);
	li.appendChild(a);

	var text = document.createElement("input");
	text.type = "text";
	li.appendChild(text);

	list.appendChild(li);
	list.appendChild(nowli);

	text.focus();
}

function copyList() {
	var string = "";
	for (var i = 0; i < list.children.length - 1; i++) {
		var child = list.children[i];
		var stamp = child.children[0].innerHTML;
		var note = child.children[1].value;
		string += (i > 0 ? "\n" : "") + stamp + " " + note;
	}
	textarea.value = string;
	textarea.select();
	document.execCommand("copy");
}

panel.id = "ytstamper-panel";

list.id = "ytstamper-list";
list.addEventListener("click", clickStamp);
panel.appendChild(list);

watchTime();
nowli.appendChild(nowa);
nowli.appendChild(nowtext);
nowtext.type = "text";
nowtext.disabled = true;
nowtext.value = "End of Video";
list.appendChild(nowli);

textarea.id = "ytstamper-textarea";
panel.appendChild(textarea);

buttonImport.type = "button";
buttonImport.value = "Import List";
buttonImport.addEventListener("click", importList);
panel.appendChild(buttonImport);

buttonAdd.type = "button";
buttonAdd.value = "Add Timestamp";
buttonAdd.addEventListener("click", addStamp);
panel.appendChild(buttonAdd);

buttonCopy.type = "button";
buttonCopy.value = "Copy List";
buttonCopy.addEventListener("click", copyList);
panel.appendChild(buttonCopy);

style.innerHTML = `
	#ytstamper-panel {
		background: #0004;
		position: fixed;
		left: 0;
		bottom: 0;
		padding: 5px;
		z-index: 356;
	}
	#ytstamper-list {
		text-align: right;
	}
	#ytstamper-list a {
		color: white;
		font-family: inherit;
		font-size: initial;
		text-decoration: none;
	}
	#ytstamper-list input {
		background: none;
		color: white;
		font-family: inherit;
		font-size: initial;
		border: none;
		outline: none;
	}
	#ytstamper-list input:focus {
		border-color: pink;
	}
	#ytstamper-textarea {
		width: 100%;
		display: block;
		padding: 0;
		border: none;
	}
`;
panel.appendChild(style);

document.body.appendChild(panel);

function holup(e) {
    e.preventDefault();
    e.returnValue = "Be sure to copy your timestamp list before leaving.";
    return e.returnValue;
}

window.addEventListener("beforeunload", holup);
})();

