var style = document.createElement("style");
document.body.appendChild(style);

var canvas = document.createElement("canvas");
canvas.id = "canvas";
document.body.appendChild(canvas);

var context = canvas.getContext("2d");


function outlineBounds() {
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	context.beginPath();
	var bounds = Array.from(document.querySelectorAll("*")).map(function (e) {
		return e.getBoundingClientRect();
	});
	var withinBounds = bounds.filter(function (e) {
		var viewVertical = window.scrollY < e.bottom || e.top < window.scrollY + window.innerHeight;
		var viewHorizontal = window.scrollX < e.right || e.left < window.scrollX + window.innerWidth;
		return viewVertical && viewHorizontal;
	});
	withinBounds.forEach(function (e) {
		context.rect(
			e.left,
			e.top,
			e.right - e.left,
			e.bottom - e.top
		);
	});
	context.stroke();
}
function fillBounds() {
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	context.fillStyle = "#00000011";
	
	var bounds = Array.from(document.querySelectorAll("*")).map(function (e) {
		return e.getBoundingClientRect();
	});
	var withinBounds = bounds.filter(function (e) {
		var viewVertical = window.scrollY < e.bottom || e.top < window.scrollY + window.innerHeight;
		var viewHorizontal = window.scrollX < e.right || e.left < window.scrollX + window.innerWidth;
		return viewVertical && viewHorizontal;
	});
	withinBounds.forEach(function (e) {
		context.fillRect(
			e.left,
			e.top,
			e.right - e.left,
			e.bottom - e.top
		);
	});
}

function resizeCanvas() {
	style.innerHTML = `#canvas {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
		pointer-events: none;
	}`;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	fillBounds();
}

resizeCanvas();

window.addEventListener("scroll", fillBounds);
window.addEventListener("resize", resizeCanvas);

var pixelSize = 8;
var halfPixel = Math.floor(pixelSize / 2);

function drawPixel(x, y, r, g, b, a) {
	context.fillStyle = "rgba(" + [r, g, b, a].join(", ") + ")";
	context.fillRect(x - halfPixel, y - halfPixel, pixelSize, pixelSize);
}

function distanceSquared(a, b) {
	var dx = b.x - a.x;
	var dy = b.y - a.y;
	return dx * dx + dy * dy;
}

function main(mouse) {
	fillBounds();
	var data = context.getImageData(0, 0, context.canvas.width, context.canvas.height).data;
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	for (var x = 0; x < context.canvas.width; x += pixelSize) {
		for (var y = 0; y < context.canvas.height; y += pixelSize) {
			var pixel = {"x": x, "y": y};
			var intensityMouse = 1 / distanceSquared(pixel, mouse);
			var colorMouse = {"r": 0, "g": 255, "b": 255};
			var copy = {"x": window.innerWidth - mouse.x, "y": window.innerHeight - mouse.y};
			var intensityCopy = 1 / distanceSquared(pixel, copy);
			var colorCopy = {"r": 255, "g": 0, "b": 0};
			var intensity = intensityMouse + intensityCopy;
			var color = {
				"r": Math.floor((colorMouse.r * intensityMouse + colorCopy.r * intensityCopy) / intensity),
				"g": Math.floor((colorMouse.g * intensityMouse + colorCopy.g * intensityCopy) / intensity),
				"b": Math.floor((colorMouse.b * intensityMouse + colorCopy.b * intensityCopy) / intensity)
			};
			if (intensity > 0.000001) {
				var ha = 256 * intensity * (256 - data[(x + y * window.innerWidth) * 4 + 3]);
				drawPixel(x, y, Math.floor(color.r * ha), Math.floor(color.g * ha), Math.floor(color.b * ha), 1 - ha);
			}
		}
	}
}

window.addEventListener("mousemove", main);
