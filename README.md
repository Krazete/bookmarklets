# Basic Usage
Select and drag (or copy and paste) the bookmarklet code into your bookmarks.  
Open the bookmark to activate.
## 3D.js
View a website in 3D layers.
#### Code
```javascript
javascript:(function(){document.body.appendChild(document.createElement("script")).src="https://rawgit.com/Krazete/bookmarklets/master/3D.js"})();
```
#### Usage
After activating, view the menu in the top left corner.
## Piano.js
A piano on any website with a click of a button (with basic recording functionality).
#### Code
```javascript
javascript:(function(){document.body.appendChild(document.createElement("script")).src="https://rawgit.com/Krazete/bookmarklets/master/piano.js"})();
```
#### Usage
Control the wave type, octave level, and axis tilt in the left menu.
- can also control pitch with left and right keyboard arrows
- can also control tilt with up and down keyboard arrows

Control playback in the right menu.
- "# ▶" is a play button
- "# ◼" is a stop button
- "↻ #" is the history playback button
- "✖" is to delete a disc or clear history
  - can also clear history with spacebar
- "⬇" is to save history as a a disc
- "⬆︎" is to export all saved discs
  - only useful with full code at hand
## YTScroller.js
Allows the user to watch and read comments simultaneously.
#### Bookmarklet Code
```javascript
javascript:(function(){document.body.appendChild(document.createElement("script")).src="https://rawgit.com/Krazete/bookmarklets/master/ytscroller.js"})();
```
#### UserScript Code
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
#### Usage
To use the bookmarklet code, just open upon visiting YouTube.  
To use the userscript code, download a userscript browser extension and copy the code above into that app.
