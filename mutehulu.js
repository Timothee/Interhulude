(function() {
	var player;

	window.setInterval(function() {
		if (!player) {
			player = document.getElementById('player');
		} else {
			if (player.getCurrentState().subState == "content") {
				if (player.getVolume() == 0) {
					player.unMute();
				}
			} else if (player.getVolume()) {
				player.mute();
			}
		}
	}, 1000);
})()
