chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action == "notification") {
			chrome.tabs.query({lastFocusedWindow: true, active: true}, function(tabs) {
				// display the notification is no tab is active, or if the active tab is not Hulu
				// or if the video pauses after the commercials
				if (tabs.length == 0 || tabs[0].id != sender.tab.id || request.pauseOnReturn) {
					var notification = webkitNotifications.createNotification(
						chrome.extension.getURL("images/logo-48x48.png"),
						request.showName,
						"Your show has returned. Click to watch."
					);
					notification.onclick = function() {
						notification.close();
						chrome.tabs.update(sender.tab.id, {active: true});
						chrome.windows.update(sender.tab.windowId, {focused: true});
						chrome.tabs.sendMessage(sender.tab.id, {action: "resumeVideo"}, null);
					};
					notification.show();
				}
			});
		}
});
