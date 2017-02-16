// Generated by CoffeeScript 1.12.3
(function() {
  var Arc, CONST, Generic, extend;

  CONST = require('../../const');

  extend = require('../../extend');

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
    this.fill = false;
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

  extend(Arc, Generic);


  /*
  Creates a clone od this Arc
  
  @return {DEVGAME.entity.Arc}
   */

  Arc.prototype.clone = function() {
    return new Arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
  };

  Arc.prototype.draw = function() {
    var context;
    if (this.fill) {
      context = this.context || this.parent.context;
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
      context.closePath();
      return context.fill();
    } else {
      context = this.context || this.parent.context;
      context.strokeStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
      context.closePath();
      return context.stroke();
    }
  };

  module.exports = Arc;

}).call(this);
