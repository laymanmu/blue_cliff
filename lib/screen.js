
if (typeof require !== 'undefined') {
  var Entity   = require('./entity.js').Entity;
  var Keyboard = require('./keyboard.js').Keyboard;
}

var Screen = function(options) {
  this.readyToExit = false;
  this.enter = function(){
  };
  this.exit = function() {
  };
  this.draw = function(htmlContainer) {
    htmlContainer.innerHTML = "a screen";
  };
  this.handleInput = function(key) {
    if (key == Keyboard.KEY_Escape) {
      this.readyToExit = true;
    }
  };
  Entity.call(this, options);
};

if (typeof module !== 'undefined') {
  module.exports.Screen = Screen;
}

