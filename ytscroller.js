function ytscroller() {
	var masthead = document.getElementById("masthead-container").getBoundingClientRect();
	var theater = document.getElementById("player-container").getBoundingClientRect();
	var player = document.getElementById("movie_player");
	var video = document.getElementsByTagName("video")[0];
	var controls = document.getElementsByClassName("ytp-chrome-bottom")[0];
	/* reset style to accurately compute theater height */
	player.removeAttribute("style");
	if (theater.bottom < masthead.height) {
							var sidebar = document.getElementById("related").getBoundingClientRect();
							var player_box = player.getBoundingClientRect();
							var video_box = video.getBoundingClientRect();
							/* get maximum possible video size without overlapping comments (unless window is too small) */
							var widthRatio = Math.max(sidebar.width, innerWidth - sidebar.left) / video_box.width;
							var flushRight = (innerWidth - video_box.right) / widthRatio;
		player.style.position = "fixed";
		player.style.top = masthead.height + "px";
		player.style.right = "0px";
		player.style.width = video_box.width + "px";
		player.style.height = video_box.height + "px";
							video.style.left = "0px";
		controls.style.left = "12px";
		controls.style.width = (video_box.width - 24) + "px";
							player.style.transform = "scale(" + widthRatio + ")";
							player.style.transformOrigin = "100% 0";
							player.style.zIndex = 1000;
	}
}
window.addEventListener("scroll", ytscroller);
window.addEventListener("resize", ytscroller);
