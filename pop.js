var videos = Array.from(document.getElementsByTagName("video"));
var video = videos[0];
for (var v of videos) {
	if (!v.paused) {
		video = v;
		break;
	}
}
var pop;
function popout() {
	video.removeAttribute("disablePictureInPicture");
	video.requestPictureInPicture();
}
function popin() {
	document.exitPictureInPicture();
}
video.addEventListener("enterpictureinpicture", e => pop = popin);
video.addEventListener("leavepictureinpicture", e => pop = popout);

pop ? void(0) : pop = popout;
pop();
