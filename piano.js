javascript:
(function() {
var piano = {
	keymap: [
		"`", "Tab", "1", "q", "2", "w", "3", "e", "r", "5", "t", "6", "y",
		"u", "8", "i", "9", "o", "0", "p", "[", "=", "]", "Backspace", "\\",
		"ShiftLeft", "a", "z", "s", "x", "d", "c", "v", "g", "b", "h", "n",
		"m", "k", ",", "l", ".", ";", "/", "ShiftRight", "Enter"
	],
	alternate_keymap: [
		"`", "Tab", "1", "q", "2", "w", "3", "e", "r", "5", "t", "6", "y",
		"u", "8", "i", "9", "o", "0", "p", "[", "=", "]", "Backspace", "\\",
		"ShiftLeft", "a", "z", "s", "x", "d", "c", "v", "g", "b", "h", "n",
		"m", "k", ",", "l", ".", ";", "/", "ShiftRight",
	],
	audio: new AudioContext(),
	offset: 36,
	initialTime: 0,
	history: [],
	note: function(key, enableHistory) {
		var hz = piano.keymap.indexOf(key);
		piano.hit(hz);
		if (enableHistory) {
			piano.history.push({key: key, time: piano.audio.currentTime - piano.initialTime});
		}
		var vol = piano.audio.createGain();
		vol.connect(piano.audio.destination);
		var osc = piano.audio.createOscillator();
		osc.frequency.value = hz < 0 ? 0 : (440 * Math.pow(2, (hz + piano.offset - 72) / 12));
		osc.type = "triangle";
		osc.connect(vol);
		osc.start();
		var secs = 15;
		vol.gain.exponentialRampToValueAtTime(1 / Number.MAX_SAFE_INTEGER, piano.audio.currentTime + secs);
		setTimeout(e => osc.disconnect(), secs * 1000);
		setTimeout(e => vol.disconnect(), secs * 1000);
	},
	playHistory: function() {
		piano.history.forEach(function(e) {
			setTimeout(o => piano.note(e.key, false), e.time * 1000);
		});
	},
	clearHistory: function() {
		piano.history = [];
		piano.initialTime = piano.audio.currentTime;
	},
	listen: function(e) {
		alert();
	},
	spacebar: function(e) {
		// swap keyboard rows
	},
	record: [
		[
			{"key": "z", "time": 0},
			{"key": "z", "time": 0.2},
			{"key": "x", "time": 0.4},
			{"key": "z", "time": 0.6},
			{"key": "v", "time": 0.8},
			{"key": "c", "time": 1},
			{"key": "z", "time": 1.2},
			{"key": "z", "time": 1.4},
			{"key": "x", "time": 1.6},
			{"key": "z", "time": 1.8},
			{"key": "b", "time": 2},
			{"key": "v", "time": 2.2},
			{"key": "z", "time": 2.4},
			{"key": "z", "time": 2.6},
			{"key": ",", "time": 2.8},
			{"key": "n", "time": 3},
			{"key": "v", "time": 3.2},
			{"key": "c", "time": 3.4},
			{"key": "x", "time": 3.6},
			{"key": "m", "time": 3.8},
			{"key": "m", "time": 4},
			{"key": "n", "time": 4.2},
			{"key": "v", "time": 4.4},
			{"key": "b", "time": 4.6},
			{"key": "v", "time": 4.8}
		]
	],
	playRecord: function(i) {
		piano.record[i].forEach(function(r) {
			setTimeout(e => piano.note(r.key, false), r.time * 1000);
		});
	},
	saveRecord: function() {
		piano.record.push(piano.history);
	},
	getHistory: function() {
		console.log(JSON.stringify(piano.history));
	},
	init_audio: function() {
		document.addEventListener("keydown", function(e) {
			var key = e.key.length == 1 ? e.key.toLowerCase() : e.code;
			if (piano.keymap.includes(key)) {
				piano.note(key, true);
			}
			if (key == " ") {
				piano.clearHistory();
			}
			if (key == "Enter" || key == "Tab") {
				e.preventDefault(); // IMPORTANT
				return false;
			}
		});
	},




	ui: document.createElement("div"),
	css: document.createElement("style"),
	menuleft: document.createElement("div"),
	menuright: document.createElement("div"),
	keyboard: document.createElement("div"),
	keys: [],
	hit: function(n) {
		piano.keys[n].classList.add("piano-hit");
		setTimeout(e => piano.keys[n].classList.remove("piano-hit"), 100);
	},
	newcss: function(tilt) {
		piano.css.innerHTML = `
			#piano-ui {
				position: fixed;
				left: 0;
				height: 75px;
				width: 100%;
				bottom: 0;
				perspective: 1024px;
				background: linear-gradient(transparent, rgba(0, 64, 64, 0.5));
				z-index: 999;
			}
			
			.piano-menu {
				height: 100%;
				width: 15%;
				text-align: center;
				vertical-align: top;
				display: inline-block;
			}
			#piano-left {
				background: linear-gradient(to right, white, transparent);
				text-align: left;
			}
			#piano-right {
				background: linear-gradient(to right, transparent, white);
				text-align: right;
			}
			#piano-middle {
				height: 100%;
				width: 70%;
				bottom: 0;
				transform: translateZ(${tilt}px) rotateX(${tilt}deg);
				transform-style: preserve-3d;
				display: inline-block;
			}

			.piano-key {
				position: relative;
				bottom: 0;
				text-align: center;
				border-radius: 0 0 5px 5px;
				transform-style: preserve-3d;
				display: inline-block;
			}
			.piano-key:after {
				content: "";
				background: #808080;
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				border-radius: 0 0 5px 5px;
				transform: translateZ(-6px);
			}
			.piano-white {
				background: white;
				color: black;
				height: 100%;
				width: 3.5%;
				margin-left: 0.2%;
				transform: translateZ(7px);
			}
			.piano-white.piano-hit {
				background: #c0c0c0;
				transform: translateZ(1px);
			}
			.piano-black {
				background: black;
				color: white;
				height: 70%;
				width: 2%;
				margin-right: -2%;
				vertical-align: top;
				transform: translateX(-55%) translateZ(14px);
			}
			.piano-black.piano-hit {
				background: #404040;
				transform: translateX(-55%) translateZ(8px);
			}

			.piano-keychar {
				position: absolute;
				bottom: 0;
				transform: translateX(-50%);
			}
		`;
	},
	newinput: function(e, type, func, title, br) {
		var input = document.createElement("input");
		input.type = type;
		switch (type) {
			case "number":
				input.addEventListener("input", func);
				e.appendChild(document.createElement("label")).innerHTML = title;
				break;
			case "button":
				input.addEventListener("click", func);
				input.value = title;
				break;
			default:
				break;
		}
		e.appendChild(input);
		if (br) {
			e.appendChild(document.createElement("br"));
		}
		return input;
	},
	quit: function() {
		piano.ui.remove();
		piano.css.remove();
		piano.audio.close();
	},
	init_ui: function() {
		/* define styles */
		document.body.appendChild(piano.css);
		piano.newcss(45);

		/* place main container */
		document.body.appendChild(piano.ui);
		piano.ui.id = "piano-ui";

		/* place ui settings */
		piano.ui.appendChild(piano.menuleft);
		piano.menuleft.className = "piano-menu";
		piano.menuleft.id = "piano-left";

		var pitch = piano.newinput(piano.menuleft, "number", function(e) {
			piano.offset = Number(this.value);
		}, "Pitch: ", 1);
		pitch.min = "0";
		pitch.step = "12";
		pitch.max = "84";
		pitch.value = "36";

		var tilt = piano.newinput(piano.menuleft, "number", function(e) {
			piano.newcss(this.value);
		}, "Tilt: ", 1);
		tilt.min = "0";
		tilt.step = "5";
		tilt.max = "90";
		tilt.value = "45";

		piano.newinput(piano.menuleft, "button", piano.quit, "Quit", 0);

		/* place piano */
		piano.ui.appendChild(piano.keyboard);
		piano.keyboard.id = "piano-middle";
		for (var i = 0, k; k = piano.keymap[i]; i++) {
			/* place keys */
			var key = document.createElement("div");
			if ([0, 2, 4, 5, 7, 9, 11].some(e => (i - 8 - e) % 12 == 0)) {
				key.className = "piano-key piano-white";
			}
			else {
				key.className = "piano-key piano-black";
			}
			/* place characters on respective keys */
			var keychar = document.createElement("span");
			keychar.className = "piano-keychar";
			if (["Tab", "Backspace", "ShiftLeft", "ShiftRight", "Enter"].includes(k)) {
				keychar.innerHTML = {"Tab": "⇥", "Backspace": "⌫", "ShiftLeft": "⇧L", "ShiftRight": "⇧R", "Enter": "↵"}[k];
			}
			else {
				keychar.innerHTML = k;
			}
			key.appendChild(keychar);
			/* add mouseover event */
			(function(e) {
				key.addEventListener("mouseover", function(){
					piano.note(e, 1);
				});
			})(k);
			piano.keyboard.appendChild(key);
			piano.keys.push(key);
		}

		/* place playback settings */
		piano.ui.appendChild(piano.menuright);
		piano.menuright.className = "piano-menu";
		piano.menuright.id = "piano-right";

		piano.newinput(piano.menuright, "button", piano.clearHistory, "⬤", 0);
		piano.newinput(piano.menuright, "button", piano.playHistory, "▶", 0);
		piano.newinput(piano.menuright, "button", piano.playHistory, "◼", 0);
		piano.newinput(piano.menuright, "button", function(e) {
			piano.playRecord(0);
		}, "◀", 0);
	}
};
piano.init_audio();
piano.init_ui();
})();