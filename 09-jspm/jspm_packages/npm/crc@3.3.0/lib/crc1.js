/* */ 
(function(Buffer) {
  var Buffer,
      create;
  Buffer = require('buffer').Buffer;
  create = require('./create');
  module.exports = create('crc1', function(buf, previous) {
    var accum,
        byte,
        crc,
        i,
        len;
    if (!Buffer.isBuffer(buf)) {
      buf = Buffer(buf);
    }
    crc = ~~previous;
    accum = 0;
    for (i = 0, len = buf.length; i < len; i++) {
      byte = buf[i];
      accum += byte;
    }
    crc += accum % 256;
    return crc % 256;
  });
})(require('buffer').Buffer);
