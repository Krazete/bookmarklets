javascript:
(function(){
var piano = {
	keys: [
		"`", "Tab", "1", "q", "2", "w", "3", "e", "r", "5", "t", "6", "y",
		"u", "8", "i", "9", "o", "0", "p", "[", "=", "]", "Backspace", "\\",
		"ShiftLeft", "a", "z", "s", "x", "d", "c", "v", "g", "b", "h", "n",
		"m", "k", ",", "l", ".", ";", "/", "ShiftRight", "Enter"
	],
	alternate_keys: [
		"`", "Tab", "1", "q", "2", "w", "3", "e", "r", "5", "t", "6", "y",
		"u", "8", "i", "9", "o", "0", "p", "[", "=", "]", "Backspace", "\\",
		"ShiftLeft", "a", "z", "s", "x", "d", "c", "v", "g", "b", "h", "n",
		"m", "k", ",", "l", ".", ";", "/", "ShiftRight",
	],
	offset: 36,
	audio: new AudioContext(),
	initialTime: 0,
	history: [],
	note: function(key, enableHistory) {
		var hz = piano.keys.indexOf(key);
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
	init: function() {
		document.addEventListener("keydown", function(e) {
			var key = e.key.length == 1 ? e.key.toLowerCase() : e.code;
			if (piano.keys.includes(key)) {
				piano.note(key, true);
			}
			if (key == " ") {
				piano.clearHistory();
			}
			if (key == "Enter") {
				return false;
			}
			if (key == "Tab") {
				return false;
			}
		});
	},
	record: [
		[
			{"key":"z","time":0},
			{"key":"z","time":0.2},
			{"key":"x","time":0.4},
			{"key":"z","time":0.6},
			{"key":"v","time":0.8},
			{"key":"c","time":1},
			{"key":"z","time":1.2},
			{"key":"z","time":1.4},
			{"key":"x","time":1.6},
			{"key":"z","time":1.8},
			{"key":"b","time":2},
			{"key":"v","time":2.2},
			{"key":"z","time":2.4},
			{"key":"z","time":2.6},
			{"key":",","time":2.8},
			{"key":"n","time":3},
			{"key":"v","time":3.2},
			{"key":"c","time":3.4},
			{"key":"x","time":3.6},
			{"key":"m","time":3.8},
			{"key":"m","time":4},
			{"key":"n","time":4.2},
			{"key":"v","time":4.4},
			{"key":"b","time":4.6},
			{"key":"v","time":4.8}
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




	pui: document.createElement("div"),
	stylesheet: document.createElement("style"),
	leftmenu: document.createElement("div"),
	rightmenu: document.createElement("div"),
	piano: document.createElement("div"),
	keyboard: [],
	hit: function(n) {
		piano.keyboard[n].classList.add("hit");
		setTimeout(e => piano.keyboard[n].classList.remove("hit"), 100);
	},
	newCSS: function(rotation) {
		piano.stylesheet.innerHTML = `
			#pui {
				position: fixed;
				left: 0;
				height: 75px;
				width: 100%;
				bottom: 0;
				perspective: 1024px;
				background: linear-gradient(transparent, rgba(0, 64, 64, 0.5));
				z-index: 999;
			}
			#pleftmenu {
				height: 100%;
				display: inline-block;
				width: 15%;
				text-align: left;
				vertical-align: top;
			}
			#prightmenu {
				height: 100%;
				display: inline-block;
				width: 15%;
				text-align: right;
				vertical-align: top;
			}
			#ppiano {
				height: 100%;
				width: 70%;
				bottom: 0;
				transform: translateZ(${rotation}px) rotateX(${rotation}deg);
				transform-style: preserve-3d;
				display: inline-block;
			}
			.pkey {
				position: relative;
				display: inline-block;
				text-align: center;
				border-radius: 0 0 5px 5px;
				bottom: 0;
				transform-style: preserve-3d;
			}
			.pkey:after {
				content: "";
				background: #808080;
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				transform: translateZ(-6px);
				border-radius: 0 0 5px 5px;
			}
			.pwhite {
				color: black;
				height: 100%;
				width: 3.5%;
				background: white;
				transform: translateZ(7px);
				margin-left: 0.2%;
			}
			.pwhite.hit {
				background: #c0c0c0;
				transform: translateZ(1px);
			}
			.pblack {
				color: white;
				height: 70%;
				width: 2%;
				margin-right: -2%;
				transform: translateX(-55%) translateZ(14px);
				background: black;
				vertical-align: top;
			}
			.pblack.hit {
				background: #404040;
				transform: translateX(-55%) translateZ(8px);
			}
			.pkeykey {
				position: absolute;
				bottom: 0;
				transform: translateX(-50%);
			}
		`;
	},
	init2: function() {
		document.body.appendChild(piano.stylesheet);
		piano.newCSS(45);

		document.body.appendChild(piano.pui);
		piano.pui.id = "pui";

		piano.pui.appendChild(piano.leftmenu);
		piano.leftmenu.id = "pleftmenu";

		var frequency = document.createElement("input");
		frequency.type = "number";
		frequency.min = "0";
		frequency.step = "12";
		frequency.max = "84";
		frequency.value = "36";
		frequency.addEventListener("input", function(e) {
			piano.offset = Number(this.value);
		});
		piano.leftmenu.appendChild(frequency);

		var rotation = document.createElement("input");
		rotation.type = "number";
		rotation.min = "0";
		rotation.step = "5";
		rotation.max = "90";
		rotation.value = "45";
		rotation.addEventListener("input", function(e) {
			piano.newCSS(this.value);
		});
		piano.leftmenu.appendChild(rotation);

		piano.pui.appendChild(piano.piano);
		piano.piano.id = "ppiano";
		for (var i = 0, e; e = piano.keys[i]; i++) {
			var key = document.createElement("div");
			if ([0, 2, 4, 5, 7, 9, 11].some(e => (i - 8 - e) % 12 == 0)) {
				key.className = "pwhite pkey";
			}
			else {
				key.className = "pblack pkey";
			}
			var keykey = document.createElement("span");
			keykey.className = "pkeykey";
			if (["Tab", "Backspace", "ShiftLeft", "ShiftRight"].includes(e)) {
				keykey.innerHTML = {"Tab": "⇥", "Backspace": "⌫", "ShiftLeft": "⇧L", "ShiftRight": "⇧R"}[e];
			}
			else {
				keykey.innerHTML = e;
			}
			key.appendChild(keykey);
			(function(o) {
				key.addEventListener("mouseover", function(){piano.note(o, 1)});
			})(e);
			piano.piano.appendChild(key);
			piano.keyboard.push(key);
		}

		piano.pui.appendChild(piano.rightmenu);
		piano.rightmenu.id = "prightmenu";

		var quit = document.createElement("input");
		quit.type = "button";
		quit.value = "Quit";
		quit.addEventListener("click", piano.quit);
		piano.rightmenu.appendChild(quit);

		var record = document.createElement("input");
		record.type = "button";
		record.value = "⬤";
		record.addEventListener("click", piano.clearHistory);
		piano.rightmenu.appendChild(record);

		var play = document.createElement("input");
		play.type = "button";
		play.value = "▶";
		play.addEventListener("click", piano.playHistory);
		piano.rightmenu.appendChild(play);

		var pause = document.createElement("input");
		pause.type = "button";
		pause.value = "◼";
		pause.addEventListener("click", piano.playHistory);
		piano.rightmenu.appendChild(pause);

		var history = document.createElement("input");
		history.type = "button";
		history.value = "◀";
		history.addEventListener("click", function(e) {
			piano.playRecord(0);
		});
		piano.rightmenu.appendChild(history);
	},
	quit: function() {
		piano.pui.remove();
		piano.audio.close();
	}
};
piano.init();
piano.init2();
})();