chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action == "notification") {
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
		
