javascript:
var video = document.getElementsByTagName("video")[0];
var pop;
function popout() {
	video.disablePictureInPicture = false;
	video.requestPictureInPicture();
}
function popin() {
	video.disablePictureInPicture = true;
}
video.addEventListener("enterpictureinpicture", e => pop = popin);
video.addEventListener("leavepictureinpicture", e => pop = popout);

pop ? void() : pop = popout;
pop();
