chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action == "notification") {
			var notification = webkitNotifications.createNotification(
				chrome.extension.getURL("images/logo-48x48.png"),
				"Your show has returned" ,
				request.showName + " has returned from commercial break."
			);
			notification.show();
		}
});
		
