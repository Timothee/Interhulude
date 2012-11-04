(function() {
	var player;
	var lastStateSeen;
	var mask = document.createElement('div');

	function setMask() {
		mask.style.position = "absolute";
		mask.style.width = player.offsetWidth + "px";
		mask.style.height = player.offsetHeight + "px";
		mask.style.top = player.offsetTop + "px";
		mask.style.left = player.offsetLeft + "px";
		mask.style.backgroundColor = "black";
		mask.style.zIndex = 10000;
		mask.innerHTML = "&nbsp;";
	}

	window.setInterval(function() {
		if (!player) {
			player = document.getElementById('player');
		} else {
			setMask();
			if (player.getCurrentState().subState != lastStateSeen) {
				if (player.getCurrentState().subState == "content") {
					if (player.getVolume() == 0) {
						player.unMute();
						player.parentElement.removeChild(mask);
					}
				} else if (player.getVolume()) {
					player.mute();
					player.parentElement.appendChild(mask);
				}
				lastStateSeen = player.getCurrentState().subState;
			}
		}
	}, 1000);
})()
