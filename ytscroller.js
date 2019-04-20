(function () {
	/* keep video on top right when scrolling */
	function videoAnchor() {
		var mastRect = document.getElementById("masthead-container").getBoundingClientRect();
		var theaterRect = document.getElementById("player-container").getBoundingClientRect();
		var player = document.getElementById("movie_player");
		var video = document.getElementsByTagName("video")[0];
		player.removeAttribute("style"); /* reset for theaterRect height */
		if (theaterRect.bottom < mastRect.height) {
			var commentRect = document.getElementById("main").getBoundingClientRect();
			var sideRect = document.getElementById("related").getBoundingClientRect();
			var videoRect = video.getBoundingClientRect();
			var widthRatio = Math.max(
				window.innerWidth - commentRect.right,
				window.innerWidth - sideRect.left
			) / videoRect.width;
			player.style.position = "fixed";
			player.style.right = 0;
			player.style.top = mastRect.height + "px";
			player.style.width = videoRect.width + "px";
			player.style.height = videoRect.height + "px";
			player.style.transformOrigin = "right top";
			player.style.transform = "scale(" + widthRatio + ")";
			player.style.zIndex = 1;
		}
	}
	/* keep scroll position on timestamp click */
	function scrollAnchor() {
		var x = window.scrollX;
		var y = window.scrollY;
		requestAnimationFrame(function () {
			window.scrollTo(x, y);
		});
	}
	window.addEventListener("scroll", videoAnchor);
	window.addEventListener("resize", videoAnchor);
	window.addEventListener("click", scrollAnchor);
})();
