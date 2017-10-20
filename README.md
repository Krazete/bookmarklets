# Basic Usage
Copy and paste the bookmarklet code into your bookmarks. Open the bookmark to activate.  
If you want to use a bookmark on secure websites like Facebook or Gmail, you must use the source code available above (prepended with `javascript:`).
## 3D.js
View a website in 3D layers.
#### Code
```javascript
javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.onerror=function(){alert("Sorry, the script could not be loaded.")};js.src="https://rawgit.com/Krazete/bookmarklets/master/3D.js"})();
```
#### Usage
After activating, view the menu in the top left corner.
## Piano.js
Add a piano to any website.
#### Code
```javascript
javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.onerror=function(){alert("Sorry, the script could not be loaded.")};js.src="https://rawgit.com/Krazete/bookmarklets/master/piano.js"})();
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
  
### Screenshot

![](http://g.recordit.co/2UesqAFJDi.gif)

## Tic.js
A game of ultimate tic-tac-toe.
#### Code
```javascript
javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.onerror=function(){alert("Sorry, the script could not be loaded.")};js.src="https://rawgit.com/Krazete/bookmarklets/master/tic.js"})();
```
#### Usage
The rules are explained [here](https://mathwithbaddrawings.com/2013/06/16/ultimate-tic-tac-toe/).
## Lupire.js
A replicated Lumosity game.
#### Code
```javascript
javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.onerror=function(){alert("Sorry, the script could not be loaded.")};js.src="https://rawgit.com/Krazete/bookmarklets/master/lupire.js"})();
```
#### Usage
See Lumosity's [pinball recall game](https://www.lumosity.com/brain-games/pinball-recall).
## YTScroller.js
Watch a video and read comments simultaneously.
#### Bookmarklet Code
```javascript
javascript:(function(){document.body.appendChild(document.createElement("script")).src="https://rawgit.com/Krazete/bookmarklets/master/ytscroller.js"})();
```
#### Usage
Active this bookmarklet upon first loading YouTube.  
You can also use the source code with a userscript app like TamperMonkey to make this automatic.
## YTSentiment.js
Check multiple videos' like statuses all at once (to avoid clickbait and such).
#### Bookmarklet Code
```javascript
javascript:(function(){document.body.appendChild(document.createElement("script")).src="https://rawgit.com/Krazete/bookmarklets/master/ytsentiment.js"})();
```
#### Usage
Activate this bookmarklet on any YouTube page with multiple video links.
- green: #(likes) > #(dislikes)
- murky green: #(likes) == #(dislikes)
- red: #(likes) < #(dislikes)
