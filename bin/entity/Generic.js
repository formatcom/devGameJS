// Generated by CoffeeScript 1.10.0
(function() {
  var CONST, Generic, Point;

  CONST = require('../const');

  Point = require('./Point');

  Generic = function(x, y) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    Point.call(this, x, y);
    this._x = x;
    this._y = y;
    this.direction = 1;
    this.hSpeed = 0;
    this.vSpeed = 0;
    this.speed = 0;
    this.xPrevious = x;
    this.yPrevious = y;
    this.xStart = x;
    this.yStart = y;
    this.parent = null;
    this.context = null;
    this._buffer = {};
    this.color = '#000';
    this.visible = true;
    return this;
  };

  Generic.prototype = Object.create(Point.prototype);

  Generic.prototype.setContext = function(context) {
    context.imageSmoothingEnabled = false;
    this.context = context;
    this._buffer.canvas = document.createElement('canvas');
    this._buffer.context = this._buffer.canvas.getContext('2d');
    this._buffer.context.imageSmoothingEnabled = false;
    this._buffer.canvas.width = context.canvas.clientWidth;
    return this._buffer.canvas.height = context.canvas.clientHeight;
  };

  Generic.prototype.getX = function() {
    if (this.parent) {
      return this.parent.x + this.x;
    } else {
      return this.x;
    }
  };

  Generic.prototype.getY = function() {
    if (this.parent) {
      return this.parent.y + this.y;
    } else {
      return this.y;
    }
  };

  Generic.prototype._save = function() {
    this._x = this.xPrevious = this.x;
    this._y = this.yPrevious = this.y;
    this.x = this.getX();
    return this.y = this.getY();
  };

  Generic.prototype._restore = function() {
    this.x = this._x;
    return this.y = this._y;
  };

  Generic.prototype.logic = function() {};

  Generic.prototype.draw = function() {};

  Generic.prototype.exec = function() {
    this.logic();
    this._save();
    if ((this.parent && this.parent.visible) && this.visible) {
      this.draw();
    }
    return this._restore();
  };

  module.exports = Generic;

}).call(this);
