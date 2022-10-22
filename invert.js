if (typeof(inverthtml) == "undefined") {
	var inverthtml = document.body.appendChild(document.createElement("style"));
	inverthtml.innerHTML = "html{background:black;filter:invert(100%)}";
	void(0);
}
else {
	inverthtml.remove();
	inverthtml = undefined;
}
