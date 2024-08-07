javascript:
var censorStyle;
var sensed;
var censors;
var af;
var quality = 1.5; /* higher = more pixels */

function onScreen(r) {
    return r.right > 0 && r.bottom > 0 && r.left < innerWidth && r.top < innerHeight;
}

function copyStyle(donor, recipient, sizeOnly) {
    var donorStyle = getComputedStyle(donor);
    var keys = Object.keys(donorStyle);
    if (sizeOnly) {
        keys = ["width", "height"];
    }
    for (var key of keys) {
        recipient.style[key] = donorStyle[key];
    }
}

function updateCensor(e, canvas) {
    var rect = e.getBoundingClientRect();
    if (onScreen(rect)) {
        var equalizer = Math.log2(Math.max(rect.width * rect.height, 2));
        canvas.width = rect.width * quality / equalizer;
        canvas.height = rect.height * quality / equalizer;
        if (af % 120 == 0) { /* delay because expensive */
            copyStyle(e, canvas, true);
        }

        var context = canvas.getContext("2d");
        context.drawImage(e, 0, 0, canvas.width, canvas.height);
        e.parentElement.classList.add("censor-parent");
        return canvas;
    }
}

function createCensor(e) {
    var rect = e.getBoundingClientRect();
    if (onScreen(rect)) {
        var canvas = document.createElement("canvas");
        canvas.className = "censor";

        var equalizer = Math.log2(Math.max(rect.width * rect.height, 2));
        canvas.width = rect.width * quality / equalizer;
        canvas.height = rect.height * quality / equalizer;
        copyStyle(e, canvas);

        var context = canvas.getContext("2d");
        context.drawImage(e, 0, 0, canvas.width, canvas.height);

        e.parentElement.insertBefore(canvas, e);
        e.parentElement.classList.add("censor-parent");

        return canvas;
    }
}

function sense() {
    var es = document.querySelectorAll("img,video");
    for (var e of es) {
        var i = sensed.indexOf(e);
        if (i >= 0) {
            if (e.tagName == "VIDEO" && !e.paused) {
                updateCensor(e, censors[i]);
            }
        }
        else {
            if (e.tagName == "VIDEO" || e.complete) {
                var c = createCensor(e);
                if (c) {
                    censors.push(c);
                    sensed.push(e);
                }
            }
        }
    }
    af = requestAnimationFrame(sense);
    /* af = requestAnimationFrame(z => setTimeout(sense, 60)); */
}

if (af) {
    cancelAnimationFrame(af);
    af = 0;
    for (var c of censors) {
        c.remove();
    }
    for (var e of sensed) {
        e.parentElement.classList.remove("censor-parent");
    }
    censorStyle.remove();
}
else {
    censorStyle = document.createElement("style");
    censorStyle.textContent = `.censor {
    opacity: 1 !important;
    image-rendering: pixelated !important;
}
.censor + img {
    display: none !important;
}
.censor + video {
    visibility: hidden !important;
}
.censor-parent:hover .censor {
    display: none !important;
}
.censor-parent:hover .censor + img {
    display: unset !important;
}
.censor-parent:hover .censor + video {
    visibility: visible !important;
}`;
    document.body.appendChild(censorStyle);
    sensed = [];
    censors = [];
    sense();
}
