# 3D.js
View a website in 3D layers.
## Use
1. Select and drag (or copy and paste) the following code into your bookmarks.
```javascript
javascript:(function(){document.body.appendChild(document.createElement("script")).src="https://rawgit.com/Krazete/bookmarklets/master/3D.js"})();
```
# Piano.js
A piano on any website with a click of a button (with basic recording functionality).
## Use
1. Select and drag (or copy and paste) the following code into your bookmarks.
```javascript
javascript:(function(){document.body.appendChild(document.createElement("script")).src="https://rawgit.com/Krazete/bookmarklets/master/piano.js"})();
```
2. Go on another website that doesn't have shortcut keys (e.g. not GitHub, Youtube, nor Facebook).
3. Click the bookmark.
4. Turn up the volume and press some keys.
## Recording
- Clear history with Spacebar.
- Play history with Enter.
# YTScroller.js
Allows the user to watch and read comments simultaneously.
## Use
Option 1: Select and drag (or copy and paste) the following code into your bookmarks.
```javascript
javascript:(function(){document.body.appendChild(document.createElement("script")).src="https://rawgit.com/Krazete/bookmarklets/master/ytscroller.js"})();
```
Option 2: Download a JavaScript Injector browser extension and paste in this code:
```javascript
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
```
