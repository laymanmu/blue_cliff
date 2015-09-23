
var Entity = require('../lib/entity.js').Entity;

module.exports = {

  setUp: function (callback) {
    this.tom = new Entity({name:'tom'});
    this.gus = new Entity({name:'gus',colors:['red','blue','green']});
    callback();
  },

  tearDown: function (callback) {
    callback();
  },

  testId: function(test) {
    test.equals(this.tom.id, 1);
    test.equals(this.gus.id, 2);
    test.done();
  },

  testOptions: function(test) {
    test.equals(this.tom.name, 'tom');
    test.equals(this.gus.name, 'gus');
    test.equals(3, this.gus.colors.length);
    test.equals(undefined, this.tom.colors);
    test.done();
  }
  
};

