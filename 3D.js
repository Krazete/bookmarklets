javascript:
var d3 = {
	"nav": document.createElement("div"),
	"lim": document.createElement("input"),
	"gap": document.createElement("input"),
	"sag": document.createElement("input"),
	"fov": document.createElement("input"),
	"flo": document.createElement("input"),
	"off": document.createElement("input"),
	"non": document.createElement("input"),
	"tileStyle": document.createElement("style"),
	"styleTile": function() {
		if (d3.non.checked)
			d3.tileStyle.innerHTML = "";
		else if (d3.off.checked)
			d3.tileStyle.innerHTML = "* {\
				transform-style: preserve-3d;\
			}";
		else {
			for (var depth = 0; document.querySelector("body" + " > *".repeat(depth)); depth++);
			var gap = d3.gap.value / depth;
			var sag = -Math.PI * d3.sag.value / depth;
			d3.tileStyle.innerHTML = "\
			* {\
				transform: translateZ(" + gap + "px) rotateX(" + sag + "rad);\
				transform-style: preserve-3d;\
				transition: transform 1s;\
				outline: 1px solid rgba(0, 0, 0, 0.0625);\
			" + (d3.flo.checked ? "overflow: visible !important;" : "") + "\
			}\
			*:hover {\
				transform: translateZ(" + gap * 2 + "px) rotateX(" + sag * 2 + "rad);\
			" + (!d3.flo.checked ? "overflow: visible;" : "") + "\
			}\
			";
		}
	},
	"mouse": {"x": 0, "y": 0},
	"mouseMove": function(e) {
		d3.mouse.x = e.clientX;
		d3.mouse.y = e.clientY;
		d3.mouseMoved();
	},
	"mouseMoved": function() {
		var x = Math.cos(Math.PI * d3.mouse.y / innerHeight) * Math.PI * d3.lim.value;
		var y = -Math.cos(Math.PI * d3.mouse.x / innerWidth) * Math.PI * d3.lim.value;
		document.body.style.transform = "perspective(" + Math.pow(2, d3.fov.value) + "px) translateZ(-" + d3.gap.value + "px) rotateX(" + x + "rad) rotateY(" + y + "rad)";
	},
	"newRange": function(e, label, min, max, step, value, f) {
		d3.nav.appendChild(document.createElement("span")).innerHTML = label;
		d3.nav.appendChild(e);
		e.type = "range";
		e.min = min;
		e.max = max;
		e.step = step;
		e.value = value;
		e.addEventListener("input", f);
	},
	"newCheckbox": function(e, label, f) {
		d3.nav.appendChild(document.createElement("span")).innerHTML = label;
		d3.nav.appendChild(e);
		e.type = "checkbox";
		e.addEventListener("click", f);
	},
	"init": function() {
		document.body.parentNode.appendChild(d3.nav).className = "d3Nav";
		d3.newRange(d3.lim, "limits", 0, 1, 0.03125, 0.125, d3.mouseMoved);
		d3.newRange(d3.gap, "gap / distance", 0, 512, 32, 128, function() {
			d3.styleTile();
			d3.mouseMoved();
		});
		d3.newRange(d3.sag, "sag", -0.25, 0.25, 0.03125, 0, d3.styleTile);
		d3.newRange(d3.fov, "perspective", 7, 13, 1, 10, d3.mouseMoved);
		d3.newCheckbox(d3.flo, "force overflow", d3.styleTile);
		d3.newCheckbox(d3.off, "flatten tiles", d3.styleTile);
		d3.newCheckbox(d3.non, "flatten everything", d3.styleTile);
		document.body.parentNode.appendChild(document.createElement("style")).innerHTML = "\
		html, body {\
			transition-property: none;\
			height: 100%;\
			width: 100%;\
		}\
		html, html:hover, .d3Nav, .d3Nav:hover, .d3Nav>*, .d3Nav>*:hover {\
			transform: none;\
			outline: none;\
			overflow: auto !important;\
		}\
		.d3Nav {\
			position: fixed;\
			top: 0;\
			left: 0;\
			background: rgba(0, 0, 0, 0.5);\
			color: #ffffff;\
			border-radius: 0 0 16px 0;\
			padding: 0 8px 8px 0;\
			transform: translate(-100%, -100%) translate(32px, 32px);\
		}\
		.d3Nav:after {\
			content: '\\2261';\
			position: absolute;\
			bottom: 8px;\
			right: 8px;\
		}\
		.d3Nav:hover {\
			transform: none;\
		}\
		.d3Nav>* {\
			display: block;\
		}\
		";
		document.body.parentNode.appendChild(d3.tileStyle);
		d3.styleTile();
		window.addEventListener("mousemove", d3.mouseMove);
		window.addEventListener("scroll", function(e) {
			document.body.style.transformOrigin = (innerWidth / 2 + pageXOffset) + "px " + (innerHeight / 2 + pageYOffset) + "px";
		});
		window.scrollBy(0, 1);
	},
};
d3.init();
