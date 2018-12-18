const NodeHelper = require('node_helper');
const gpio = require('onoff');
var path = require('path');
var fs = require('fs');
const { Howl, Howler } = require('howler');

module.exports = NodeHelper.create({
    start: function () {
        this.started = false
    },
    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function (notification, payload) {
        const self = this;
        if (notification === 'BUTTON_CONFIG' && this.started == false) {
            const self = this
            this.config = payload
            fromDir(this.config.musicPath, "mp3");
            createSound();
            var GPIO = require('onoff').Gpio,
                button1 = new GPIO(this.config.playButtonPIN, 'in', 'both', { persistentWatch: true, debounceTimeout: this.config.clickDelay });
            button1.watch(function (err, state) {
                // 1 == pressed, 0 == not pressed
                if (state == 1) {

                    if (sound.playing()) {
                        this.sound.pause();
                    } else {
                        this.sound.play();
                    }
                }
            });
            button2 = new GPIO(this.config.playButtonPIN, 'in', 'both', { persistentWatch: true, debounceTimeout: this.config.clickDelay });
            button2.watch(function (err, state) {
                // 1 == pressed, 0 == not pressed
                if (state == 1) {
                    playNext();
                }
            }),
                this.started = true;
        };
    },
}
);

function playNext() {
    if (this.sound.playing()) {
        this.sound.stop();
    }
    this.index += 1;
    if (this.index == this.musicList.length()) {
        this.index = 0;
    }
    this.sound.play(index);
}

function fromDir(startPath, filter) {
    if (!fs.existsSync(startPath)) {
        Log.info("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var fullPath = path.join(startPath, files[i]);
        var filename = files[i];
        var stat = fs.lstatSync(fullPath);
        if (stat.isFile()) {
            if (filename.indexOf(filter) >= 0) {
                this.musicList.push(fullPath);
            };
        };
    };
}

function createSound() {
    this.sound = new Howl({
        src: this.musicList
    });
}