# Piano Bookmarklet
A piano on any website with a click of a button (with basic recording functionality).
## Use
1. Select and drag (or copy and paste) the following code into your bookmarks.

```
javascript:var fo=prompt("Frequency Offset:",29),piano={audio:new AudioContext,initTime:0,keys:["`","Tab","1","q","2","w","3","e","r","5","t","6","y","u","8","i","9","o","0","p","[","=","]","Backspace","\\","ShiftLeft","a","z","s","x","d","c","v","g","b","h","n","m","k",",","l",".",";","/","ShiftRight"],history:[],note:function(a,b){var c=this.keys.indexOf(a);b&&this.history.push({key:a,time:this.audio.currentTime-this.initTime});var d=this.audio.createGain();d.connect(this.audio.destination);var e=this.audio.createOscillator();e.frequency.value=c<0?0:440*Math.pow(2,(c-fo)/12),e.type="triangle",e.connect(d),e.start();var f=15;d.gain.exponentialRampToValueAtTime(1/Number.MAX_SAFE_INTEGER,this.audio.currentTime+f),setTimeout(a=>e.disconnect(),1e3*f),setTimeout(a=>d.disconnect(),1e3*f)},playHistory:function(){this.history.forEach(function(a){setTimeout(b=>piano.note(a.key,!1),1e3*a.time)})},clearHistory:function(){this.history=[],this.initTime=this.audio.currentTime},init:function(){document.addEventListener("keydown",function(a){var b=1==a.key.length?a.key.toLowerCase():a.code;piano.keys.includes(b)&&piano.note(b,!0)," "==b&&piano.clearHistory(),"Enter"==b&&piano.playHistory()})}};piano.init();
```

2. Go on another website that doesn't have shortcut keys (e.g. not GitHub, Youtube, nor Facebook).
3. Click the bookmark.
4. Turn up the volume and press some keys.
## Recording
- Clear history with Spacebar.
- Play history with Enter.
