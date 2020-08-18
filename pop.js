javascript:
if (!video) {
	var video = document.getElementsByTagName("video")[0];
	function popout() {
		video.disablePictureInPicture = false;
		video.requestPictureInPicture();
	}
	function popin() {
		video.disablePictureInPicture = true;
	}
	video.addEventListener("enterpictureinpicture", e => pop = popin);
	video.addEventListener("leavepictureinpicture", e => pop = popout);
	popout();
}
pop();
