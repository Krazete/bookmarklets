# Usage
Copy and paste the source code (linked in the titles) prepended with `javascript:` into your bookmarks and open the bookmark to activate it.  
For example, the source code `function example() {};` should look like `javascript: function example() {};` when saving it as a bookmark.  
You may need something like [JSCompress](https://jscompress.com/) or [JSObfuscate](https://www.cleancss.com/javascript-obfuscate/) if character limit is an issue.

# [Tri.js](https://raw.githubusercontent.com/Krazete/bookmarklets/master/tri.js)
View a webpage in 3D layers.  
Includes a settings menu in the top left corner.

![tri](https://github.com/Krazete/bookmarklets/blob/master/gif/dithered/tri.gif)

# [Piano.js](https://raw.githubusercontent.com/Krazete/bookmarklets/master/piano.js)
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
  
![piano](https://github.com/Krazete/bookmarklets/blob/master/gif/dithered/piano.gif)

# [MouseLight.js](https://raw.githubusercontent.com/Krazete/bookmarklets/master/mouselight.js)
Simulate a flashlight. Works best on websites whose HTML elements are deeply nested.

![mouselight](https://github.com/Krazete/bookmarklets/blob/master/gif/dithered/mouselight.gif)

# [Tic.js](https://raw.githubusercontent.com/Krazete/bookmarklets/master/tic.js)
A game of ultimate tic-tac-toe.  
The rules are explained [here](https://mathwithbaddrawings.com/2013/06/16/ultimate-tic-tac-toe/).

![tic](https://github.com/Krazete/bookmarklets/blob/master/gif/dithered/tic.gif)

# [Lupire.js](https://raw.githubusercontent.com/Krazete/bookmarklets/master/lupire.js)
A replicated Lumosity game.  
See Lumosity's [pinball recall](https://www.lumosity.com/brain-games/pinball-recall).

![lupire](https://github.com/Krazete/bookmarklets/blob/master/gif/dithered/lupire.gif)

# [YTSentiment.js](https://raw.githubusercontent.com/Krazete/bookmarklets/master/ytsentiment.js)
Preview multiple videos' like statuses all at once.  
This is more useful with a userscript manager like TamperMonkey.

![ytsentiment](https://github.com/Krazete/bookmarklets/blob/master/gif/dithered/ytsentiment.gif)

# [YTScroller.js](https://raw.githubusercontent.com/Krazete/bookmarklets/master/ytscroller.js)
Watch a video and read comments simultaneously.  
This is more useful with a userscript manager like TamperMonkey.

![ytscroller](https://github.com/Krazete/bookmarklets/blob/master/gif/dithered/ytscroller.gif)

# [YTStamp.js](https://raw.githubusercontent.com/Krazete/bookmarklets/master/ytstamp.js)
Keep a time history so you can return to normal viewing after clicking a timestamp.  
Recommended to pair with YTScroller.js due to its scrollAnchor function.  
Not recommended to pair with YTLiveStamper.js due to overlap.

# [YTLiveStamper.js](https://raw.githubusercontent.com/Krazete/bookmarklets/master/ytlivestamper.js)
Record timestamps during a livestream.  
Here's an explanation of the parts of the YTLiveStamper panel:

- Stamplist
  - left side has clickable timestamps with copyable urls
  - right side is for notes and comments
- "End of Video" Timestamp
  - always at the bottom of the stamplist
  - it's there so you can return to real time after checking a past timestamp
  - usually useless since most live streams don't allow backtracking in the first place
- "Import List" Button
  - reads textbox to create new stamplist
  - useful if you need to refresh the page or adjust timestamp times
  - *note: overwrites stamplist*
- "Add Timestamp" Button
  - adds current time (minus 5 seconds) to stamplist
- "Copy List" Button
  - writes stamplist to textbox
  - copies textbox to clipboard
  - *note: overwrites clipboard*

# [Pop.js](https://raw.githubusercontent.com/Krazete/bookmarklets/master/pop.js)
Toggle picture-in-picture mode with one click.  
Useful for pages with a single video element (e.g. YouTube) but not for pages with multiple (e.g. Reddit).
