Module.register('MMM-Button_Test',{	
	defaults: {
		buttonPIN: 5,
		//time in miliseconds before another button click is recognized
		clickDelay: 500,		
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