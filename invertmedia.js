if (typeof(invertimg) == "undefined") {
	var invertimg = document.body.appendChild(document.createElement("style"));
	invertimg.innerHTML = "img,video,embed,object{filter:invert(100%)}";
	void(0);
}
else {
	invertimg.remove();
	invertimg = undefined;
}
