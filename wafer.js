(function() {
	var wafer = {
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
			wafer.orientation.yaw = -Math.cos(Math.PI * e.clientX / innerWidth) * 180 * wafer.limit.value;
			wafer.orientation.pitch = Math.cos(Math.PI * e.clientY / innerHeight) * 180 * wafer.limit.value;
			wafer.updateBody();
		},
		gyroMove: function(e) {
			var landscape = innerWidth > innerHeight;
			if (landscape) {
				wafer.orientation.yaw = -(e.alpha + e.beta);
				wafer.orientation.pitch = e.gamma - Math.sign(90 - Math.abs(e.beta)) * 90;
			}
			else {
				wafer.orientation.yaw = -(e.alpha + e.gamma);
				wafer.orientation.pitch = e.beta - 90;
			}
			wafer.updateBody();
		},
		updateOrigin: function(e) {
			document.body.style.transformOrigin = (innerWidth / 2 + pageXOffset) + "px " + (innerHeight / 2 + pageYOffset) + "px";
		},
		updateBody: function() {
			document.body.style.transform = "perspective(" + Math.pow(2, wafer.fov.value) + "px) translateZ(-" + wafer.gap.value + "px) rotateX(" + wafer.orientation.pitch + "deg) rotateY(" + wafer.orientation.yaw + "deg)";
		},
		updateCSS: function() {
			if (wafer.non.checked)
				wafer.cssDynamic.innerHTML = "";
			else if (wafer.off.checked)
				wafer.cssDynamic.innerHTML = "* { transform-style: preserve-3d; }";
			else {
				for (var depth = 0; document.querySelector("body" + " > *".repeat(depth)); depth++);
				var gap = wafer.gap.value / depth;
				var sag = -Math.PI * wafer.sag.value / depth;
				wafer.cssDynamic.innerHTML = `
* {
	transform: translateZ(${gap}px) rotateX(${sag}rad);
	transform-style: preserve-3d;
	transition: transform 1s;
	outline: 1px solid rgba(0, 0, 0, 0.0625);
	${wafer.flo.checked ? "overflow: visible !important;" : ""}
}
*:hover {
	transform: translateZ(${gap * 2}px) rotateX(${sag * 2}rad);
	${!wafer.flo.checked ? "overflow: visible;" : ""}
}
`;
			}
		},
		toggle: function() {
			if (wafer.menu.className == "active") {
				wafer.menu.removeAttribute("class");
			}
			else {
				wafer.menu.className = "active";
			}
		},
		quit: function() {
			window.removeEventListener("deviceorientation", wafer.gyroMove);
			window.removeEventListener("mousemove", wafer.mouseMove);
			window.removeEventListener("scroll", wafer.updateOrigin);
			window.addEventListener("resize", wafer.updateOrigin);
			wafer.menu.remove();
			wafer.cssStatic.remove();
			wafer.cssDynamic.remove();
			document.body.removeAttribute("style");
		},
		newRange: function(e, label, min, step, max, value, f) {
			wafer.menu.appendChild(e);
			e.type = "range";
			e.min = min;
			e.max = max;
			e.step = step;
			e.value = value;
			e.addEventListener("input", f);
			wafer.menu.appendChild(document.createElement("span")).innerHTML = label;
			wafer.menu.appendChild(document.createElement("br"));
		},
		newCheckbox: function(e, label, f) {
			wafer.menu.appendChild(e);
			e.type = "checkbox";
			e.addEventListener("click", f);
			wafer.menu.appendChild(document.createElement("span")).innerHTML = label;
			wafer.menu.appendChild(document.createElement("br"));
		},
		newButton: function(e, label, f) {
			wafer.menu.appendChild(e);
			e.type = "button";
			e.value = label;
			e.addEventListener("click", f);
		},
		init: function() {
			document.body.parentNode.appendChild(wafer.menu).id = "wafer-menu";
			wafer.newRange(wafer.limit, "limit", 0, 0.03125, 1, 0.125, wafer.updateBody);
			wafer.newRange(wafer.gap, "gap / distance", 0, 32, 512, 128, function() {
				wafer.updateCSS();
				wafer.updateBody();
			});
			wafer.newRange(wafer.sag, "sag", -0.25, 0.03125, 0.25, 0, wafer.updateCSS);
			wafer.newRange(wafer.fov, "field of view", 7, 1, 13, 10, wafer.updateBody);
			wafer.newCheckbox(wafer.flo, "force overflow", wafer.updateCSS);
			wafer.flo.setAttribute("checked", "");
			wafer.newCheckbox(wafer.off, "flatten layers", wafer.updateCSS);
			wafer.newCheckbox(wafer.non, "flatten everything", wafer.updateCSS);
			wafer.newButton(wafer.end, "Quit", wafer.quit);
			wafer.newButton(wafer.tgl, "≡", wafer.toggle);
			wafer.tgl.id = "wafer-toggle";
			document.head.appendChild(wafer.cssStatic).innerHTML = `
html, body {
	transition-property: none;
	height: 100%;
	width: 100%;
}
html, html:hover, #wafer-menu, #wafer-menu > *, #wafer-menu > *:hover {
	transform: none;
	outline: none;
	overflow: auto !important;
	float: none;
}
#wafer-menu {
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
#wafer-menu.active {
	transform: none;
}
#wafer-toggle {
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
#wafer-menu.active > #wafer-toggle {
	background: white;
	color: black;
	border-radius: 8px 0 0 0;
}
`;
			document.head.appendChild(wafer.cssDynamic);
			wafer.updateCSS();
			window.addEventListener("deviceorientation", wafer.gyroMove);
			window.addEventListener("mousemove", wafer.mouseMove);
			window.addEventListener("scroll", wafer.updateOrigin);
			window.addEventListener("resize", wafer.updateOrigin);
			window.scrollBy(0, 1);
		}
	};
	wafer.init();
})();
