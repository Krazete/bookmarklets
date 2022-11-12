javascript:
var fograf;
function togglefog() {
    var canvas = document.getElementById("videofog");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "videofog";
        canvas.style.position = "absolute";
        canvas.style.left = "50%";
        canvas.style.transform = "translate(-50%)";
        canvas.style.filter = "blur(100px)";
        canvas.style.mixBlendMode = "lighten";
        var container = document.querySelector("ytd-watch-flexy ytd-player #container");
        container.insertBefore(canvas, container.firstChild);
        var context = canvas.getContext("2d");
        function updatefog() {
            var video = document.querySelector("ytd-watch-flexy video") || document.querySelector("video");
            var rect = video.getBoundingClientRect();
            canvas.width = rect.width / 8;
            canvas.height = rect.height / 8;
            canvas.style.width = rect.width + "px";
            canvas.style.height = rect.height + "px";
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            fograf = requestAnimationFrame(updatefog);
        }
        updatefog(canvas);
    }
    else {
        canvas.remove();
        cancelAnimationFrame(fograf);
    }
}
togglefog();
