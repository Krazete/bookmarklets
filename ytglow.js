var fograf;
(function() {
    var canvas = document.getElementById("videofog");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "videofog";
        canvas.style.position = "absolute";
        canvas.style.left = "50%";
        canvas.style.transform = "translate(-50%)";
        canvas.style.filter = "blur(100px) contrast(1.5)";
        canvas.style.mixBlendMode = "lighten";
        var context = canvas.getContext("2d");
        function updatefog() {
            var video = document.querySelector("ytd-watch-flexy video") || document.querySelector("video");
            var rect = video.getBoundingClientRect();
            canvas.width = 64;
            canvas.height = 64 * rect.height / rect.width;
            canvas.style.width = rect.width + "px";
            canvas.style.height = rect.height + "px";
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            fograf = requestAnimationFrame(updatefog);
        }
        function waitForContainer() {
            try {
                var container = document.querySelector("ytd-watch-flexy ytd-player #container");
                container.insertBefore(canvas, container.firstChild);
                updatefog();
            } catch (e) {
                requestAnimationFrame(waitForContainer);
            }
        }
        waitForContainer();
    }
    else {
        canvas.remove();
        cancelAnimationFrame(fograf);
    }
})();
