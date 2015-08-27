var _new            = require('./_new');
var _delete         = require('./_delete');
var _physics        = require('../physics');
var _setAnimations  = require('./_setAnimations');
var _preUpdate      = require('./_preUpdate');
var _postUpdate     = require('./_postUpdate');
var _on             = require('./_on');
var _emit           = require('./_emit');

module.exports = {
   new:            _new,
   delete:         _delete,
   applyCollision: _physics.applyCollision,
   applyGravity:   _physics.applyGravity,
   setAnimations:  _setAnimations,
   preUpdate:      _preUpdate,
   postUpdate:     _postUpdate,
   on:             _on,
   emit:           _emit,
};