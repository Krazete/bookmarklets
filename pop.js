var video = document.getElementsByTagName("video")[0];
var pop;
function popout() {
	video.requestPictureInPicture();
}
function popin() {
	document.exitPictureInPicture();
}
video.addEventListener("enterpictureinpicture", e => pop = popin);
video.addEventListener("leavepictureinpicture", e => pop = popout);

pop ? void(0) : pop = popout;
pop();
