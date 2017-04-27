javascript:
var fo = prompt("Frequency Offset:", 29);
var piano = {
	audio: new AudioContext(),
	initTime: 0,
	keys: [
		"`", "Tab", "1", "q", "2", "w", "3", "e", "r", "5", "t", "6", "y",
		"u", "8", "i", "9", "o", "0", "p", "[", "=", "]", "Backspace", "\\",
		"ShiftLeft", "a", "z", "s", "x", "d", "c", "v", "g", "b", "h", "n",
		"m", "k", ",", "l", ".", ";", "/", "ShiftRight",
	],
	history: [],
	note: function(e, h) {
		var hz = this.keys.indexOf(e);
		if (h)
			this.history.push({key: e, time: this.audio.currentTime - this.initTime});
		var vol = this.audio.createGain();
		vol.connect(this.audio.destination);
		var osc = this.audio.createOscillator();
		osc.frequency.value = hz < 0 ? 0 : (440 * Math.pow(2, (hz - fo) / 12));
		osc.type = "triangle";
		osc.connect(vol);
		osc.start();
		var secs = 15;
		vol.gain.exponentialRampToValueAtTime(1 / Number.MAX_SAFE_INTEGER, this.audio.currentTime + secs);
		setTimeout(e => osc.disconnect(), secs * 1000);
		setTimeout(e => vol.disconnect(), secs * 1000);
	},
	playHistory: function(i) {
		this.history.forEach(function(e) {
			setTimeout(o => piano.note(e.key, false), e.time * 1000);
		});
	},
	clearHistory: function() {
		this.history = [];
		this.initTime = this.audio.currentTime;
	},
	init: function() {
		document.addEventListener("keydown", function(e) {
			var key = e.key.length == 1 ? e.key.toLowerCase() : e.code;
			if (piano.keys.includes(key))
				piano.note(key, true);
			if (key == " ")
				piano.clearHistory();
			if (key == "Enter")
				piano.playHistory();
		});
	},
	record: [
		[{"key":"x","time":0.5282539682539777},{"key":"c","time":0.7488435374149702},{"key":"k","time":0.9694331065759627},{"key":"c","time":1.2132426303854942},{"key":"k","time":1.4570521541950114},{"key":"k","time":2.7457596371882147},{"key":"n","time":3.239183673469398},{"key":"c","time":4.2724716553288005},{"key":"k","time":4.545306122448977},{"key":"c","time":4.806530612244899},{"key":"k","time":5.0619501133786855},{"key":"n","time":5.520544217687075},{"key":"b","time":5.973333333333343},{"key":"b","time":6.22875283446713},{"key":"g","time":6.449342403628123},{"key":"b","time":6.704761904761909},{"key":"b","time":6.965986394557831},{"key":"z","time":7.999274376417233},{"key":"x","time":8.23727891156463},{"key":"d","time":8.481088435374147},{"key":"v","time":8.701678004535154},{"key":"b","time":8.928072562358281},{"key":"n","time":9.125442176870749},{"key":"m","time":9.346031746031755},{"key":",","time":9.601451247165542},{"key":".","time":9.839455782312925},{"key":".","time":12.341405895691608},{"key":".","time":12.596825396825395},{"key":"k","time":13.136689342403628},{"key":"k","time":13.421133786848074},{"key":"b","time":13.879727891156463},{"key":"b","time":14.140952380952385},{"key":"c","time":14.59374149659864},{"key":"b","time":14.831746031746036},{"key":"c","time":15.29614512471656},{"key":"b","time":15.534149659863942},{"key":"n","time":15.766349206349204},{"key":"b","time":16.01596371882087},{"key":"n","time":16.39909297052155},{"key":"k","time":16.700952380952387},{"key":"b","time":16.96798185941043},{"key":"b","time":17.24081632653062},{"key":"x","time":17.8097052154195},{"key":"b","time":18.825578231292525},{"key":"v","time":19.063582766439907},{"key":"b","time":19.3364172335601},{"key":"m","time":19.58603174603175},{"key":"n","time":20.0736507936508},{"key":"b","time":20.54965986394558},{"key":"n","time":20.776054421768706},{"key":"v","time":21.037278911564627},{"key":"ShiftRight","time":23.44634920634921},{"key":"/","time":23.67274376417234},{"key":"m","time":25.309750566893428},{"key":"n","time":25.54195011337869},{"key":"b","time":25.785759637188207},{"key":"n","time":26.006349206349213},{"key":"b","time":26.261768707483},{"key":"v","time":26.807437641723354},{"key":"c","time":27.277641723356012},{"key":"v","time":27.509841269841274},{"key":"n","time":27.76526077097506},{"key":"b","time":28.25287981859411},{"key":"c","time":30.418140589569163},{"key":"v","time":30.632925170068035},{"key":"x","time":31.05668934240363},{"key":"c","time":31.28888888888889},{"key":"v","time":31.544308390022678},{"key":"c","time":31.846167800453514},{"key":"n","time":32.565986394557825},{"key":"x","time":33.32063492063493},{"key":"c","time":35.95029478458051},{"key":"k","time":36.18249433106577},{"key":".","time":36.437913832199555},{"key":"k","time":36.65269841269841},{"key":"b","time":36.884897959183675},{"key":"c","time":37.11709750566894},{"key":"b","time":37.33768707482993},{"key":"x","time":38.045895691609985},{"key":"c","time":38.2897052154195},{"key":"k","time":38.51029478458051},{"key":"n","time":38.765714285714296},{"key":"b","time":39.00952380952381},{"key":"n","time":39.270748299319735},{"key":"k","time":39.75836734693878},{"key":"b","time":40.25759637188209},{"key":".","time":40.762630385487526},{"key":"d","time":41.79011337868481},{"key":".","time":42.057142857142864},{"key":"d","time":42.27773242630386},{"key":".","time":42.53315192743764},{"key":",","time":42.776961451247175},{"key":"m","time":43.01496598639456},{"key":",","time":43.24716553287982},{"key":".","time":43.485170068027216},{"key":"n","time":43.73478458049887},{"key":"m","time":43.943764172335605},{"key":"v","time":44.21659863945578},{"key":"x","time":44.62875283446712},{"key":"v","time":44.9015873015873},{"key":"b","time":46.1902947845805},{"key":"n","time":46.39927437641724},{"key":"m","time":46.637278911564636},{"key":"n","time":47.12780045351474},{"key":"m","time":47.35129251700681},{"key":"n","time":47.615419501133786},{"key":"c","time":48.349750566893434},{"key":"v","time":48.57614512471656},{"key":"b","time":48.82575963718821},{"key":"b","time":49.06376417233561},{"key":"v","time":49.29015873015874},{"key":"c","time":49.55138321995466},{"key":"v","time":49.783582766439906},{"key":"b","time":50.0215873015873},{"key":"n","time":50.271201814058955},{"key":".","time":50.54984126984127},{"key":"/","time":51.07229024943311},{"key":"ShiftRight","time":51.5889342403628},{"key":"ShiftRight","time":52.11718820861678},{"key":".","time":53.405895691609985},{"key":".","time":53.69614512471655},{"key":"ShiftRight","time":55.031292517006804},{"key":"/","time":55.304126984126995}]
	],
	playRecord: function(i, j) {
		this.record[i].forEach(function(e) {
			setTimeout(o => piano.note(e.key, false), e.time * 1000);
		});
	},
	saveRecord: function() {
		this.record.push(this.history);
	},
	getHistory: function() {
		console.log(JSON.stringify(this.history));
	}
};
piano.init();
