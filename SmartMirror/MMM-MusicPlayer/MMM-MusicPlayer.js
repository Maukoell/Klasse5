Module.register('MMM-MusicPlayer',{	
	defaults: {
		playButtonPIN: 10,
        	nextButtonPIN: 12,
        	clickDelay: 500,
        	musicPath,		
	},	
	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'BUTTON_PRESSED'){
			Log.info('Button Test');
		}
	},	
	start: function() {
		this.sendSocketNotification('BUTTON_CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	}
});