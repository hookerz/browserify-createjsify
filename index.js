var through = require("through2");

module.exports = function (file, opts) {
    /*  provide stream  */
    var code = "";
    return through.obj(function (buf, enc, next) {
        /*  accumulate the code chunks  */
        code += buf.toString("utf8");
        next();
    }, function (next) {
        /*  transform the code  */
        var detected = (code.indexOf('lib, img, cjs') > -1);
        if(detected) {
          code = 'var createjs = window.createjs || {};' + "\n" + code;
          code += "\n" + 'module.exports = { lib: lib, images: images, createjs: createjs, ss: ss };';
        }
        this.push(new Buffer(code))
        next();
    });
};
