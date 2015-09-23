

var Entity = function(options) {
  if (!Entity._nextID) Entity._nextID = 1;
  this.id = Entity._nextID++;

  this.mixinUpdates = [];

  this.update = function() {
    for (var i=0; i<this.mixinUpdates.length; i++) {
      this.mixinUpdates[i].call(this);
    }
  };

  for (var key in options) {
    if (key == "mixins") {
      var mixins = options[key];
      for (var i=0; i<mixins.length; i++) {
        mixins[i].call(this);
      }
    } else if (key == "update") {
      var updateFunction = options[key];
      this.mixinUpdates.push(updateFunction);
    } else {
      this[key] = options[key];
    }
  }
};

if (typeof module !== 'undefined') {
  module.exports.Entity = Entity;
}

