if (!document.getElementById("pipstyle")) {
    var pipstyle = document.createElement("style");
    pipstyle.id = "pipstyle";
    pipstyle.innerHTML = "img {cursor: crosshair; animation: pippable 500ms alternate infinite;} @keyframes pippable {0% {opacity: .5;} 100% {opacity: 1;}}";
    document.body.appendChild(pipstyle);

    function selectImagePIP(e) {
        e.preventDefault();
        pipstyle.remove();
        document.body.removeEventListener("click", selectImagePIP);

        var img = new Image();
        img.crossOrigin = "anonymous";
        img.addEventListener("load", requestImagePIP);
        img.src = e.target.src;
    }

    function requestImagePIP() {
        var canvas = document.createElement("canvas");
        canvas.width = this.naturalWidth || this.width;
        canvas.height = this.naturalHeight || this.height;
        var context = canvas.getContext("2d");
        context.drawImage(this, 0, 0, canvas.width, canvas.height);

        var vid = document.createElement("video");
        vid.srcObject = canvas.captureStream();
        vid.autoplay = true;
        vid.addEventListener("canplay", requestPIP);
    }

    function requestPIP() {
        this.requestPictureInPicture();
    }

    document.body.addEventListener("click", selectImagePIP);
}
