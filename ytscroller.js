/* keep video on top right when scrolling */
function videoAnchor() {
	var miniplayer = document.getElementsByClassName("miniplayer")[0];
	if (miniplayer.parentElement.active) {
		return;
	}
	var player = document.getElementById("movie_player");
	var video = document.getElementsByTagName("video")[0];
	var control = document.getElementsByClassName("ytp-chrome-bottom")[0];
	var mastRect = document.getElementById("masthead-container").getBoundingClientRect();
	var theaterRect = document.querySelector("#player-container.ytd-watch-flexy").getBoundingClientRect();
	player.removeAttribute("style"); /* reset for theaterRect height */
	var playerRect = player.getBoundingClientRect();
	var videoRect = video.getBoundingClientRect();
	if (theaterRect.bottom < mastRect.height) {
		var comment = (
			document.getElementById("primary-inner") ||
			document.getElementById("primary")
		);
		var commentRect = comment.getBoundingClientRect();
		var minRatio = 320 / videoRect.width;
		var widthRatio = (window.innerWidth - commentRect.right) / videoRect.width;
		var heightRatio = (window.innerHeight - mastRect.height) / videoRect.height;
		player.style.position = "fixed";
		player.style.right = "0";
		player.style.top = mastRect.height + "px";
		player.style.width = videoRect.width + "px";
		player.style.height = videoRect.height + "px";
		player.style.transformOrigin = "right top";
		player.style.transform = "scale(" + Math.max(minRatio, Math.min(widthRatio, heightRatio)) + ")";
		player.style.zIndex = "1500";
		control.style.left = "12px";
		control.style.width = (videoRect.width - 24) + "px";
		video.style.left = 0;
	}
	else {
		control.style.left = "12px";
		control.style.width = (playerRect.width - 24) + "px";
		video.style.left = (playerRect.width - videoRect.width) / 2 + "px";
	}
}
window.addEventListener("scroll", videoAnchor);
window.addEventListener("resize", videoAnchor);

/* keep scroll position on timestamp click */
/* and add a scroll position return button in case it doesn't work */
(function () {
	var x, y;
	var returner = document.createElement("div");
	returner.textContent = "▼";
	returner.style.background = "red";
	returner.style.color = "white";
	returner.style.fontSize = "24px";
	returner.style.position = "absolute";
	returner.style.left = "50%";
	returner.style.top = "0";
	returner.style.transform = "translateX(-50%)";
	returner.style.display = "none";
	returner.style.borderRadius = "0 0 8px 8px";
	returner.style.zIndex = "8000";
	returner.style.cursor = "pointer";
	document.body.appendChild(returner);

	function returnToStamp() {
		returner.style.display = "none";
		window.scrollTo(x, y);
	}

	function scrollAnchor(e) {
		var a = e.target.closest("a");
		var t0;
		function scrollToXY(t1) {
			window.scrollTo(x, y);
			if (typeof t0 == "undefined") {
				t0 = t1;
			}
			if (t1 - t0 < 1) {
				requestAnimationFrame(scrollToXY);
			}
		}
		if (a && /[?&]t=\d+s/.test(a.href)) {
			x = window.scrollX;
			y = window.scrollY;
			returner.style.display = "block";
			requestAnimationFrame(scrollToXY);
		}
	}

	window.addEventListener("mouseup", scrollAnchor);
	returner.addEventListener("click", returnToStamp);
})();
