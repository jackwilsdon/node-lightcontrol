function Packet(group, plug, status) {
    this.group = group;
    this.plug = plug;
    this.status = status;
}

Packet.prototype.toBuffer = function() {
    var binaryValue = (this.status << 7);
    binaryValue |= ((this.group - 1) & 3) << 2;
    binaryValue |= (this.plug - 1) & 3;

    return new Buffer([ binaryValue ]);
};

Packet.fromBuffer = function(buffer) {
    if (buffer.length != 1) {
        return null;
    }

    var binaryValue = buffer[0];

    var status = binaryValue >> 7,
        group = ((binaryValue >> 2) & 0x3) + 1;
        plug = (binaryValue & 0x3) + 1;

    return new Packet(group, plug, status);
};

module.exports = Packet;
