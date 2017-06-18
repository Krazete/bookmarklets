javascript:
function ytscroller() {
	var theater = document.getElementById("theater-background").getBoundingClientRect();
	var masthead = document.getElementById("masthead-positioner");
	var video = document.getElementById("player-api");
	/* reset styles to accurately compute theater height */
	masthead.removeAttribute("style");
	video.removeAttribute("style");
	if (document.body.scrollTop > theater.height) {
		var sidebar = document.getElementById("watch7-sidebar").getBoundingClientRect();
		var masthead_box = masthead.getBoundingClientRect();
		var video_box = video.getBoundingClientRect();
		/* get maximum possible video size without overlapping comments (unless window is too small) */
		var widthRatio = Math.max(sidebar.width - 55, innerWidth - (sidebar.left - 55)) / video_box.width;
		var flushRight = (innerWidth - video_box.right) / widthRatio;
		masthead.style.zIndex = 999;
		video.style.position = "fixed";
		video.style.top = masthead_box.height + "px";
		video.style.transform = "scale(" + widthRatio + ") translate(" + flushRight + "px)";
		video.style.transformOrigin = "100% 0";
		video.style.zIndex = 1000;
	}
}
document.body.onscroll = ytscroller;
document.body.onresize = ytscroller;
