(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DEVGAME = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CONST, Container, Generic;

CONST = require('./const');

Generic = require('./entity/Generic');


/*
@class
@memberof DEVGAME
 */

Container = function(x, y) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  Generic.call(this, x, y);
  this.children = [];
  return this;
};

Container.prototype = Object.create(Generic.prototype);

Container.prototype.exec = function() {
  var child, i, len, ref;
  this.logic();
  this._save();
  ref = this.children;
  for (i = 0, len = ref.length; i < len; i++) {
    child = ref[i];
    if (this.context && child.context === null) {
      child.context = this.context;
    }
    child.exec();
  }
  return this._restore();
};

Container.prototype.addChild = function() {
  var child, i, len, results;
  results = [];
  for (i = 0, len = arguments.length; i < len; i++) {
    child = arguments[i];
    if (this.context && child.context === null) {
      child.context = this.context;
    }
    child.parent = this;
    results.push(this.children.push(child));
  }
  return results;
};

module.exports = Container;


},{"./const":2,"./entity/Generic":3}],2:[function(require,module,exports){

/*
Constant values used in DevGame
@lends DEVGAME
 */
var CONST;

CONST = {

  /*
  String of the current DevGame version
  
  @property {string} VERSION
  @static
  @contant
   */
  VERSION: '__VERSION__',
  requestAnimationFrame: require('./requestAnimationFrame'),
  PI: Math.PI,

  /*
  @property {number} PI_2 - two Pi
  @static
  @contant
   */
  PI_2: Math.PI * 2,

  /*
  @property {number} RAD_TO_DEG - Constant conversion factor for converting radians to degres
  @static
  @contant
   */
  RAD_TO_DEG: 180 / Math.PI,

  /*
  @property {number} DEG_TO_RAD
  @static
  @contant
   */
  DEG_TO_RAD: Math.PI / 180,

  /*
  Constants thet identify shapes
  
  @static
  @contant
  @property {object} SHAPES
  @property {object} SHAPES.RECT = 0
  @property {object} SHAPES.ARC  = 1
   */
  SHAPES: {
    RECT: 0,
    ARC: 1,
    CIRCLE: 2
  }
};

module.exports = CONST;


},{"./requestAnimationFrame":10}],3:[function(require,module,exports){
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


},{"../const":2,"./Point":4}],4:[function(require,module,exports){

/*
The Point object represents a location in a two-dimensional coordinate system,
where x represents the horizontal axis and y represents the vertical axis

@class
@memberof DEVGAME.entity
@param x {number} position of the point on the x axis
@param y {number} position of the point on the y axis
 */
var Point;

Point = function(x, y) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }

  /*
  @member {number}
  @default 0
   */
  this.x = x;

  /*
  @member {number}
  @default 0
   */
  this.y = y;
  return this;
};


/*
Creates a clone od this Rectangle

@return {DEVGAME.entity.Rect}
 */

Point.prototype.clone = function() {
  return new Point(this.x, this.y);
};


/*
Sets the point to a new x and y position

@param x {number} position of the point on the x axis
@param y {number} position of the point on the y axis
 */

Point.prototype.set = function(x, y) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }

  /*
  @member {number}
  @default 0
   */
  this.x = x;

  /*
  @member {number}
  @default 0
   */
  return this.y = y;
};


/*
Copies x and y from the given point

@param point {DEVGAME.entity.Point}
 */

Point.prototype.copy = function(point) {
  return this.set(point.x, point.y);
};


/*
Returns true if the given point is equal to this point

@param point {DEVGAME.entity.Point}
@return {boolean}
 */

Point.prototype.equals = function(point) {
  return (point.x === this.x) && (point.y === this.y);
};

