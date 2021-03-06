// Generated by CoffeeScript 1.12.3
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
    this._frame = 0;
    this._play = 0;
    this._timer = null;
    this.is_animation = false;
    if (options.fps) {
      this.is_animation = true;
    }
    if (options.fps) {
      this._play = 1;
    }
    if (this.is_animation) {
      self = this;
      this._timer = new Timer({
        fps: this.fps
      });
      this._timer.logic = function() {
        if (self._play === 1) {
          self._frame = ++self._frame % self.animations[self.animation].length;
        }
        return self._update.apply(self);
      };
    }
    return this;
  };

  Sprite.prototype._update = function() {
    var frame;
    frame = this.animations[this.animation][this._frame];
    this.sx = frame.sx;
    return this.sy = frame.sy;
  };

  Sprite.prototype._setFrame = function() {
    if (this.is_animation) {
      return this._timer.reset();
    } else {
      return this._update();
    }
  };

  Sprite.prototype.use = function(animation) {
    if (this.animation !== animation) {
      this.animation = animation;
      return this._setFrame();
    }
  };

  Sprite.prototype.frame = function(n) {
    if (this.animations[this.animation][n]) {
      this._frame = n;
    }
    return this._setFrame();
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
    if (this.is_animation) {
      return this._timer.exec();
    }
  };

  module.exports = Sprite;

}).call(this);
