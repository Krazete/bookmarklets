(function() {
var piano = {
	/* initialization */
	css: document.createElement("style"),
	ui: document.createElement("div"),
	menuleft: document.createElement("div"),
	wave: document.createElement("select"),
	pitch: document.createElement("input"),
	tilt: document.createElement("input"),
	keyboard: document.createElement("div"),
	menuright: document.createElement("div"),
	audio: new AudioContext(),
	initialTime: 0,
	keymap: [
		{key: "`",          caps_key: "~",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "Tab",        caps_key: "Tab",        dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "1",          caps_key: "!",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "q",          caps_key: "Q",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "2",          caps_key: "@",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "w",          caps_key: "W",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "3",          caps_key: "#",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "e",          caps_key: "E",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "r",          caps_key: "R",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "5",          caps_key: "%",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "t",          caps_key: "T",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "6",          caps_key: "^",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "y",          caps_key: "Y",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "u",          caps_key: "U",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "8",          caps_key: "*",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "i",          caps_key: "I",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "9",          caps_key: "(",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "o",          caps_key: "O",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "0",          caps_key: ")",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "p",          caps_key: "P",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "[",          caps_key: "{",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "=",          caps_key: "+",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "]",          caps_key: "}",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "Backspace",  caps_key: "Backspace",  dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "\\",         caps_key: "|",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "ShiftLeft",  caps_key: "ShiftLeft",  dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "a",          caps_key: "A",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "z",          caps_key: "Z",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "s",          caps_key: "S",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "x",          caps_key: "X",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "d",          caps_key: "D",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "c",          caps_key: "C",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "v",          caps_key: "V",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "g",          caps_key: "G",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "b",          caps_key: "B",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "h",          caps_key: "H",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "n",          caps_key: "N",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "m",          caps_key: "M",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "k",          caps_key: "K",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: ",",          caps_key: "<",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "l",          caps_key: "L",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: ".",          caps_key: ">",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: ";",          caps_key: ":",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "/",          caps_key: "?",          dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "ShiftRight", caps_key: "ShiftRight", dom: document.createElement("div"), hz: 0, pressed: 0},
		{key: "Enter",      caps_key: "Enter",      dom: document.createElement("div"), hz: 0, pressed: 0}
	],

	/* audio functions */
	note: function(i, wave, hist) {
		if (hist) {
			if (piano.disc[0].length == 0) {
				piano.initialTime = piano.audio.currentTime;
			}
			piano.disc[0].push({
				keyi: i,
				wave: wave,
				time: piano.audio.currentTime - piano.initialTime,
				timeout: null
			});
		}
		var vol = piano.audio.createGain();
		vol.connect(piano.audio.destination);
		var osc = piano.audio.createOscillator();
		/* altered version of formula from https://en.wikipedia.org/wiki/Piano_key_frequencies */
		osc.frequency.value = 440 * Math.pow(2, (i - 53) / 12);
		osc.type = wave;
		osc.connect(vol);
		osc.start();
		var secs = 10;
		vol.gain.exponentialRampToValueAtTime(1 / Number.MAX_SAFE_INTEGER, piano.audio.currentTime + secs);
		setTimeout(e => osc.disconnect(), secs * 1000);
		setTimeout(e => vol.disconnect(), secs * 1000);
	},
	disc: [
		/* history */
		[],
		/* discs */
		[
				{keyi: 44, wave: "triangle", time: 0.0, timeout: null},
				{keyi: 44, wave: "triangle", time: 0.1, timeout: null},
				{keyi: 46, wave: "triangle", time: 0.2, timeout: null},
				{keyi: 44, wave: "triangle", time: 0.3, timeout: null},
				{keyi: 49, wave: "triangle", time: 0.4, timeout: null},
				{keyi: 48, wave: "triangle", time: 0.5, timeout: null},
				{keyi: 44, wave: "triangle", time: 0.6, timeout: null},
				{keyi: 44, wave: "triangle", time: 0.7, timeout: null},
				{keyi: 46, wave: "triangle", time: 0.8, timeout: null},
				{keyi: 44, wave: "triangle", time: 0.9, timeout: null},
				{keyi: 51, wave: "triangle", time: 1.0, timeout: null},
				{keyi: 49, wave: "triangle", time: 1.1, timeout: null},
				{keyi: 44, wave: "triangle", time: 1.2, timeout: null},
				{keyi: 44, wave: "triangle", time: 1.3, timeout: null},
				{keyi: 56, wave: "triangle", time: 1.4, timeout: null},
				{keyi: 53, wave: "triangle", time: 1.5, timeout: null},
				{keyi: 49, wave: "triangle", time: 1.6, timeout: null},
				{keyi: 48, wave: "triangle", time: 1.7, timeout: null},
				{keyi: 46, wave: "triangle", time: 1.8, timeout: null},
				{keyi: 54, wave: "triangle", time: 1.9, timeout: null},
				{keyi: 54, wave: "triangle", time: 2.0, timeout: null},
				{keyi: 53, wave: "triangle", time: 2.1, timeout: null},
				{keyi: 49, wave: "triangle", time: 2.2, timeout: null},
				{keyi: 51, wave: "triangle", time: 2.3, timeout: null},
				{keyi: 49, wave: "triangle", time: 2.4, timeout: null}
		]
	],
	playDisc: function(i) {
		piano.disc[i].forEach(function(e) {
			e.timeout = setTimeout(function() {
				piano.note(e.keyi, e.wave, false);
				var domi = e.keyi - piano.pitch.value;
				if (domi > 0 && domi < 46) {
					piano.keymap[domi].dom.classList.add("piano-hit");
					setTimeout(o => piano.keymap[domi].dom.classList.remove("piano-hit"), 100);
				}
			}, e.time * 1000);
		});
	},
	stopDisc: function(i) {
		piano.disc[i].forEach(e => clearTimeout(e.timeout));
	},
	saveDisc: function() {
		if (piano.disc[0].length > 0) {
			piano.disc.push(piano.disc[0]);
			piano.deleteDisc(0);
		}
	},
	deleteDisc: function(i) {
		if (i == 0) {
			piano.disc[i] = [];
		}
		else {
			piano.disc = piano.disc.slice(0, i).concat(piano.disc.slice(i + 1));
		}
		piano.playbackmode();
	},
	exportDiscs: function() {
		var d = JSON.stringify(piano.discs);
		console.log();
	},

	keyindex: function(e) {
		var key = e.key.length == 1 ? e.key : e.code;
		return piano.keymap.findIndex(e => e.key == key || e.caps_key == key);
	},
	keyup: function(e) {
		var keyi = piano.keyindex(e);
		if (keyi >= 0) {
			piano.keymap[keyi].pressed = 0;
			piano.keymap[keyi].dom.classList.remove("piano-hit");
		}
	},
	keydown: function(e) {
		e.preventDefault();
		var keyi = piano.keyindex(e);
		if (keyi >= 0 && piano.keymap[keyi].pressed == 0) {
			piano.keymap[keyi].pressed = 1;
			piano.note(keyi + Number(piano.pitch.value), piano.wave.value, true);
			piano.keymap[keyi].dom.classList.add("piano-hit");
		}
		/* control pitch and tilt too */
		else if (e.key == "ArrowLeft") {
			piano.pitch.value = Number(piano.pitch.value) - 12;
		}
		else if (e.key == "ArrowRight") {
			piano.pitch.value = Number(piano.pitch.value) + 12;
		}
		else if (e.key == "ArrowDown") {
			piano.tilt.value = Number(piano.tilt.value) - 5;
			piano.newcss();
		}
		else if (e.key == "ArrowUp") {
			piano.tilt.value = Number(piano.tilt.value) + 5;
			piano.newcss();
		}
	},

	/* ui helper functions */
	newcss: function() {
		piano.css.innerHTML = `
			#piano-ui {
				background: linear-gradient(transparent, rgba(64, 64, 64, 0.5));
				color: black;
				font-family: Avenir, Klee, Helvetica, Arial, sans-serif;
				font-size: 14px;
				position: fixed;
				height: 75px;
				width: 100%;
				left: 0;
				bottom: 0;
				perspective: 1024px;
				z-index: 999;
			}
			#piano-quit {
				background: rgba(255, 255, 255, 0.5);
				position: absolute;
				width: 30px;
				top: 0;
				right: 0;
				transform: translateY(-100%);
				border-top: 1px solid rgba(64, 64, 64, 0.5);
				border-radius: 10px 10px 0 0;
				text-align: center;
				cursor: pointer;
			}

			.piano-menu {
				height: 100%;
				width: 15%;
				vertical-align: top;
				display: inline-block;
			}
			.piano-menu > label, .piano-menu > input, .piano-menu > select {
				font-size: 14px;
				max-width: 50%;
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
				transform: translateZ(${piano.tilt.value}px) rotateX(${piano.tilt.value}deg);
				transform-style: preserve-3d;
				display: inline-block;
			}

			.piano-key {
				text-align: center;
				position: relative;
				bottom: 0;
				transform-style: preserve-3d;
				border-radius: 0 0 5px 5px;
				display: inline-block;
			}
			.piano-key:after {
				content: "";
				background: #808080;
				position: absolute;
				height: 100%;
				width: 100%;
				top: 0;
				left: 0;
				transform: translateZ(-6px);
				border-radius: 0 0 5px 5px;
			}
			.piano-white {
				background: white;
				color: black;
				height: 100%;
				width: 3.5%;
				transform: translateZ(7px);
				margin-left: 0.2%;
			}
			.piano-white.piano-hit {
				background: #c0c0c0;
				transform: translateZ(1px);
			}
			.piano-black {
				background: black;
				color: white;
				vertical-align: top;
				height: 70%;
				width: 2%;
				transform: translateX(-55%) translateZ(14px);
				margin-right: -2%;
			}
			.piano-black.piano-hit {
				background: #404040;
				transform: translateX(-55%) translateZ(8px);
			}

			.piano-keyval {
				position: absolute;
				bottom: 0;
				transform: translateX(-50%);
			}
		`;
	},
	newselect: function(p, c, label, options, value, func) {
		options.forEach(function(e) {
			c.appendChild(document.createElement("option")).innerHTML = e;
		});
		c.value = options[value];
		if (func != null) {
			c.addEventListener("input", func);
		}
		p.appendChild(document.createElement("label")).innerHTML = label;
		p.appendChild(c);
	},
	newrange: function(p, c, label, min, step, max, value, func) {
		c.type = "range";
		c.min = min;
		c.step = step;
		c.max = max;
		c.value = value;
		c.min = min;
		c.addEventListener("input", func);
		p.appendChild(document.createElement("label")).innerHTML = label;
		p.appendChild(c);
	},
	newbutton: function(p, label, func) {
		var c = document.createElement("input");
		c.type = "button";
		c.addEventListener("click", func);
		c.value = label;
		p.appendChild(c);
		return c;
	},
	newbr: function(p) {
		p.appendChild(document.createElement("br"));
	},
	playstop: function(e, i) {
		if (piano.disc[i].length > 0) {
			var c = i == 0 ? "↻" : i;
			if (e.target.value == c + " ▶") {
				piano.playDisc(i);
				e.target.value = c + " ◼";
				var lastnote = piano.disc[i].length - 1;
				setTimeout(o => e.target.value = c + " ▶", 1000 * (piano.disc[i][lastnote].time));
			}
			else {
				piano.stopDisc(i);
				e.target.value = c + " ▶";
			}
		}
	},

	playbackmode: function() {
		piano.menuright.innerHTML = "";
		piano.newbutton(piano.menuright, "↻ ▶", e => piano.playstop(e, 0));
		piano.newbutton(piano.menuright, "⬇", piano.saveDisc);
		piano.newbutton(piano.menuright, "✖", piano.deletionmode);
		piano.newbutton(piano.menuright, "︎⬆︎", piano.downloadDiscs);
		piano.newbr(piano.menuright);
		piano.disc.forEach(function(e, i) {
			if (i !== 0) {
				piano.newbutton(piano.menuright, i + " ▶", o => piano.playstop(o, i));
			}
		});
	},
	deletionmode: function() {
		for (var i = 0; i < piano.disc.length; i++) {
			piano.stopDisc(i);
		}
		piano.menuright.innerHTML = "";
		piano.newbutton(piano.menuright, "↻ ✖", e => piano.deleteDisc(0));
		var d1 = piano.newbutton(piano.menuright, "⬇", piano.saveDisc);
		d1.setAttribute("disabled", 1);
		piano.newbutton(piano.menuright, "✖", piano.playbackmode);
		var d2 = piano.newbutton(piano.menuright, "︎⬆︎", piano.downloadDiscs);
		d2.setAttribute("disabled", 1);
		piano.newbr(piano.menuright);
		piano.disc.forEach(function(e, i) {
			if (i !== 0) {
				piano.newbutton(piano.menuright, i + " ✖", o => piano.deleteDisc(i));
			}
		});
	},

	quit: function() {
		piano.ui.remove();
		piano.css.remove();
		piano.audio.close();
		document.removeEventListener("keydown", piano.keydown);
		document.removeEventListener("keyup", piano.keyup);
	},

	init: function() {
		/* define styles */
		document.body.appendChild(piano.css);

		/* place main container */
		document.body.appendChild(piano.ui);
		piano.ui.id = "piano-ui";
		var quit = document.createElement("div");
		quit.id = "piano-quit";
		quit.innerHTML = "✕";
		quit.addEventListener("click", piano.quit);
		piano.ui.appendChild(quit);

		/* place ui settings */
		piano.ui.appendChild(piano.menuleft);
		piano.menuleft.className = "piano-menu";
		piano.menuleft.id = "piano-left";
		piano.newselect(piano.menuleft, piano.wave, "Wave: ", ["sine", "triangle", "square", "sawtooth"], 1);
		piano.newbr(piano.menuleft);
		piano.newrange(piano.menuleft, piano.pitch, "Pitch: ", 0, 12, 48, 24, null);
		piano.newbr(piano.menuleft);
		piano.newrange(piano.menuleft, piano.tilt, "Tilt: ", 0, 5, 90, 45, piano.newcss);
		piano.newcss();

		/* place piano */
		piano.ui.appendChild(piano.keyboard);
		piano.keyboard.id = "piano-middle";
		for (var i = 0; i < piano.keymap.length; i++) {
			/* place keys */
			var key = piano.keymap[i].key;
			var dom = piano.keymap[i].dom;
			if ([0, 2, 4, 5, 7, 9, 11].some(e => (i - e - 8) % 12 == 0)) {
				dom.className = "piano-key piano-white";
			}
			else {
				dom.className = "piano-key piano-black";
			}
			/* place characters on respective keys */
			var keyval = document.createElement("span");
			keyval.className = "piano-keyval";
			if (key.length == 1) {
				keyval.innerHTML = key;
			}
			else {
				keyval.innerHTML = {"Tab": "⇥", "Backspace": "⌫", "ShiftLeft": "⇧L", "ShiftRight": "⇧R", "Enter": "↵"}[key];
			}
			dom.appendChild(keyval);
			piano.keyboard.appendChild(dom);
		}

		/* place playback settings */
		piano.ui.appendChild(piano.menuright);
		piano.menuright.className = "piano-menu";
		piano.menuright.id = "piano-right";

		piano.playbackmode();

		/* link keyboard to audio */
		document.addEventListener("keydown", piano.keydown);
		document.addEventListener("keyup", piano.keyup);
	}
};
piano.init();
})();