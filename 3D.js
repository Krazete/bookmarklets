(function() {
var d3 = {
	menu: document.createElement("div"),
	limit: document.createElement("input"),
	gap: document.createElement("input"),
	sag: document.createElement("input"),
	fov: document.createElement("input"),
	flo: document.createElement("input"),
	off: document.createElement("input"),
	non: document.createElement("input"),
	end: document.createElement("input"),
	tgl: document.createElement("input"),
	cssStatic: document.createElement("style"),
	cssDynamic: document.createElement("style"),
	mouse: {"x": 0, "y": 0},
	mouseMove: function(e) {
		d3.mouse.x = e.clientX;
		d3.mouse.y = e.clientY;
		d3.updateBody();
	},
	onScroll: function(e) {
		document.body.style.transformOrigin = (innerWidth / 2 + pageXOffset) + "px " + (innerHeight / 2 + pageYOffset) + "px";
	},
	updateBody: function() {
		var x = Math.cos(Math.PI * d3.mouse.y / innerHeight) * Math.PI * d3.limit.value;
		var y = -Math.cos(Math.PI * d3.mouse.x / innerWidth) * Math.PI * d3.limit.value;
		document.body.style.transform = "perspective(" + Math.pow(2, d3.fov.value) + "px) translateZ(-" + d3.gap.value + "px) rotateX(" + x + "rad) rotateY(" + y + "rad)";
	},
	updateCSS: function() {
		if (d3.non.checked)
			d3.cssDynamic.innerHTML = "";
		else if (d3.off.checked)
			d3.cssDynamic.innerHTML = "* { transform-style: preserve-3d; }";
		else {
			for (var depth = 0; document.querySelector("body" + " > *".repeat(depth)); depth++);
			var gap = d3.gap.value / depth;
			var sag = -Math.PI * d3.sag.value / depth;
			d3.cssDynamic.innerHTML = `
* {
	transform: translateZ(${gap}px) rotateX(${sag}rad);
	transform-style: preserve-3d;
	transition: transform 1s;
	outline: 1px solid rgba(0, 0, 0, 0.0625);
	${d3.flo.checked ? "overflow: visible !important;" : ""}
}
*:hover {
	transform: translateZ(${gap * 2}px) rotateX(${sag * 2}rad);
	${!d3.flo.checked ? "overflow: visible;" : ""}
}
`;
		}
	},
	toggle: function() {
		if (d3.menu.className == "active") {
			d3.menu.removeAttribute("class");
		}
		else {
			d3.menu.className = "active";
		}
	},
	quit: function() {
		window.removeEventListener("mousemove", d3.mouseMove);
		window.removeEventListener("scroll", d3.onScroll);
		d3.menu.remove();
		d3.cssStatic.remove();
		d3.cssDynamic.remove();
		document.body.removeAttribute("style");
	},
	newRange: function(e, label, min, step, max, value, f) {
		d3.menu.appendChild(e);
		e.type = "range";
		e.min = min;
		e.max = max;
		e.step = step;
		e.value = value;
		e.addEventListener("input", f);
		d3.menu.appendChild(document.createElement("span")).innerHTML = label;
		d3.menu.appendChild(document.createElement("br"));
	},
	newCheckbox: function(e, label, f) {
		d3.menu.appendChild(e);
		e.type = "checkbox";
		e.addEventListener("click", f);
		d3.menu.appendChild(document.createElement("span")).innerHTML = label;
		d3.menu.appendChild(document.createElement("br"));
	},
	newButton: function(e, label, f) {
		d3.menu.appendChild(e);
		e.type = "button";
		e.value = label;
		e.addEventListener("click", f);
	},
	init: function() {
		document.body.parentNode.appendChild(d3.menu).id = "d3-menu";
		d3.newRange(d3.limit, "limit", 0, 0.03125, 1, 0.125, d3.updateBody);
		d3.newRange(d3.gap, "gap / distance", 0, 32, 512, 128, function() {
			d3.updateCSS();
			d3.updateBody();
		});
		d3.newRange(d3.sag, "sag", -0.25, 0.03125, 0.25, 0, d3.updateCSS);
		d3.newRange(d3.fov, "field of view", 7, 1, 13, 10, d3.updateBody);
		d3.newCheckbox(d3.flo, "force overflow", d3.updateCSS);
		d3.flo.setAttribute("checked", "");
		d3.newCheckbox(d3.off, "flatten tiles", d3.updateCSS);
		d3.newCheckbox(d3.non, "flatten everything", d3.updateCSS);
		d3.newButton(d3.end, "Quit", d3.quit);
		d3.newButton(d3.tgl, "≡", d3.toggle);
		d3.tgl.id = "d3-toggle";
		document.head.appendChild(d3.cssStatic).innerHTML = `
html, body {
	transition-property: none;
	height: 100%;
	width: 100%;
}
html, html:hover, #d3-menu, #d3-menu > *, #d3-menu > *:hover {
	transform: none;
	outline: none;
	overflow: auto !important;
	float: none;
}
#d3-menu {
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	color: white;
	border: 1px solid rgba(255, 255, 255, 0.5);;
	border-radius: 0 0 16px 0;
	padding: 8px;
	transform: translate(-100%, -100%) translate(32px, 32px);
}
#d3-menu.active {
	transform: none;
}
#d3-toggle {
	position: absolute;
	bottom: 0;
	right: 0;
	height: 32px;
	width: 32px;
	background: transparent;
	color: white;
	border: none;
}
#d3-menu.active > #d3-toggle {
	background: white;
	color: black;
	border-radius: 8px 0 0 0;
}
`;
		document.head.appendChild(d3.cssDynamic);
		d3.updateCSS();
		window.addEventListener("mousemove", d3.mouseMove);
		window.addEventListener("scroll", d3.onScroll);
		window.scrollBy(0, 1);
	}
};
d3.init();
})();
