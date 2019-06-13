function empath() {
	setTimeout(empath, 1000);
	Array.from(document.getElementsByTagName("ytd-thumbnail"))
	.forEach(function(e) {
		var oldLink = e.getAttribute("value");
		var newLink = e.children[0].href;
		if (oldLink != newLink) {
			e.setAttribute("value", newLink);
			e.style.borderBottom = "";
			e.style.borderImage = "";
			e.style.borderImageSlice = "";
			e.style.paddingBottom = "";
			e.style.marginTop = "";

			var xhr = new XMLHttpRequest();
			xhr.open("GET", newLink, true);
			xhr.onload = function() {
				var biasNone = this.responseText.match(/"percentIfIndifferent":(\d+)/);
				var biasLike = this.responseText.match(/"percentIfLiked":(\d+)/);
				var biasDislike = this.responseText.match(/"percentIfDisliked":(\d+)/);
				var linRating = parseInt(biasNone[1]);
				if (parseInt(biasLike[1]) == 100 && parseInt(biasDislike[1]) == 0) {
					linRating = 0;
				}
				var logRating = parseInt(Math.pow(linRating / 100, Math.E) * 256);
				var likes = "rgb(" + (256 - logRating) + ", " + parseInt(logRating / 2) + ", " + logRating + ")" + linRating + "%";
				var dislikes = "#88888866 " + linRating + "%";
				e.style.borderBottom = "3px solid";
				e.style.borderImage = "linear-gradient(to right, " + likes + ", " + dislikes + ")";
				e.style.borderImageSlice = "1";
				e.style.paddingBottom = "2px";
				e.style.marginTop = "-1px";
		    };
			xhr.send();
		}
	});
}
empath();
