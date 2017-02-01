// Generated by CoffeeScript 1.10.0
(function() {
  var Sprite, Timer;

  Timer = require('./Timer');

  Sprite = function(options) {
    var self;
    this.source = options.source;
    this.spritesheet = new Image();
    this.spritesheet.src = this.source;
    this.animations = options.animations;
    this.width = 0;
    this.height = 0;
    this.sx = options.sx || 0;
    this.sy = options.sy || 0;
    this.swidth = options.swidth;
    this.sheight = options.sheight;
    this.fps = options.fps || 0;
    this.animation = options.animation;
    this._timer = new Timer({
      fps: this.fps
    });
    this._frame = 0;
    this._play = 1;
    self = this;
    this._timer.logic = function() {
      var frame;
      if (self._play === 1) {
        self._frame = ++self._frame % self.animations[self.animation].length;
      }
      frame = self.animations[self.animation][self._frame];
      self.sx = frame.sx;
      return self.sy = frame.sy;
    };
    return this;
  };

  Sprite.prototype.use = function(animation) {
    if (this.animation !== animation) {
      this.animation = animation;
      return this._timer.reset();
    }
  };

  Sprite.prototype.frame = function(n) {
    if (this.animations[this.animation][n]) {
      this._frame = n;
    }
    return this._timer.reset();
  };

  Sprite.prototype.play = function() {
    return this._play = 1;
  };

  Sprite.prototype.stop = function() {
    this._frame = 0;
    return this._play = 0;
  };

  Sprite.prototype.pause = function() {
    return this._play = 2;
  };

  Sprite.prototype.next = function() {
    if ((this._frame + 1) < this.animations[this.animation].length) {
      return this._frame = ++this._frame;
    }
  };

  Sprite.prototype.preview = function() {
    if (this._frame > 0) {
      return this._frame = --this._frame;
    }
  };

  Sprite.prototype.load = function(callback) {
    var self;
    self = this;
    this.spritesheet.onload = function() {
      self.width = this.width;
      self.height = this.height;
      return callback.call(self, null);
    };
    return this.spritesheet.onerror = function(event) {
      return callback.call(self, event);
    };
  };

  Sprite.prototype.get = function() {
    return this.spritesheet;
  };

  Sprite.prototype.exec = function() {
    return this._timer.exec();
  };

  module.exports = Sprite;

}).call(this);
