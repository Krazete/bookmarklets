function engage() {
	setTimeout(engage, 1000);
	Array.from(document.getElementsByTagName("ytd-thumbnail")).forEach(function(e) {
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
				try {
					var likes = this.responseText.match(/"(\d+(?:,\d{3})*?) likes?"/);
					var views = this.responseText.match(/"(\d+(?:,\d{3})*?) views?"/);
					var likecount = parseInt(likes[1].replace(/,/g, ""));
					var viewcount = parseInt(views[1].replace(/,/g, ""));
					var linRating = viewcount ? 100 * Math.log(likecount) / Math.log(viewcount) : 0;
					e.style.borderBottom = "3px solid";
					e.style.borderImage = "linear-gradient(to right, #008000 " + linRating + "%, #404040" + linRating + "%)";
					e.style.borderImageSlice = "1";
					e.style.paddingBottom = "2px";
					e.style.marginTop = "-1px";
				}
				catch (e) {}
		    };
			xhr.send();
		}
	});
}
engage();
