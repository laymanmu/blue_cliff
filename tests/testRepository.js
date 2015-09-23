var Entity     = require('../lib/entity.js').Entity;
var Mixins     = require('../lib/mixins.js').Mixins;
var Repository = require('../lib/repository.js').Repository;

module.exports = {

  setUp: function (callback) {
    this.entities = new Repository('entities', Entity);

    var humanMixins = [Mixins.Hunger, Mixins.Thirst, Mixins.Mortal];
    var ghostMixins = [Mixins.Hunger, Mixins.Thirst];

    var humanUpdate = function() {
    };

    var ghostUpdate = function() {
      this.health = 0;
      this.thirst = 1;
      this.hunger = 1;
    };

    var ghostTemplate = {name:'ghost', mixins:ghostMixins, update:ghostUpdate};
    var humanTemplate = {name:'human', mixins:humanMixins, update:humanUpdate};

    this.entities.define('ghost', ghostTemplate);
    this.entities.define('human', humanTemplate);

    callback();
  },

  tearDown: function(callback) {
    callback();
  },

  testDefine: function(test) {
    // starts with 2:
    test.equal(2, this.entities.templateNames.length);

    // define another with same name should still have 2:
    this.entities.define('ghost', {});
    test.equal(2, this.entities.templateNames.length);

    // define a third:
    this.entities.define('hamster', {});
    test.equal(3, this.entities.templateNames.length);
    
    test.done();
  },

  testTemplateNames: function(test) {
    test.equal(2, this.entities.templateNames.length);
    var found = {ghost:false, human:false};
    for (var i=0; i<2; i++) {
      var name = this.entities.templateNames[i];
      found.ghost = name=="ghost" ? true : found.ghost;
      found.human = name=="human" ? true : found.human;
    }
    test.ok(found.ghost);
    test.ok(found.human);
    test.done();
  },

  testCreate: function(test) {
    var human = this.entities.create('human');
    var ghost = this.entities.create('ghost');

    test.equal('human', human.name);
    test.equal(100, human.thirst);
    test.equal(100, human.hunger);
    test.ok(human.isAlive());

    test.equal('ghost', ghost.name);
    test.equal(100, ghost.thirst);
    test.equal(100, ghost.hunger);

    human.update();
    test.equal(99, human.thirst);
    test.equal(99, human.hunger);

    ghost.update();
    test.equal(0, ghost.health);
    test.equal(1, ghost.thirst);
    test.equal(1, ghost.hunger);

    test.done();
  }
};
