(function() {
	var layers = {
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
		orientation: {"yaw": 0, "pitch": 0, "roll": 0},
		mouseMove: function(e) {
			layers.orientation.yaw = -Math.cos(Math.PI * e.clientX / innerWidth) * 180 * layers.limit.value;
			layers.orientation.pitch = Math.cos(Math.PI * e.clientY / innerHeight) * 180 * layers.limit.value;
			layers.updateBody();
		},
		gyroMove: function(e) {
			var landscape = innerWidth > innerHeight;
			if (landscape) {
				layers.orientation.yaw = -(e.alpha + e.beta);
				layers.orientation.pitch = e.gamma - Math.sign(90 - Math.abs(e.beta)) * 90;
			}
			else {
				layers.orientation.yaw = -(e.alpha + e.gamma);
				layers.orientation.pitch = e.beta - 90;
			}
			layers.updateBody();
		},
		updateOrigin: function(e) {
			document.body.style.transformOrigin = (innerWidth / 2 + pageXOffset) + "px " + (innerHeight / 2 + pageYOffset) + "px";
		},
		updateBody: function() {
			document.body.style.transform = "perspective(" + Math.pow(2, layers.fov.value) + "px) translateZ(-" + layers.gap.value + "px) rotateX(" + layers.orientation.pitch + "deg) rotateY(" + layers.orientation.yaw + "deg)";
		},
		updateCSS: function() {
			if (layers.non.checked)
				layers.cssDynamic.innerHTML = "";
			else if (layers.off.checked)
				layers.cssDynamic.innerHTML = "* { transform-style: preserve-3d; }";
			else {
				for (var depth = 0; document.querySelector("body" + " > *".repeat(depth)); depth++);
				var gap = layers.gap.value / depth;
				var sag = -Math.PI * layers.sag.value / depth;
				layers.cssDynamic.innerHTML = `
* {
	transform: translateZ(${gap}px) rotateX(${sag}rad);
	transform-style: preserve-3d;
	transition: transform 1s;
	outline: 1px solid rgba(0, 0, 0, 0.0625);
	${layers.flo.checked ? "overflow: visible !important;" : ""}
}
*:hover {
	transform: translateZ(${gap * 2}px) rotateX(${sag * 2}rad);
	${!layers.flo.checked ? "overflow: visible;" : ""}
}
`;
			}
		},
		toggle: function() {
			if (layers.menu.className == "active") {
				layers.menu.removeAttribute("class");
			}
			else {
				layers.menu.className = "active";
			}
		},
		quit: function() {
			window.removeEventListener("deviceorientation", layers.gyroMove);
			window.removeEventListener("mousemove", layers.mouseMove);
			window.removeEventListener("scroll", layers.updateOrigin);
			window.addEventListener("resize", layers.updateOrigin);
			layers.menu.remove();
			layers.cssStatic.remove();
			layers.cssDynamic.remove();
			document.body.removeAttribute("style");
		},
		newRange: function(e, label, min, step, max, value, f) {
			layers.menu.appendChild(e);
			e.type = "range";
			e.min = min;
			e.max = max;
			e.step = step;
			e.value = value;
			e.addEventListener("input", f);
			layers.menu.appendChild(document.createElement("span")).innerHTML = label;
			layers.menu.appendChild(document.createElement("br"));
		},
		newCheckbox: function(e, label, f) {
			layers.menu.appendChild(e);
			e.type = "checkbox";
			e.addEventListener("click", f);
			layers.menu.appendChild(document.createElement("span")).innerHTML = label;
			layers.menu.appendChild(document.createElement("br"));
		},
		newButton: function(e, label, f) {
			layers.menu.appendChild(e);
			e.type = "button";
			e.value = label;
			e.addEventListener("click", f);
		},
		init: function() {
			document.body.parentNode.appendChild(layers.menu).id = "layers-menu";
			layers.newRange(layers.limit, "limit", 0, 0.03125, 1, 0.125, layers.updateBody);
			layers.newRange(layers.gap, "gap / distance", 0, 32, 512, 128, function() {
				layers.updateCSS();
				layers.updateBody();
			});
			layers.newRange(layers.sag, "sag", -0.25, 0.03125, 0.25, 0, layers.updateCSS);
			layers.newRange(layers.fov, "field of view", 7, 1, 13, 10, layers.updateBody);
			layers.newCheckbox(layers.flo, "force overflow", layers.updateCSS);
			layers.flo.setAttribute("checked", "");
			layers.newCheckbox(layers.off, "flatten layers", layers.updateCSS);
			layers.newCheckbox(layers.non, "flatten everything", layers.updateCSS);
			layers.newButton(layers.end, "Quit", layers.quit);
			layers.newButton(layers.tgl, "≡", layers.toggle);
			layers.tgl.id = "layers-toggle";
			layers.menu.appendChild(layers.cssStatic).innerHTML = `
html, body {
	transition-property: none;
	height: 100%;
	width: 100%;
}
html, html:hover, #layers-menu, #layers-menu > *, #layers-menu > *:hover {
	transform: none;
	outline: none;
	overflow: auto !important;
	float: none;
}
#layers-menu {
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
#layers-menu.active {
	transform: none;
}
#layers-toggle {
	position: absolute;
	bottom: 0;
	right: 0;
	height: 32px;
	width: 32px;
	background: transparent;
	color: white;
	border: none;
	cursor: pointer;
}
#layers-menu.active > #layers-toggle {
	background: white;
	color: black;
	border-radius: 8px 0 0 0;
}
`;
			layers.menu.appendChild(layers.cssDynamic);
			layers.updateCSS();
			window.addEventListener("deviceorientation", layers.gyroMove);
			window.addEventListener("mousemove", layers.mouseMove);
			window.addEventListener("scroll", layers.updateOrigin);
			window.addEventListener("resize", layers.updateOrigin);
			window.scrollBy(0, 1);
		}
	};
	layers.init();
})();
