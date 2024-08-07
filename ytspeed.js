function initDash() {
    var dash = document.createElement("div");
    dash.style.position = "fixed";
    dash.style.right = "0";
    dash.style.bottom = "0";
    dash.style.zIndex = "4999";

    var x = document.createElement("div");
    x.textContent = "❌";
    x.addEventListener("click", function () {
        dash.remove();
    });
    dash.appendChild(x);

    var range = document.createElement("input");
    range.type = "range";
    range.min = 0;
    range.max = 1;
    range.step = 0.1;
    range.value = 0.7;
    range.addEventListener("input", function () {
        var video = document.getElementsByTagName("video")[0];
        video.style.filter = "brightness(" + this.value + ")";
    });
    dash.appendChild(range);

    var speed = document.createElement("div");
    for (var i of [1, 2, 3, 5, 10]) {
        var button = document.createElement("button");
        button.value = i;
        button.textContent = "x" + i;
        speed.appendChild(button);
    }
    speed.addEventListener("click", function (e) {
        var video = document.getElementsByTagName("video")[0];
        video.playbackRate = parseInt(e.target.value);
    });
    dash.appendChild(speed);

    document.body.appendChild(dash);
}
initDash();