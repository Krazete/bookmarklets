function empath() {
	setTimeout(empath, 1000);
	Array.from(document.getElementsByTagName("ytd-thumbnail"))
	.forEach(function(e) {
		var oldLink = e.getAttribute("value");
		var newLink = e.children[0].href;
		if (oldLink != newLink) {
			e.setAttribute("value", newLink);
			e.style.border = "";

			var xhr = new XMLHttpRequest();
			xhr.open("GET", newLink, true);
			xhr.onload = function() {
				var match = this.responseText.match(/"percentIfIndifferent":(\d+)/);
				var linRating = parseInt(match[1]);
				if (linRating == 0) {
					e.style.border = "1px solid gray";
				}
				else {
					var logRating = parseInt(Math.pow(linRating / 100, Math.E) * 256);
					e.style.border = "5px solid rgb(" + (256 - logRating) + ", " + logRating + ", 0)";
				}
		    };
			xhr.send();
		}
	});
}
empath();
