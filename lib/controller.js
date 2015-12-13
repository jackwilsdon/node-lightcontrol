var events = require("events"),
    serialPort = require("serialport"),
    Packet = require("./packet.js"),
    EventEmitter = events.EventEmitter,
    SerialPort = serialPort.SerialPort;

function Controller(path) {
    EventEmitter.call(this);

    this.serialPort = new SerialPort(path, {
        baudRate: 9600
    });

    this.serialPort.on("open", (function() {
        this.emit("open");
    }).bind(this));
}

Controller.prototype = Object.create(EventEmitter.prototype);

Controller.prototype.sendPacket = function(packet) {
    this.serialPort.write(packet.toBuffer());
};

Controller.prototype.set = function(group, plug, status) {
    var packet = new Packet(group, plug, status);

    this.sendPacket(packet);
};

Controller.prototype.turnOn = function(group, plug) {
    this.set(group, plug, 1);
};

Controller.prototype.turnOff = function(group, plug) {
    this.set(group, plug, 0);
};

Controller.prototype.close = function() {
    this.serialPort.close();
}

module.exports = Controller;
