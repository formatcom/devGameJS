// Generated by CoffeeScript 1.12.3
(function() {
  module.exports = function() {
    var ClassChild, ClassPather, _temp, args, i, source;
    args = [].slice.call(arguments);
    ClassChild = args.shift();
    _temp = {};
    for (i = args.length - 1; i >= 0; i += -1) {
      ClassPather = args[i];
      source = ClassPather.prototype;
      Object.keys(source).map(function(method) {
        if (!_temp[method] && typeof source[method] === 'function') {
          return _temp[method] = source[method];
        }
      });
    }
    return Object.keys(_temp).map(function(method) {
      if (!ClassChild.prototype[method]) {
        return ClassChild.prototype[method] = _temp[method];
      }
    });
  };

}).call(this);
