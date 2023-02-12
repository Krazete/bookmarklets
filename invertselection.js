javascript:
(function () {
var s, b, m0, m1;

function shield() {
	s = document.createElement("div");
	s.style.position = "fixed";
	s.style.left = 0;
	s.style.top = 0;
	s.style.width = "100%";
	s.style.height = "100%";
	s.style.zIndex = 1e13;
	document.body.appendChild(s);
}

function box() {
	b = document.createElement("div");
	b.style.position = "relative";
	b.style.left = m0.clientX + "px";
	b.style.top = m0.clientY + "px";
	b.style.width = 0;
	b.style.height = 0;
	b.style.outline = "3px dashed black";
	b.style.boxShadow = "inset 0 0 30px 3px white";
	b.style.mixBlendMode = "difference";
	s.appendChild(b);
}

function invert(e) {
	b.remove();
	s.remove();
	e.style.filter = e.style.filter == "invert(1)" ? "" : "invert(1)";
}

function selection(f) {
	var x0 = Math.min(m0.clientX, m1.clientX);
	var x1 = Math.max(m0.clientX, m1.clientX);
	var y0 = Math.min(m0.clientY, m1.clientY);
	var y1 = Math.max(m0.clientY, m1.clientY);
	var dx = Math.max(1, (x1 - x0) / 10);
	var dy = Math.max(1, (y1 - y0) / 10);

	var elementsFromPoints = [];
	for (var x = x0; x <= x1; x += dx) {
		for (var y = y0; y <= y1; y += dy) {
			elementsFromPoints.push(document.elementsFromPoint(x, y));
		}
	}
	elementsFromPoints.sort((a, b) => a.length - b.length);
	var intersection = elementsFromPoints[0].filter((e) => e != b && e != s && elementsFromPoints.every(efp => efp.includes(e)));
	console.log(intersection);
	f(intersection[0]);
}

function pointer(e) {
	if (e.touches) {
		if (e.type == "touchmove") {
			e.preventDefault();
		}
		return e.touches[0] || e.changedTouches[0];
	}
	return e;
}

function release(e) {
	window.removeEventListener("mousemove", drag);
	window.removeEventListener("touchmove", drag);
	window.removeEventListener("mouseup", release);
	window.removeEventListener("touchend", release);
	m1 = pointer(e);
	selection(invert);
}

function drag(e) {
	var m = pointer(e);
	b.style.left = Math.min(m0.clientX, m.clientX) + "px";
	b.style.top = Math.min(m0.clientY, m.clientY) + "px";
	b.style.width = Math.abs(m.clientX - m0.clientX) + "px";
	b.style.height = Math.abs(m.clientY - m0.clientY) + "px";
}

function hold(e) {
	window.removeEventListener("mousedown", hold);
	window.removeEventListener("touchstart", hold);
	window.addEventListener("mousemove", drag);
	window.addEventListener("touchmove", drag, {"passive": false});
	window.addEventListener("mouseup", release);
	window.addEventListener("touchend", release);
	m0 = pointer(e);
	box();
}

shield();
window.addEventListener("mousedown", hold);
window.addEventListener("touchstart", hold);
})();
