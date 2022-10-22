if (typeof(inverthtml) == "undefined") {
	var inverthtml = document.createElement("style");
	inverthtml.innerHTML = "html{background:black;filter:invert(100%)}";
	document.body.appendChild(inverthtml);
}
else {
	inverthtml.remove();
	inverthtml = undefined;
}
