javascript:
var piano = {
	audio: new AudioContext(),
	initTime: new Date().getTime(),
	lastTime: 0,
	keys: [
		"Tab", "1", "q", "2", "w", "3", "e", "r", "5", "t", "6", "y",
		"u", "8", "i", "9", "o", "0", "p", "[", "=", "]", "Backspace", "\\",
		"ShiftLeft", "a", "z", "s", "x", "d", "c", "v", "g", "b", "h", "n",
		"m", "k", ",", "l", ".", ";", "/", "ShiftRight",
	],
	history: [],
	note: function(e, h) {
		var hz = this.keys.indexOf(e);
		if (h) { // should change relative timekeeping to absolute timekeeping
			var thisTime = new Date().getTime();
			this.history.push({key: e, time: thisTime - this.lastTime});
			this.lastTime = thisTime;
		}
		var vol = this.audio.createGain();
		vol.connect(this.audio.destination);
		var osc = this.audio.createOscillator();
		osc.frequency.value = hz < 0 ? 0 : (440 * Math.pow(2, (hz - 49) / 12));
		osc.type = "triangle";

/* why does this make the audio crackle?
var wave = this.audio.createPeriodicWave(
	new Float32Array([0, 1]),
	new Float32Array([0, 0])
);
osc.setPeriodicWave(wave);
*/

		osc.connect(vol);
		osc.start();
		var stepsize = 25;
		var time = 1000;
		for (var i = 0; i < stepsize; i++) {
			(function (j) {
				setTimeout(e => vol.gain.value = j / stepsize, (stepsize - (i + 1)) * time / stepsize);
			})(i);
		}
		setTimeout(e => osc.disconnect(), time);
		setTimeout(e => vol.disconnect(), time);
	},
	playHistory: function(i) { // should change recursion to a loop
		if (i == undefined)
			i = 0;
		if (this.history.length >= 0) /* ??? */
			this.note(this.history[i].key, false);
		if (i < this.history.length - 1)
			setTimeout(e => piano.playHistory(i + 1), this.history[i + 1].time);
	},
	clearHistory: function() {
		this.history = [];
		this.lastTime = new Date().getTime();
	},
	init: function() {
		document.addEventListener("keydown", function(e) {
			piano.note(e.key.length == 1 ? e.key.toLowerCase() : e.code, true);
			if (e.key == " ")
				piano.clearHistory();
			if (e.key == "Enter")
				piano.playHistory();
		});
	},
	record: [
		[{"key":"ShiftRight","time":1408},{"key":"x","time":1961},{"key":"d","time":328},{"key":"c","time":303},{"key":".","time":8},{"key":"n","time":1984},{"key":"l","time":8},{"key":"x","time":1896},{"key":",","time":8},{"key":"b","time":1824},{"key":"k","time":24},{"key":"z","time":1968},{"key":"m","time":17},{"key":"v","time":2073},{"key":"z","time":1694},{"key":"ShiftLeft","time":360},{"key":"n","time":1984},{"key":"x","time":1},{"key":"k","time":1071},{"key":"d","time":8},{"key":"k","time":608},{"key":"c","time":16},{"key":"\\","time":1768},{"key":"x","time":1800},{"key":",","time":8},{"key":"b","time":1809},{"key":"k","time":1},{"key":"z","time":1886},{"key":"v","time":1744},{"key":"m","time":8},{"key":"ShiftLeft","time":1919},{"key":"c","time":3276},{"key":"m","time":344}],
		[{"key":"x","time":311},{"key":"c","time":256},{"key":"k","time":272},{"key":"c","time":304},{"key":"k","time":264},{"key":"k","time":1752},{"key":"n","time":536},{"key":"c","time":1401},{"key":"k","time":287},{"key":"c","time":320},{"key":"k","time":496},{"key":"n","time":320},{"key":"b","time":704},{"key":"b","time":304},{"key":"g","time":400},{"key":"b","time":296},{"key":"b","time":312},{"key":"z","time":1168},{"key":"x","time":272},{"key":"d","time":288},{"key":"v","time":272},{"key":"b","time":296},{"key":"n","time":256},{"key":"m","time":304},{"key":",","time":271},{"key":".","time":305},{"key":".","time":1616},{"key":".","time":279},{"key":"k","time":537},{"key":"k","time":328},{"key":"b","time":673},{"key":"b","time":326},{"key":"c","time":609},{"key":"b","time":287},{"key":"c","time":617},{"key":"b","time":263},{"key":"n","time":504},{"key":"b","time":248},{"key":"n","time":257},{"key":"k","time":248},{"key":"b","time":335},{"key":"b","time":288},{"key":"c","time":545},{"key":"x","time":519},{"key":"b","time":3930},{"key":"v","time":225},{"key":"b","time":288},{"key":"m","time":247},{"key":"n","time":538},{"key":"v","time":535},{"key":"b","time":416},{"key":"n","time":559},{"key":"v","time":393},{"key":"ShiftRight","time":1607},{"key":"/","time":257},{"key":"m","time":1392},{"key":"n","time":263},{"key":"b","time":256},{"key":"n","time":256},{"key":"b","time":280},{"key":"v","time":504},{"key":"c","time":480},{"key":"v","time":216},{"key":"n","time":288},{"key":"b","time":520},{"key":"x","time":1552},{"key":"c","time":297},{"key":"v","time":279},{"key":"c","time":296},{"key":"n","time":832},{"key":"x","time":808},{"key":"c","time":3824},{"key":"j","time":256},{"key":".","time":296},{"key":"c","time":736},{"key":"k","time":240},{"key":".","time":256},{"key":"k","time":232},{"key":"b","time":288},{"key":"c","time":256},{"key":"b","time":248},{"key":"x","time":952},{"key":"c","time":297},{"key":"k","time":239},{"key":"n","time":248},{"key":"b","time":240},{"key":"n","time":271},{"key":"k","time":497},{"key":"b","time":496},{"key":".","time":504},{"key":"d","time":1160},{"key":".","time":256},{"key":"d","time":288},{"key":".","time":247},{"key":",","time":249},{"key":"m","time":264},{"key":",","time":256},{"key":".","time":256},{"key":"n","time":232},{"key":"m","time":240},{"key":"v","time":279},{"key":"x","time":465},{"key":"v","time":279},{"key":"b","time":1312},{"key":"n","time":233},{"key":"m","time":255},{"key":"n","time":457},{"key":"m","time":240},{"key":"n","time":271},{"key":"c","time":714},{"key":"v","time":238},{"key":"b","time":256},{"key":"b","time":249},{"key":"v","time":223},{"key":"c","time":336},{"key":"v","time":265},{"key":"b","time":272},{"key":"n","time":287},{"key":".","time":265},{"key":"/","time":511},{"key":"ShiftRight","time":472},{"key":"ShiftRight","time":464},{"key":".","time":1296},{"key":".","time":264},{"key":"/","time":1272},{"key":"/","time":264},{"key":"ShiftRight","time":960},{"key":"/","time":216},{"key":"Enter","time":720},{"key":"AltRight","time":61622},{"key":"MetaRight","time":7},{"key":"KeyI","time":184}],
		[{"key":"ShiftRight","time":351},{"key":"x","time":1176},{"key":"d","time":265},{"key":"c","time":287},{"key":".","time":49},{"key":"n","time":1727},{"key":"l","time":8},{"key":",","time":1616},{"key":"x","time":16},{"key":"b","time":1680},{"key":"k","time":1},{"key":"m","time":1776},{"key":"z","time":1},{"key":"v","time":1798},{"key":"z","time":1424},{"key":"ShiftLeft","time":320},{"key":"x","time":1712},{"key":"n","time":8},{"key":"d","time":1080},{"key":"k","time":8},{"key":"c","time":584},{"key":"k","time":8},{"key":"\\","time":1664},{"key":",","time":1808},{"key":"x","time":7},{"key":"k","time":1865},{"key":"b","time":8},{"key":"z","time":1751},{"key":"v","time":1801},{"key":"m","time":7},{"key":"ShiftLeft","time":1784},{"key":"v","time":3421},{"key":",","time":240},{"key":"ShiftRight","time":319},{"key":"c","time":1497},{"key":"n","time":1720},{"key":"x","time":1832},{"key":",","time":8},{"key":"k","time":1800},{"key":"c","time":15},{"key":"x","time":1665},{"key":".","time":24},{"key":"d","time":4674},{"key":"c","time":272}],
	],
	playRecord: function(i, j) { // should change recursion to a loop
		if (j == undefined)
			j = 0;
		if (1) /* ??? */
			this.note(this.record[i][j].key, false);
		if (i < this.record[i].length - 1)
			setTimeout(e => piano.playRecord(i, j + 1), this.record[i][j + 1].time);
	},
	saveRecord: function() {
		this.record.push(this.history);
	},
	getHistory: function() {
		console.log(JSON.stringify(this.history));
	}
};
piano.init();
