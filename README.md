# Basic Usage
Copy and paste the bookmarklet code into your bookmarks. Open the bookmark to activate.  
If you want to use a bookmark on secure websites like Facebook or Gmail, you must use the source code available above (prepended with `javascript:`).
## 3D.js
View a website in 3D layers.
#### Code
```javascript
javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.src="https://rawgit.com/Krazete/bookmarklets/master/3D.js";js.onerror=function(){alert("Sorry; "+location.host+" the script could not be loaded.");}})();
```
#### Usage
After activating, view the menu in the top left corner.
## Piano.js
Add a piano to any website.
#### Code
```javascript
javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.src="https://rawgit.com/Krazete/bookmarklets/master/piano.js";js.onerror=function(){alert("Sorry; "+location.host+" the script could not be loaded.");}})();
```
#### Usage
Control the wave type, octave level, and axis tilt in the left menu.
- can also control octave level with left and right keyboard arrows
- can also control tilt with up and down keyboard arrows

Control playback in the right menu.
- "# ▶" is a play button
- "# ◼" is a stop button
- "↻ #" is the history playback button
- "✖" is to delete a disc or clear history
  - can also clear history with spacebar
- "⬇" is to save history as a a disc
- "⬆︎" is to export all saved discs
  - only useful with a local copy of the full code
