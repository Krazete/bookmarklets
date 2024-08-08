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
				var ytid = JSON.parse(this.responseText.match(/var ytInitialData = ({.+?});/)[1]);
				if (!ytid.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.isLive) {
					try {
						var likes = parseInt(ytid.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonViewModel.likeCountEntity.likeCountIfDislikedNumber.replace(/\D/g, ""));
						var views = parseInt(ytid.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.viewCount.simpleText.replace(/\D/g, ""));
						var rating = views ? 100 * Math.log(likes + 1) / Math.log(views + 1) : 0;
						e.style.borderBottom = "3px solid";
						e.style.borderImage = "linear-gradient(to right, #008000 " + rating + "%, #404040" + rating + "%)";
						e.style.borderImageSlice = "1";
						e.style.paddingBottom = "2px";
						e.style.marginTop = "-1px";
					}
					catch (e) {
						console.log(ytid.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.title.runs[0].text);
					}
				}
		    };
			xhr.send();
		}
	});
}
engage();
