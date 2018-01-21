# Usage
Copy and paste the corresponding code into your bookmarks and open the bookmark to activate it.  
To use a bookmark on secure websites (e.g. Facebook, GitHub, and Gmail), you must use the source code available above (prepended with `javascript:`).  
The YT bookmarklets are more useful with code-injector browser extensions such as TamperMonkey.

# Wafers.js
View a webpage in 3D layers.  
Includes a settings menu in the top left corner.
```javascript
javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.onerror=function(){alert("Sorry, the script could not be loaded.")};js.src="https://rawgit.com/Krazete/bookmarklets/master/wafers.js"})();
```

# Piano.js
Add a piano to any webpage.  
The left menu allows you to adjust:
- wave type
- octave level
  - can also use left and right keyboard arrows
- axis tilt
  - can also use  up and down keyboard arrows

The right menu has the following buttons:
- \[# ▶\]: play button
- \[# ◼\]: stop button
- \[↻ #\]: history playback button
- \[✖\]: delete a disc or clear history
  - can also clear history with spacebar
- \[⬇\]: save history as a a disc
- \[⬆︎\]: export all saved discs
  - only useful with a local copy of the source code (e.g. me and pull requesters)
```javascript
javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.onerror=function(){alert("Sorry, the script could not be loaded.")};js.src="https://rawgit.com/Krazete/bookmarklets/master/piano.js"})();
```

# Tic.js
A game of ultimate tic-tac-toe.  
The rules are explained [here](https://mathwithbaddrawings.com/2013/06/16/ultimate-tic-tac-toe/).
```javascript
javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.onerror=function(){alert("Sorry, the script could not be loaded.")};js.src="https://rawgit.com/Krazete/bookmarklets/master/tic.js"})();
```

# Lupire.js
A replicated Lumosity game.  
See Lumosity's [pinball recall](https://www.lumosity.com/brain-games/pinball-recall).
```javascript
javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.onerror=function(){alert("Sorry, the script could not be loaded.")};js.src="https://rawgit.com/Krazete/bookmarklets/master/lupire.js"})();
```

# YTScroller.js
Watch a video and read comments simultaneously.  
Active this bookmarklet upon first loading YouTube.  
You can also use the source code with a userscript app like TamperMonkey to make this automatic.
```javascript
javascript:(function(){document.body.appendChild(document.createElement("script")).src="https://rawgit.com/Krazete/bookmarklets/master/ytscroller.js"})();
```

# YTSentiment.js
Check multiple videos' like statuses all at once (to avoid clickbait and such).  
Activate this bookmarklet on any YouTube page with multiple video links.
- green: #(likes) > #(dislikes)
- murky green: #(likes) == #(dislikes)
- red: #(likes) < #(dislikes)
```javascript
javascript:(function(){document.body.appendChild(document.createElement("script")).src="https://rawgit.com/Krazete/bookmarklets/master/ytsentiment.js"})();
```
