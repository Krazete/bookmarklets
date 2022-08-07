(function () {
if (!document.querySelector("#ytls-pane")) {
var pane = document.createElement("div");
var exit = document.createElement("span");
var list = document.createElement("ul");
var nowli = document.createElement("li");
var nowa = document.createElement("a");
var nowid;
var nowtext = document.createElement("input");
var box = document.createElement("textarea");
var buttons = document.createElement("div");
var paster = document.createElement("button");
var adder = document.createElement("button");
var firstcopy = true;
var copier = document.createElement("button");
var style = document.createElement("style");

function closePane() {
	if (confirm("Close timestamp tool?")) {
		pane.remove();
		cancelAnimationFrame(nowid);
		window.removeEventListener("beforeunload", warn);
	}
}

function updateStamp(stamp, time) {
	stamp.innerHTML = formatTime(time);
	stamp.dataset.time = time;
	stamp.href = "https://youtu.be/" + location.search.split(/.+v=|&/)[1] + "?t=" + time;
}

function clickStamp(e) {
	if (e.target.dataset.time) {
		e.preventDefault();
		document.querySelector("video").currentTime = e.target.dataset.time;
	}
	else if (e.target.dataset.increment) {
		e.preventDefault();
		var li = e.target.parentElement;
		var a = li.children[2];
		var time = parseInt(a.dataset.time) + parseInt(e.target.dataset.increment);
		updateStamp(a, time);
	}
}

function watchTime() {
	try {
		var time = Math.floor(document.querySelector("video").duration);
		updateStamp(nowa, time);
	} catch (e) {}
	nowid = requestAnimationFrame(watchTime);
}

function unformatTime(stamp) {
	var hms = stamp.split(":").map(e => parseInt(e));
	if (hms.length < 3) {
		return 60 * hms[0] + hms[1];
	}
	return 3600 * hms[0] + 60 * hms[1] + hms[2];
}
	
function newLi(time, note) {
	var li = document.createElement("li");
	var minus = document.createElement("span");
	var plus = document.createElement("span");
	var a = document.createElement("a");
	var text = document.createElement("input");
	minus.innerHTML = "➖";
	minus.dataset.increment = -1;
	plus.innerHTML = "➕";
	plus.dataset.increment = 1;
	updateStamp(a, time);
	li.appendChild(minus);
	li.appendChild(plus);
	li.appendChild(a);
	li.appendChild(text);
	list.appendChild(li);
	return text;
}

function pasteList() {
	var lines = box.value.split("\n");
	list.innerHTML = "";
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i].trim();
		var stamp = line.split(/\s+/, 1)[0];
		var time = unformatTime(stamp);
		var note = line.slice(stamp.length + 1);
		var text = newLi(time, note);
		text.value = note;
	}
	list.appendChild(nowli);
}

function formatTime(time) {
	var h = Math.floor(time / 3600);
	var m = Math.floor(time / 60) % 60;
	var s = Math.floor(time) % 60;
	return (h ? (h + ":" + String(m).padStart(2, 0)) : m) + ":" + String(s).padStart(2, 0);
}

function addStamp() {
	var time = Math.max(0, Math.floor(document.querySelector("video").currentTime - 5));
	var text = newLi(time);
	list.appendChild(nowli);
	text.focus();
}

function resetCopier() {
	firstcopy = true;
	copier.innerHTML = "Copy List";
}

function copyList() {
	var string = "";
	if (firstcopy) {
		firstcopy = false;
		copier.innerHTML = "Copy Links";
		setTimeout(resetCopier, 500);
		for (var i = 0; i < list.children.length - 1; i++) {
			var stamp = list.children[i].children[2].innerHTML;
			var note = list.children[i].children[3].value;
			string += (i > 0 ? "\n" : "") + (stamp + " " + note).trim();
		}
	}
	else {
		resetCopier();
		for (var i = 0; i < list.children.length - 1; i++) {
			var stamp = list.children[i].children[2].href;
			var note = list.children[i].children[3].value;
			string += (i > 0 ? "\n" : "") + (note + " " + stamp).trim();
		}
	}
	box.value = string;
	box.select();
	document.execCommand("copy");
}

function warn(e) {
	e.preventDefault();
	e.returnValue = "Close timestamp tool?";
	return e.returnValue;
}

pane.id = "ytls-pane";
exit.innerHTML = "&times;";
watchTime();
nowtext.disabled = true;
nowtext.value = "End of Video";
box.id = "ytls-box";
buttons.id = "ytls-buttons";
paster.innerHTML = "Import List";
adder.innerHTML = "Add Timestamp";
copier.innerHTML = "Copy List";
style.innerHTML = `
	#ytls-pane {
		background: rgba(0,0,0,.5);
		text-align: right;
		position: fixed;
		bottom: 0;
		padding: 0 5px;
		opacity: .5;
		z-index: 5000;
	}
	#ytls-pane:hover {
		opacity: 1;
	}
	#ytls-pane span {
		cursor: pointer;
	}
	#ytls-pane ul {
		list-style: none;
	}
	#ytls-pane span, #ytls-pane a, #ytls-pane input {
		background: none;
		color: white;
		font-family: inherit;
		font-size: initial;
		text-decoration: none;
		border: none;
		outline: none;
	}
	#ytls-box {
		font-family: monospace;
		width: 100%;
		display: block;
		padding: 0;
		border: none;
		outline: none;
		resize: none;
	}
	#ytls-buttons {
		display: flex;
	}
	#ytls-buttons button {
		background: transparent;
		color: white;
		font-size: 12px;
		flex: auto;
		padding: 2px;
		border: 1px solid white;
	}
`;

exit.addEventListener("click", closePane);
list.addEventListener("click", clickStamp);
list.addEventListener("touchstart", clickStamp);
paster.addEventListener("click", pasteList);
adder.addEventListener("click", addStamp);
copier.addEventListener("click", copyList);
window.addEventListener("beforeunload", warn);

pane.appendChild(exit);
nowli.appendChild(nowa);
nowli.appendChild(nowtext);
list.appendChild(nowli);
pane.appendChild(list);
pane.appendChild(box);
buttons.appendChild(paster);
buttons.appendChild(adder);
buttons.appendChild(copier);
pane.appendChild(buttons);
pane.appendChild(style);
document.body.appendChild(pane);

box.focus();
}})();
