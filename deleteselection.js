javascript:
(function () {
var s, b, m0, m1;

function box() {
	var r = "r" + parseInt(1e13 * Math.random());
	document.body.style.pointerEvents = "none";
	s = document.createElement("style");
	s.textContent = "." + r + "::after{content:'\\00D7';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:red;font-size:15em;}";
	document.body.appendChild(s);
	b = document.createElement("div");
	b.className = r;
	b.style.position = "absolute";
	b.style.left = m0.x + "px";
	b.style.top = m0.y + "px";
	b.style.width = 0;
	b.style.height = 0;
	b.style.outline = "3px dashed red";
	b.style.boxShadow = "inset 0 0 30px 3px pink";
	b.style.mixBlendMode = "difference";
	b.style.overflow = "hidden";
	b.style.zIndex = 1e13;
	document.body.appendChild(b);
}

function rebox(m) {
	b.style.left = Math.min(m0.x, m.x) + "px";
	b.style.top = Math.min(m0.y, m.y) + "px";
	b.style.width = Math.abs(m.x - m0.x) + "px";
	b.style.height = Math.abs(m.y - m0.y) + "px";
}

function unbox() {
	document.body.style.pointerEvents = "";
	s.remove();
	b.remove();
}

function removeSelection() {
	var x0 = Math.min(m0.x, m1.x);
	var x1 = Math.max(m0.x, m1.x);
	var y0 = Math.min(m0.y, m1.y);
	var y1 = Math.max(m0.y, m1.y);
	var dx = Math.max(1, (x1 - x0) / 10);
	var dy = Math.max(1, (y1 - y0) / 10);

	var elementsFromPoints = [];
	for (var x = x0; x <= x1; x += dx) {
		for (var y = y0; y <= y1; y += dy) {
			elementsFromPoints.push(document.elementsFromPoint(x - window.scrollX, y - window.scrollY));
		}
	}
	elementsFromPoints.sort((a, b) => a.length - b.length);
	var intersection = elementsFromPoints[0].filter((e) => e != b && elementsFromPoints.every(efp => efp.includes(e)));
	console.log(intersection);
	intersection[0].remove();
}

function pointer(e) {
	e.preventDefault();
	if (e.touches) {
		return {
			x: (e.touches[0] || e.changedTouches[0]).clientX + window.scrollX,
			y: (e.touches[0] || e.changedTouches[0]).clientY + window.scrollY
		};
	}
	return {
		x: e.clientX + window.scrollX,
		y: e.clientY + window.scrollY
	};
}

function release(e) {
	window.removeEventListener("mousemove", drag);
	window.removeEventListener("touchmove", drag);
	window.removeEventListener("mouseup", release);
	window.removeEventListener("touchend", release);
	m1 = pointer(e);
	unbox();
	removeSelection();
}

function drag(e) {
	var m = pointer(e);
	rebox(m);
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

document.body.style.pointerEvents = "none";

window.addEventListener("mousedown", hold);
window.addEventListener("touchstart", hold);
})();
