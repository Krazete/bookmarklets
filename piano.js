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
	playHistory: function() {
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
		[{"key":"x","time":0.290249433106581},{"key":"c","time":0.5224489795918359},{"key":"k","time":0.7372335600907078},{"key":"c","time":1.004263038548757},{"key":"k","time":1.2422675736961466},{"key":"k","time":2.472925170068031},{"key":"n","time":2.9837641723356043},{"key":"c","time":3.953197278911567},{"key":"k","time":4.208616780045354},{"key":"c","time":4.458231292517006},{"key":"k","time":4.6962358276644025},{"key":"n","time":4.9458503401360545},{"key":"b","time":5.433469387755103},{"key":"b","time":5.683083900226762},{"key":"g","time":5.903673469387755},{"key":"b","time":6.153287981859414},{"key":"b","time":6.408707482993201},{"key":"z","time":7.523265306122454},{"key":"x","time":7.755464852607709},{"key":"d","time":8.010884353741496},{"key":"v","time":8.248888888888892},{"key":"b","time":8.515918367346941},{"key":"n","time":8.771337868480728},{"key":"m","time":9.01804988662132},{"key":",","time":9.264761904761905},{"key":".","time":9.531791383219954},{"key":".","time":12.248526077097509},{"key":".","time":12.544580498866218},{"key":"k","time":13.049614512471656},{"key":"k","time":13.36888888888889},{"key":"b","time":13.873922902494336},{"key":"b","time":14.169977324263037},{"key":"c","time":14.675011337868483},{"key":"b","time":14.95945578231293},{"key":"c","time":15.435464852607709},{"key":"b","time":15.737324263038552},{"key":"n","time":15.992743764172339},{"key":"b","time":16.24235827664399},{"key":"n","time":16.515192743764175},{"key":"k","time":16.77641723356009},{"key":"b","time":17.049251700680273},{"key":"b","time":17.339501133786847},{"key":"x","time":17.931609977324264},{"key":"b","time":19.12743764172336},{"key":"v","time":19.388662131519276},{"key":"b","time":19.64408163265307},{"key":"m","time":19.9285260770975},{"key":"n","time":20.49160997732426},{"key":"b","time":21.002448979591833},{"key":"n","time":21.263673469387754},{"key":"v","time":21.536507936507945},{"key":"ShiftRight","time":24.71764172335601},{"key":"/","time":24.99628117913832},{"key":"m","time":26.7958276643991},{"key":"n","time":27.077369614512477},{"key":"b","time":27.341496598639452},{"key":"n","time":27.614331065759643},{"key":"b","time":27.910385487528345},{"key":"v","time":28.490884353741492},{"key":"c","time":29.04816326530613},{"key":"v","time":29.291972789115647},{"key":"n","time":29.611247165532887},{"key":"b","time":30.151111111111106},{"key":"x","time":31.92743764172336},{"key":"c","time":32.182857142857145},{"key":"v","time":32.45569160997732},{"key":"c","time":32.75755102040816},{"key":"n","time":33.56444444444445},{"key":"x","time":34.39455782312925},{"key":"c","time":37.8485260770975},{"key":"k","time":38.07492063492063},{"key":".","time":38.353560090702956},{"key":"k","time":38.63219954648527},{"key":"b","time":38.91083900226758},{"key":"c","time":39.201088435374146},{"key":"b","time":39.47392290249434},{"key":"x","time":40.425941043083895},{"key":"c","time":40.70458049886622},{"key":"k","time":40.9774149659864},{"key":"n","time":41.2734693877551},{"key":"b","time":41.557913832199546},{"key":"n","time":41.84816326530613},{"key":"k","time":42.440272108843544},{"key":"b","time":43.31102040816327},{"key":".","time":43.60126984126984},{"key":"d","time":44.98285714285714},{"key":".","time":45.27891156462586},{"key":"d","time":45.551746031746035},{"key":".","time":45.841995464852616},{"key":",","time":46.1902947845805},{"key":"m","time":46.4863492063492},{"key":",","time":46.76789115646258},{"key":".","time":47.037823129251706},{"key":"n","time":47.33387755102041},{"key":"m","time":47.64154195011338},{"key":"v","time":47.94920634920635},{"key":"x","time":48.53551020408163},{"key":"v","time":48.84897959183674},{"key":"b","time":50.61369614512472},{"key":"n","time":50.90975056689342},{"key":"m","time":51.19419501133787},{"key":"n","time":51.82403628117915},{"key":"m","time":52.11718820861678},{"key":"n","time":52.43065759637189},{"key":"c","time":53.394285714285715},{"key":"v","time":53.65551020408164},{"key":"b","time":53.95156462585034},{"key":"b","time":54.253424036281174},{"key":"v","time":54.526258503401365},{"key":"c","time":54.84553287981859},{"key":"v","time":55.11836734693878},{"key":"b","time":55.43764172335601},{"key":"n","time":55.74530612244898},{"key":".","time":56.08199546485261},{"key":"/","time":56.73795918367347},{"key":"ShiftRight","time":57.36489795918368},{"key":"ShiftRight","time":57.99764172335601},{"key":".","time":59.38503401360545},{"key":".","time":59.72172335600908},{"key":"ShiftRight","time":61.207800453514736},{"key":"/","time":61.52126984126984}],
		[{"key":"o","time":0.7380725623582767},{"key":"0","time":1.0109070294784581},{"key":"p","time":1.277936507936508},{"key":"x","time":1.3069614512471655},{"key":"s","time":2.572448979591837},{"key":"\\","time":2.5782539682539687},{"key":"o","time":3.803106575963719},{"key":"z","time":3.8089115646258502},{"key":"a","time":4.9582993197278915},{"key":"]","time":4.969909297052155},{"key":"i","time":6.363106575963719},{"key":"ShiftLeft","time":6.386326530612245},{"key":"[","time":7.976893424036282},{"key":"i","time":9.259795918367347},{"key":"u","time":9.521020408163265},{"key":"\\","time":10.780702947845805},{"key":"o","time":10.7981179138322},{"key":"a","time":11.657256235827665},{"key":"0","time":11.668866213151928},{"key":"a","time":12.17390022675737},{"key":"p","time":12.179705215419501},{"key":"y","time":13.329092970521542},{"key":"o","time":14.937074829931973},{"key":"z","time":14.948684807256235},{"key":"]","time":16.492811791383218},{"key":"a","time":16.49861678004535},{"key":"i","time":18.21689342403628},{"key":"ShiftLeft","time":19.946780045351474},{"key":"[","time":19.952585034013605},{"key":"u","time":21.50832199546485},{"key":"[","time":23.37172335600907},{"key":"ShiftLeft","time":23.63294784580499},{"key":"p","time":25.107414965986393},{"key":"\\","time":26.541247165532877},{"key":"z","time":27.905419501133785},{"key":"o","time":27.92283446712018},{"key":"p","time":29.57145124716553},{"key":"a","time":29.57725623582766},{"key":"u","time":31.109773242630386},{"key":"ShiftLeft","time":31.13299319727891},{"key":"\\","time":32.77},{"key":"y","time":32.78741496598639},{"key":"o","time":34.26768707482994},{"key":"0","time":36.40392290249433},{"key":"p","time":37.219523809523814},{"key":"a","time":38.12219954648526},{"key":"\\","time":38.85943310657596},{"key":"y","time":39.66052154195012},{"key":"9","time":40.17716553287982},{"key":"o","time":40.461609977324265},{"key":"\\","time":41.25108843537415},{"key":"]","time":42.03476190476191},{"key":"]","time":42.77780045351474},{"key":"o","time":43.36990929705215},{"key":"i","time":43.64274376417234},{"key":"]","time":44.49027210884354},{"key":"[","time":45.29136054421769},{"key":"z","time":46.080839002267574},{"key":"ShiftLeft","time":47.02705215419501},{"key":"[","time":47.89199546485261},{"key":"u","time":48.745328798185945},{"key":"i","time":49.37807256235828},{"key":"o","time":49.659614512471656},{"key":"[","time":50.1733560090703},{"key":"p","time":50.48102040816327},{"key":"ShiftLeft","time":51.56074829931973},{"key":"\\","time":52.27476190476191},{"key":"9","time":53.2674149659864},{"key":"o","time":54.2252380952381},{"key":"i","time":55.125011337868486},{"key":"i","time":56.01897959183674},{"key":"8","time":56.924557823129255},{"key":"]","time":57.94043083900227},{"key":"u","time":58.89825396825397},{"key":"o","time":59.873492063492066},{"key":"]","time":60.72102040816327},{"key":"\\","time":61.58015873015873},{"key":"p","time":62.49154195011338},{"key":"0","time":63.379705215419506}]
	],
	playRecord: function(i) {
		this.record[i].forEach(function(r) {
			setTimeout(e => piano.note(r.key, false), r.time * 1000);
		});
	},
	playRecords: function() {
		this.record.forEach(function(r) {
			r.forEach(function(ri) {
				setTimeout(e => piano.note(ri.key, false), ri.time * 1000);
			});
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
