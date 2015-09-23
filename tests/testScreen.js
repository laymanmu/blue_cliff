
var Entity     = require('../lib/entity.js').Entity;
var Mixins     = require('../lib/mixins.js').Mixins;
var Repository = require('../lib/repository.js').Repository;
var Screen     = require('../lib/screen.js').Screen;

module.exports = {
  setUp: function(callback) {
    this.screen1 = new Screen({name:'screen1'});
    this.screen2 = new Screen({name:'screen2'});
    callback();
  },
  tearDown: function(callback) {
    callback();
  },

  testCreate: function(test) {
    test.equal('screen1', this.screen1.name);
    test.equal('screen2', this.screen2.name);
    test.ok(this.screen1.id > 0);
    test.ok(this.screen2.id > this.screen1.id);
    test.ok(this.screen1.enter);
    test.ok(this.screen1.exit);
    test.ok(this.screen1.draw);
    test.ok(this.screen1.handleInput);
    test.done();
  }

};
