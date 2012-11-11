(function() {
	var player, lastStateSeen;
	var pauseOnReturn = localStorage["NoHuluAds:pauseOnReturn"] || false;
	var mask = document.createElement('div');
	var showNameDiv, pauseOnReturnDiv, dismissDiv;
	var maskSetup = false;
	var masked = false;

	function log(message) {
		console.log("[NoHuluAds] " + message);
	}

	function maskVideo() {
		setMask();
		log("Masking video");
		if (player.getVolume && player.getVolume() != 0) {
			player.mute();
		}
		player.parentElement.appendChild(mask);
		masked = true;
	}

	function unmaskVideo() {
		log("Unmasking video");
		if (player.getVolume && player.getVolume() == 0) {
			player.unMute();
		}
		player.parentElement.removeChild(mask);
		masked = false;
	}

	function togglePause() {
		pauseOnReturn = localStorage["NoHuluAds:pauseOnReturn"] = !pauseOnReturn;
		pauseOnReturnDiv.className = pauseOnReturn ? "checked" : "unchecked";
	}

	function updateMask() {
		mask.style.width = player.offsetWidth + "px";
		mask.style.height = player.offsetHeight + "px";
		mask.style.top = player.offsetTop + "px";
		mask.style.left = player.offsetLeft + "px";

		var showName = document.getElementsByClassName('show-title')[0] ? document.getElementsByClassName('show-title')[0].innerHTML : "Your show";
		showNameDiv.innerHTML = "<span>" + showName + "</span> will return in a moment.";
	}

	function setMask() {
		if (!maskSetup) {
			mask.id = "NoHuluAdsMask";

			showNameDiv = document.createElement('div');
			showNameDiv.id = "NoHuluAdsShowName";
			showNameDiv.innerHTML = "<span>Your show</span> will return in a moment.";

			pauseOnReturnDiv = document.createElement('div');
			pauseOnReturnDiv.id = "NoHuluAdsPauseOnReturn";
			pauseOnReturnDiv.onclick = togglePause;
			pauseOnReturnDiv.innerHTML = "<span>&#x2713;</span> Pause when the show comes back";
			pauseOnReturnDiv.className = pauseOnReturn ? "checked" : "unchecked";

			dismissDiv = document.createElement('div');
			dismissDiv.id = "NoHuluAdsClickToDismiss";
			dismissDiv.innerHTML = "(click here to dismiss)";
			dismissDiv.onclick = unmaskVideo;

			mask.appendChild(showNameDiv);
			mask.appendChild(pauseOnReturnDiv);
			mask.appendChild(dismissDiv);

			maskSetup = true;
		}
	}

	window.setInterval(function() {
		if (!player || !player.getCurrentState) {
			player = document.getElementById('player');
		} else {
			if (!maskSetup) {
				setMask();
			}
			updateMask();
			var currentState = player.getCurrentState().subState;
			if (currentState != lastStateSeen && currentState != "loading") {
				lastStateSeen = currentState;
				if (currentState == "content") {
					if (masked) {
						unmaskVideo();
					}
					if (pauseOnReturn) {
						player.pauseVideo();
					}
				} else {
					if (!masked) {
						maskVideo();
					}
				}
			}
		}
	}, 1000);
})()
