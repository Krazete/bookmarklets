(function() {
	var tri = {
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
			tri.orientation.yaw = -Math.cos(Math.PI * e.clientX / innerWidth) * 180 * tri.limit.value;
			tri.orientation.pitch = Math.cos(Math.PI * e.clientY / innerHeight) * 180 * tri.limit.value;
			tri.updateBody();
		},
		gyroMove: function(e) {
			var landscape = innerWidth > innerHeight;
			if (landscape) {
				tri.orientation.yaw = -(e.alpha + e.beta);
				tri.orientation.pitch = e.gamma - Math.sign(90 - Math.abs(e.beta)) * 90;
			}
			else {
				tri.orientation.yaw = -(e.alpha + e.gamma);
				tri.orientation.pitch = e.beta - 90;
			}
			tri.updateBody();
		},
		updateOrigin: function(e) {
			document.body.style.transformOrigin = (innerWidth / 2 + pageXOffset) + "px " + (innerHeight / 2 + pageYOffset) + "px";
		},
		updateBody: function() {
			document.body.style.transform = "perspective(" + Math.pow(2, tri.fov.value) + "px) translateZ(-" + tri.gap.value + "px) rotateX(" + tri.orientation.pitch + "deg) rotateY(" + tri.orientation.yaw + "deg)";
		},
		updateCSS: function() {
			if (tri.non.checked)
				tri.cssDynamic.innerHTML = "";
			else if (tri.off.checked)
				tri.cssDynamic.innerHTML = "* { transform-style: preserve-3d; }";
			else {
				for (var depth = 0; document.querySelector("body" + " > *".repeat(depth)); depth++);
				var gap = tri.gap.value / depth;
				var sag = -Math.PI * tri.sag.value / depth;
				tri.cssDynamic.innerHTML = `
* {
	transform: translateZ(${gap}px) rotateX(${sag}rad);
	transform-style: preserve-3d;
	transition: transform 1s;
	outline: 1px solid rgba(0, 0, 0, 0.0625);
	${tri.flo.checked ? "overflow: visible !important;" : ""}
}
*:hover {
	transform: translateZ(${gap * 2}px) rotateX(${sag * 2}rad);
	${!tri.flo.checked ? "overflow: visible;" : ""}
}
`;
			}
		},
		toggle: function() {
			if (tri.menu.className == "active") {
				tri.menu.removeAttribute("class");
			}
			else {
				tri.menu.className = "active";
			}
		},
		quit: function() {
			window.removeEventListener("deviceorientation", tri.gyroMove);
			window.removeEventListener("mousemove", tri.mouseMove);
			window.removeEventListener("scroll", tri.updateOrigin);
			window.addEventListener("resize", tri.updateOrigin);
			tri.menu.remove();
			tri.cssStatic.remove();
			tri.cssDynamic.remove();
			document.body.removeAttribute("style");
		},
		newRange: function(e, label, min, step, max, value, f) {
			tri.menu.appendChild(e);
			e.type = "range";
			e.min = min;
			e.max = max;
			e.step = step;
			e.value = value;
			e.addEventListener("input", f);
			tri.menu.appendChild(document.createElement("span")).innerHTML = label;
			tri.menu.appendChild(document.createElement("br"));
		},
		newCheckbox: function(e, label, f) {
			tri.menu.appendChild(e);
			e.type = "checkbox";
			e.addEventListener("click", f);
			tri.menu.appendChild(document.createElement("span")).innerHTML = label;
			tri.menu.appendChild(document.createElement("br"));
		},
		newButton: function(e, label, f) {
			tri.menu.appendChild(e);
			e.type = "button";
			e.value = label;
			e.addEventListener("click", f);
		},
		init: function() {
			document.body.parentNode.appendChild(tri.menu).id = "tri-menu";
			tri.newRange(tri.limit, "limit", 0, 0.03125, 1, 0.125, tri.updateBody);
			tri.newRange(tri.gap, "gap / distance", 0, 32, 512, 128, function() {
				tri.updateCSS();
				tri.updateBody();
			});
			tri.newRange(tri.sag, "sag", -0.25, 0.03125, 0.25, 0, tri.updateCSS);
			tri.newRange(tri.fov, "field of view", 7, 1, 13, 10, tri.updateBody);
			tri.newCheckbox(tri.flo, "force overflow", tri.updateCSS);
			tri.flo.setAttribute("checked", "");
			tri.newCheckbox(tri.off, "flatten layers", tri.updateCSS);
			tri.newCheckbox(tri.non, "flatten everything", tri.updateCSS);
			tri.newButton(tri.end, "Quit", tri.quit);
			tri.newButton(tri.tgl, "≡", tri.toggle);
			tri.tgl.id = "tri-toggle";
			tri.menu.appendChild(tri.cssStatic).innerHTML = `
html, body {
	transition-property: none;
	height: 100%;
	width: 100%;
}
html, html:hover, #tri-menu, #tri-menu > *, #tri-menu > *:hover {
	transform: none;
	outline: none;
	overflow: auto !important;
	float: none;
}
#tri-menu {
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
#tri-menu.active {
	transform: none;
}
#tri-toggle {
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
#tri-menu.active > #tri-toggle {
	background: white;
	color: black;
	border-radius: 8px 0 0 0;
}
`;
			tri.menu.appendChild(tri.cssDynamic);
			tri.updateCSS();
			window.addEventListener("deviceorientation", tri.gyroMove);
			window.addEventListener("mousemove", tri.mouseMove);
			window.addEventListener("scroll", tri.updateOrigin);
			window.addEventListener("resize", tri.updateOrigin);
			window.scrollBy(0, 1);
		}
	};
	tri.init();
})();
