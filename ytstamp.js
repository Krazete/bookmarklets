var timestamps = document.createElement("div");
var time = 0;

function watchTime() {
	var video = document.getElementsByTagName("video")[0];
	time = Math.floor(video.currentTime);
	requestAnimationFrame(watchTime);
}

function formatTime(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds / 60) - 60 * h;
    var s = Math.floor(seconds) - 60 * m - 3600 * h;
    return (h ? (h + ":" + String(m).padStart(2, 0)) : m) + ":" + String(s).padStart(2, 0);
}

function saveTimestamp(e) {
	if (e.target.href && e.target.href.match(/[?&]t=\d/)) {
		if (e.target.parentElement == timestamps) {
			e.preventDefault();
			var video = document.getElementsByTagName("video")[0];
			video.currentTime = e.target.dataset.t;
		}
		var v = location.search.match(/v=([^&]+)/)[1];
		var a = document.createElement("a");
		a.href = "/watch?v=" + v + "&t=" + time;
		a.dataset.t = time;
		a.innerHTML = formatTime(time);
		timestamps.appendChild(a);
		timestamps.scrollTo(0, 0);
	}
}

timestamps.style.background = "white";
timestamps.style.position = "fixed";
timestamps.style.maxHeight = "90%";
timestamps.style.bottom = "0";
timestamps.style.fontFamily = "Helvetica";
timestamps.style.fontSize = "16px";
timestamps.style.lineHeight = "20px";
timestamps.style.color = "pink";
timestamps.style.display = "flex";
timestamps.style.padding = "4px";
timestamps.style.flexDirection = "column-reverse";
timestamps.style.overflow = "scroll";
document.body.appendChild(timestamps);

watchTime();

window.addEventListener("click", saveTimestamp);
