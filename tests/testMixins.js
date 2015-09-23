
var Entity = require('../lib/entity.js').Entity;
var Mixins = require('../lib/mixins.js').Mixins;

module.exports = {

  setUp: function (callback) {
    var mixins = [Mixins.Hunger, Mixins.Thirst, Mixins.Mortal];
    this.tom = new Entity({name:'tom', mixins:mixins});
    this.gus = new Entity({name:'gus', mixins:mixins, colors:['red','blue','green']});
    callback();
  },

  tearDown: function (callback) {
    callback();
  },

  testMortal: function(test) {
    test.ok(this.tom.isAlive());
    test.throws(function() {
      this.gus.isAlive();
    });

    // damange & healing:
    this.tom.takeDamage(120);
    test.ok(!this.tom.isAlive());
    test.equal(0, this.tom.health);

    this.tom.heal(30);
    test.ok(this.tom.isAlive());
    test.equal(30, this.tom.health);

    this.tom.heal(20);
    test.equal(50, this.tom.health);

    this.tom.heal(200);
    test.equal(100, this.tom.health);

    // death:
    this.tom.die();
    test.equals(0, this.tom.health);
    test.ok(!this.tom.isAlive());
    test.done();
  },

  testHunger: function(test) {
    test.equal(100, this.gus.hunger);
    this.gus.update();
    test.equal(99, this.gus.hunger);
    test.equal('full', this.gus.descHunger());
    this.gus.hunger = 80;
    test.equal('fine', this.gus.descHunger());
    this.gus.hunger = 60;
    test.equal('hungry', this.gus.descHunger());
    this.gus.hunger = 40;
    test.equal('starving', this.gus.descHunger());
    this.gus.hunger = 20;
    test.equal('consumed', this.gus.descHunger());

    // should die if hunger reaches 0:
    test.ok(this.gus.isAlive());
    this.gus.hunger = 1;
    this.gus.update();
    test.ok(!this.gus.isAlive());

    test.done();
  },

  testThirst: function(test) {
    test.equal(100, this.tom.thirst, 'start with 100');
    this.tom.update();
    test.equal(99, this.tom.thirst, 'lose 1 thirst per update');
    test.equal(99, this.tom.hunger, 'lose 1 hunger per update');

    test.ok(this.tom.isAlive());
    this.tom.thirst = 1;
    this.tom.update();
    test.ok(!this.tom.isAlive());
    test.done();
  }

};
