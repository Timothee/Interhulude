(function() {
	var player;
	var lastStateSeen;
	var mask = document.createElement('div');

	function log(message) {
		console.log("[Interhulude] " + message);
	}

	function maskVideo() {
		setMask();
		log("Masking video");
		player.mute();
		player.parentElement.appendChild(mask);
	}

	function unmaskVideo() {
		log("Unmasking video");
		player.unMute();
		player.parentElement.removeChild(mask);
	}

	function setMask() {
		mask.id = "InterhuludeMask";
		mask.style.position = "absolute";
		mask.style.width = player.offsetWidth + "px";
		mask.style.height = player.offsetHeight + "px";
		mask.style.top = player.offsetTop + "px";
		mask.style.left = player.offsetLeft + "px";
		mask.style.backgroundColor = "black";
		mask.style.color = "white";
		mask.style.zIndex = 10000;
		var showName = document.getElementsByClassName('show-title')[0] ? document.getElementsByClassName('show-title')[0].innerHTML : "Your show";
		mask.innerHTML = "<h1>" + showName + " will return in a moment.</h1>" + "<p>(click to dismiss)</p>";
		mask.onclick = unmaskVideo;
	}

	window.setInterval(function() {
		if (!player) {
			player = document.getElementById('player');
		} else {
			if (player.getCurrentState && player.getCurrentState().subState != lastStateSeen) {
				if (player.getCurrentState().subState == "content") {
					if (player.getVolume() == 0) {
						unmaskVideo();
					}
				} else if (player.getVolume && player.getVolume()) {
					maskVideo();
				}
				lastStateSeen = player.getCurrentState().subState;
			}
		}
	}, 1000);
})()
