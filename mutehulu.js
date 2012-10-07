(function() {
	var player;
	var lastStateSeen;

	window.setInterval(function() {
		if (!player) {
			player = document.getElementById('player');
		} else {
			if (player.getCurrentState().subState != lastStateSeen) {
				if (player.getCurrentState().subState == "content") {
					if (player.getVolume() == 0) {
						player.unMute();
					}
				} else if (player.getVolume()) {
					player.mute();
				}
				lastStateSeen = player.getCurrentState().subState;
			}
		}
	}, 1000);
})()