module.exports = Point;


},{}],5:[function(require,module,exports){
var entity;

entity = {
  Point: require('./Point'),
  Rect: require('./shapes/Rect'),
  Arc: require('./shapes/Arc'),
  Circle: require('./shapes/Circle')
};

module.exports = entity;


},{"./Point":4,"./shapes/Arc":6,"./shapes/Circle":7,"./shapes/Rect":8}],6:[function(require,module,exports){
var Arc, CONST, Generic;

CONST = require('../../const');

Generic = require('../Generic');


/*
@class
@memberof DEVGAME.entity
 */

Arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (radius == null) {
    radius = 0;
  }
  if (startAngle == null) {
    startAngle = 0;
  }
  if (endAngle == null) {
    endAngle = 0;
  }
  if (anticlockwise == null) {
    anticlockwise = false;
  }
  Generic.call(this, x, y);
  this.radius = radius;
  this.startAngle = startAngle;
  this.endAngle = endAngle;
  this.anticlockwise = anticlockwise;

  /*
  The  type of the object
  
  @member {number}
   */
  this.type = CONST.SHAPES.ARC;
  return this;
};

Arc.prototype = Object.create(Generic.prototype);


/*
Creates a clone od this Arc

@return {DEVGAME.entity.Arc}
 */

Arc.prototype.clone = function() {
  return new Arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
};

Arc.prototype.draw = function() {
  var context;
  context = this.context || this.parent.context;
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
  context.closePath();
  return context.fill();
};

module.exports = Arc;


},{"../../const":2,"../Generic":3}],7:[function(require,module,exports){
var Arc, CONST, Circle;

CONST = require('../../const');

Arc = require('./Arc');


/*
@class
@memberof DEVGAME.entity
 */

Circle = function(x, y, radius) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (radius == null) {
    radius = 0;
  }
  Arc.call(this, x, y, radius, 0, CONST.PI_2);

  /*
  The  type of the object
  
  @member {number}
   */
  this.type = CONST.SHAPES.CIRCLE;
  return this;
};

Circle.prototype = Object.create(Arc.prototype);


/*
Creates a clone od this Arc

@return {DEVGAME.entity.Arc}
 */

Circle.prototype.clone = function() {
  return new Circle(this.x, this.y, this.radius);
};

module.exports = Circle;


},{"../../const":2,"./Arc":6}],8:[function(require,module,exports){
var CONST, Generic, Rect;

CONST = require('../../const');

Generic = require('../Generic');


/*
@class
@memberof DEVGAME.entity
@param x {number} The X coordinate of the upper-left corner of the rectangle
@param y {number} The Y coordinate of the upper-left corner of the rectangle
@param width {number} The overall width of the rectangle
@param height {number} The overall height of this rectangle
 */

Rect = function(x, y, width, height) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (width == null) {
    width = 0;
  }
  if (height == null) {
    height = 0;
  }
  Generic.call(this, x, y);

  /*
  @member {number}
  @default 0
   */
  this.width = width;

  /*
  @member {number}
  @default 0
   */
  this.height = height;

  /*
  The  type of the object
  
  @member {number}
   */
  this.type = CONST.SHAPES.RECT;
  return this;
};

Rect.prototype = Object.create(Generic.prototype);


/*
Creates a clone od this Rectangle

@return {DEVGAME.entity.Rect}
 */

Rect.prototype.clone = function() {
  return new Rect(this.x, this.y, this.width, this.height);
};

Rect.prototype.draw = function() {
  var context;
  context = this.context || this.parent.context;
  context.fillStyle = this.color;
  return context.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Rect;


},{"../../const":2,"../Generic":3}],9:[function(require,module,exports){
var DEVGAME;

DEVGAME = require('./const');

DEVGAME.Container = require('./Container');

DEVGAME.entity = require('./entity');

DEVGAME["super"] = require('./super');

module.exports = DEVGAME;


},{"./Container":1,"./const":2,"./entity":5,"./super":11}],10:[function(require,module,exports){
module.exports = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    return window.setTimeout(function() {
      return callback(+(new Date));
    }, 1000 / 60);
  };
};


},{}],11:[function(require,module,exports){
module.exports = function(self, method, args) {
  if (args == null) {
    args = [];
  }
  return self.prototype[method].apply(self, args);
};


},{}]},{},[9])(9)
});