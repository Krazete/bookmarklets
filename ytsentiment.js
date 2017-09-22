Array.from(document.getElementsByTagName("ytd-video-renderer"))
.concat(Array.from(document.getElementsByTagName("ytd-grid-video-renderer")))
.concat(Array.from(document.getElementsByTagName("ytd-compact-video-renderer")))
.forEach(function(e) {
	var link = e.querySelector("#thumbnail").href;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", link, true);
	xhr.onload = function() {
		var match = this.responseText.match(/"percentIfIndifferent":(\d+),/);
		var rating = parseInt(match[1] / 100 * 256);
		e.style.background = "rgb(" + (256 - rating) + ", " + rating + ", 0)";
		setTimeout(function() {
			e.style.transition = "background 1s";
			e.style.background = "";
		}, 10000);
		setTimeout(function() {
			e.style.transition = "";
		}, 1000);
    };
	xhr.send();
});
