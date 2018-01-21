(function() {
	var wafers = {
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
			wafers.orientation.yaw = -Math.cos(Math.PI * e.clientX / innerWidth) * 180 * wafers.limit.value;
			wafers.orientation.pitch = Math.cos(Math.PI * e.clientY / innerHeight) * 180 * wafers.limit.value;
			wafers.updateBody();
		},
		gyroMove: function(e) {
			var landscape = innerWidth > innerHeight;
			if (landscape) {
				wafers.orientation.yaw = -(e.alpha + e.beta);
				wafers.orientation.pitch = e.gamma - Math.sign(90 - Math.abs(e.beta)) * 90;
			}
			else {
				wafers.orientation.yaw = -(e.alpha + e.gamma);
				wafers.orientation.pitch = e.beta - 90;
			}
			wafers.updateBody();
		},
		updateOrigin: function(e) {
			document.body.style.transformOrigin = (innerWidth / 2 + pageXOffset) + "px " + (innerHeight / 2 + pageYOffset) + "px";
		},
		updateBody: function() {
			document.body.style.transform = "perspective(" + Math.pow(2, wafers.fov.value) + "px) translateZ(-" + wafers.gap.value + "px) rotateX(" + wafers.orientation.pitch + "deg) rotateY(" + wafers.orientation.yaw + "deg)";
		},
		updateCSS: function() {
			if (wafers.non.checked)
				wafers.cssDynamic.innerHTML = "";
			else if (wafers.off.checked)
				wafers.cssDynamic.innerHTML = "* { transform-style: preserve-3d; }";
			else {
				for (var depth = 0; document.querySelector("body" + " > *".repeat(depth)); depth++);
				var gap = wafers.gap.value / depth;
				var sag = -Math.PI * wafers.sag.value / depth;
				wafers.cssDynamic.innerHTML = `
* {
	transform: translateZ(${gap}px) rotateX(${sag}rad);
	transform-style: preserve-3d;
	transition: transform 1s;
	outline: 1px solid rgba(0, 0, 0, 0.0625);
	${wafers.flo.checked ? "overflow: visible !important;" : ""}
}
*:hover {
	transform: translateZ(${gap * 2}px) rotateX(${sag * 2}rad);
	${!wafers.flo.checked ? "overflow: visible;" : ""}
}
`;
			}
		},
		toggle: function() {
			if (wafers.menu.className == "active") {
				wafers.menu.removeAttribute("class");
			}
			else {
				wafers.menu.className = "active";
			}
		},
		quit: function() {
			window.removeEventListener("deviceorientation", wafers.gyroMove);
			window.removeEventListener("mousemove", wafers.mouseMove);
			window.removeEventListener("scroll", wafers.updateOrigin);
			window.addEventListener("resize", wafers.updateOrigin);
			wafers.menu.remove();
			wafers.cssStatic.remove();
			wafers.cssDynamic.remove();
			document.body.removeAttribute("style");
		},
		newRange: function(e, label, min, step, max, value, f) {
			wafers.menu.appendChild(e);
			e.type = "range";
			e.min = min;
			e.max = max;
			e.step = step;
			e.value = value;
			e.addEventListener("input", f);
			wafers.menu.appendChild(document.createElement("span")).innerHTML = label;
			wafers.menu.appendChild(document.createElement("br"));
		},
		newCheckbox: function(e, label, f) {
			wafers.menu.appendChild(e);
			e.type = "checkbox";
			e.addEventListener("click", f);
			wafers.menu.appendChild(document.createElement("span")).innerHTML = label;
			wafers.menu.appendChild(document.createElement("br"));
		},
		newButton: function(e, label, f) {
			wafers.menu.appendChild(e);
			e.type = "button";
			e.value = label;
			e.addEventListener("click", f);
		},
		init: function() {
			document.body.parentNode.appendChild(wafers.menu).id = "wafers-menu";
			wafers.newRange(wafers.limit, "limit", 0, 0.03125, 1, 0.125, wafers.updateBody);
			wafers.newRange(wafers.gap, "gap / distance", 0, 32, 512, 128, function() {
				wafers.updateCSS();
				wafers.updateBody();
			});
			wafers.newRange(wafers.sag, "sag", -0.25, 0.03125, 0.25, 0, wafers.updateCSS);
			wafers.newRange(wafers.fov, "field of view", 7, 1, 13, 10, wafers.updateBody);
			wafers.newCheckbox(wafers.flo, "force overflow", wafers.updateCSS);
			wafers.flo.setAttribute("checked", "");
			wafers.newCheckbox(wafers.off, "flatten layers", wafers.updateCSS);
			wafers.newCheckbox(wafers.non, "flatten everything", wafers.updateCSS);
			wafers.newButton(wafers.end, "Quit", wafers.quit);
			wafers.newButton(wafers.tgl, "≡", wafers.toggle);
			wafers.tgl.id = "wafers-toggle";
			wafers.menu.appendChild(wafers.cssStatic).innerHTML = `
html, body {
	transition-property: none;
	height: 100%;
	width: 100%;
}
html, html:hover, #wafers-menu, #wafers-menu > *, #wafers-menu > *:hover {
	transform: none;
	outline: none;
	overflow: auto !important;
	float: none;
}
#wafers-menu {
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
#wafers-menu.active {
	transform: none;
}
#wafers-toggle {
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
#wafers-menu.active > #wafers-toggle {
	background: white;
	color: black;
	border-radius: 8px 0 0 0;
}
`;
			wafers.menu.appendChild(wafers.cssDynamic);
			wafers.updateCSS();
			window.addEventListener("deviceorientation", wafers.gyroMove);
			window.addEventListener("mousemove", wafers.mouseMove);
			window.addEventListener("scroll", wafers.updateOrigin);
			window.addEventListener("resize", wafers.updateOrigin);
			window.scrollBy(0, 1);
		}
	};
	wafers.init();
})();
