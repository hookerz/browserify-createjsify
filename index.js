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
        code = code.replace('lib = lib||{}, images = images||{}, createjs = createjs||{}', 'lib = lib||{}, this.images||{}, this.createjs||window.createjs||{}');
        code = code.replace('var lib, images, createjs;', 'var lib; module.exports = lib;');
        this.push(new Buffer(code))
        next();
    });
};
