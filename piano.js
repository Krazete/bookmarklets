javascript:
//(function() {
var piano = {
	/* initialization */
	keymap: [
		{key: "`",          caps_key: "~",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "Tab",        caps_key: "Tab",        hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "1",          caps_key: "!",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "q",          caps_key: "Q",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "2",          caps_key: "@",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "w",          caps_key: "W",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "3",          caps_key: "#",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "e",          caps_key: "E",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "r",          caps_key: "R",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "5",          caps_key: "%",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "t",          caps_key: "T",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "6",          caps_key: "^",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "y",          caps_key: "Y",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "u",          caps_key: "U",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "8",          caps_key: "*",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "i",          caps_key: "I",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "9",          caps_key: "(",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "o",          caps_key: "O",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "0",          caps_key: ")",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "p",          caps_key: "P",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "[",          caps_key: "{",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "=",          caps_key: "+",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "]",          caps_key: "}",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "Backspace",  caps_key: "Backspace",  hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "\\",         caps_key: "|",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "ShiftLeft",  caps_key: "ShiftLeft",  hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "a",          caps_key: "A",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "z",          caps_key: "Z",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "s",          caps_key: "S",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "x",          caps_key: "X",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "d",          caps_key: "D",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "c",          caps_key: "C",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "v",          caps_key: "V",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "g",          caps_key: "G",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "b",          caps_key: "B",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "h",          caps_key: "H",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "n",          caps_key: "N",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "m",          caps_key: "M",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "k",          caps_key: "K",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: ",",          caps_key: "<",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "l",          caps_key: "L",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: ".",          caps_key: ">",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: ";",          caps_key: ":",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "/",          caps_key: "?",          hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "ShiftRight", caps_key: "ShiftRight", hz: 0, dom: document.createElement("div"), ispressed: 0},
		{key: "Enter",      caps_key: "Enter",      hz: 0, dom: document.createElement("div"), ispressed: 0}
	],
	audio: new AudioContext(),
	wave: "triangle",
	pitchShift: 36,
	initialTime: 0,
	history: [],
	/* audio functions */
	note: function(hz, enableHistory) {
		if (enableHistory) {
			piano.history.push({hz: hz, wave: piano.wave, time: piano.audio.currentTime - piano.initialTime});
		}
		var vol = piano.audio.createGain();
		vol.connect(piano.audio.destination);
		var osc = piano.audio.createOscillator();
		osc.frequency.value = hz;
		osc.type = piano.wave;
		osc.connect(vol);
		osc.start();
		var secs = 15;
		vol.gain.exponentialRampToValueAtTime(1 / Number.MAX_SAFE_INTEGER, piano.audio.currentTime + secs);
		setTimeout(e => osc.disconnect(), secs * 1000);
		setTimeout(e => vol.disconnect(), secs * 1000);
	},
	playHistory: function() {
		piano.history.forEach(function(e) {
			setTimeout(function() {
				var keyi = piano.keymap.findIndex(o => e.hz == o.hz);
				piano.note(e.hz, false);
				if (keyi >= 0) {
					piano.keymap[keyi].dom.classList.add("piano-hit");
					setTimeout(abc => piano.keymap[keyi].dom.classList.remove("piano-hit"), 100);
				}
			}, e.time * 1000);
		});
	},
	clearHistory: function() {
		piano.initialTime = piano.audio.currentTime;
		piano.history = [];
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
			setTimeout(e => piano.note(piano.keymap[r.key].hz, false), r.time * 1000);
		});
	},
	saveRecord: function() {
		piano.record.push(piano.history);
	},
	getHistory: function() {
		console.log(JSON.stringify(piano.history));
	},

	detectkey: function(e) {
		var key = e.key.length == 1 ? e.key : e.code;
		keyi = piano.keymap.findIndex(e => e.key == key || e.caps_key == key);
		return keyi;
	},
	keyup: function(e) {
		var keyi = piano.detectkey(e);
		if (keyi >= 0) {
			piano.keymap[keyi].ispressed = 0;
			piano.keymap[keyi].dom.classList.remove("piano-hit");
		}
	},
	keydown: function(e) {
		e.preventDefault();
		var keyi = piano.detectkey(e);
		if (keyi >= 0 && piano.keymap[keyi].ispressed == 0) {
			piano.keymap[keyi].ispressed = 1;
			piano.note(piano.keymap[keyi].hz, true);
			piano.keymap[keyi].dom.classList.add("piano-hit");
		}
	},
	newkeymaphz: function() {
		for (var i = 0; i < piano.keymap.length; i++) {
			/* altered version of formula from https://en.wikipedia.org/wiki/Piano_key_frequencies */
			piano.keymap[i].hz = 440 * Math.pow(2, (i + piano.pitchShift - 72) / 12);
		}
	},
	init_audio: function() {
		piano.newkeymaphz();
		document.addEventListener("keydown", piano.keydown);
		document.addEventListener("keyup", piano.keyup);
	},



	/* ui functions */
	ui: document.createElement("div"),
	css: document.createElement("style"),
	menuleft: document.createElement("div"),
	menuright: document.createElement("div"),
	keyboard: document.createElement("div"),
	newcss: function(tilt) {
		piano.css.innerHTML = `
			#piano-ui {
				background: linear-gradient(transparent, rgba(64, 64, 64, 0.5));
				font-family: Avenir, Klee, Helvetica, Arial, sans-serif;
				position: fixed;
				left: 0;
				bottom: 0;
				height: 75px;
				width: 100%;
				perspective: 1024px;
				z-index: 999;
			}

			.piano-menu {
				height: 100%;
				width: 15%;
				vertical-align: top;
				display: inline-block;
			}
			.piano-menu > label {
				float: none;
			}
			.piano-menu > input {
				background: white;
				font-size: 100%;
				max-width: 50%;
				border: 1px solid black;
				border-radius: 5px;
				float: none;
			}
			#piano-left {
				background: linear-gradient(to right, rgba(255, 255, 255, 0.5), transparent);
				text-align: left;
			}
			#piano-right {
				background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5));
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
		if (type == "select") {
			var input = document.createElement("select");
		}
		else {
			var input = document.createElement("input");
			input.type = type;
		}
		if (type == "button") {
			input.addEventListener("click", func);
			input.value = title;
		}
		else {
			input.addEventListener("input", func);
			e.appendChild(document.createElement("label")).innerHTML = title;
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
		document.removeEventListener("keydown", piano.keydown);
		document.removeEventListener("keyup", piano.keyup);
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

		var wave = piano.newinput(piano.menuleft, "select", function(e) {
			piano.wave = this.value;
		}, "Wave: ", 1);
		wave.appendChild(document.createElement("option")).innerHTML = "sine";
		wave.appendChild(document.createElement("option")).innerHTML = "triangle";
		wave.appendChild(document.createElement("option")).innerHTML = "square";
		wave.appendChild(document.createElement("option")).innerHTML = "sawtooth";
		wave.value = "triangle";

		var pitch = piano.newinput(piano.menuleft, "range", function(e) {
			piano.pitchShift = Number(this.value);
			piano.newkeymaphz();
		}, "Pitch: ", 1);
		pitch.min = "0";
		pitch.step = "12";
		pitch.max = "84";
		pitch.value = "36";

		var tilt = piano.newinput(piano.menuleft, "range", function(e) {
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
		for (var i = 0; i < piano.keymap.length; i++) {
			/* place keys */
			var k = piano.keymap[i].key;
			var key = piano.keymap[i].dom;
			if ([0, 2, 4, 5, 7, 9, 11].some(e => (i - 8 - e) % 12 == 0)) {
				key.className = "piano-key piano-white";
			}
			else {
				key.className = "piano-key piano-black";
			}
			/* place characters on respective keys */
			var keychar = document.createElement("span");
			keychar.className = "piano-keychar";
			if (k.length > 1) {
				keychar.innerHTML = {"Tab": "⇥", "Backspace": "⌫", "ShiftLeft": "⇧L", "ShiftRight": "⇧R", "Enter": "↵"}[k];
			}
			else {
				keychar.innerHTML = k;
			}
			key.appendChild(keychar);
			piano.keyboard.appendChild(key);
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
//})();