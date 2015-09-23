
var Mixins = {};

if (typeof module !== 'undefined') {
  module.exports.Mixins = Mixins;
}

/*****************
// Mortal:
*****************/

Mixins.Mortal = function() {
  this.health = 100;
  this.mixinUpdates.push(function() {
  });
  this.takeDamage = function(amount) {
    if (this.health-amount <= 0) {
      this.die();
    } else {
      this.health = this.health - amount;
    }
  };
  this.heal = function(amount) {
    this.health = this.health+amount<=100 ? this.health+amount : 100;
  };
  this.die = function() {
    this.health = 0;
  };
  this.isAlive = function() {
    return this.health>0;
  };
};

/*****************
// Hunger:
*****************/

Mixins.Hunger = function() {
  this.hunger = 100;
  this.mixinUpdates.push(function() {
    if (this.hunger-1 <= 0) {
      this.hunger = 0;
      if (this.die) this.die();
    } else {
      this.hunger--;
    }
  });
  this.eat = function(amount) {
    this.hunger = this.hunger+amount<=100 ? this.hunger+amount : 100;
  };
  this.descHunger = function() {
    if      (this.hunger > 90) return "full";
    else if (this.hunger > 75) return "fine";
    else if (this.hunger > 50) return "hungry";
    else if (this.hunger > 25) return "starving";
    else if (this.hunger > 1)  return "consumed";
  };
};

/****************
// Thirst:
*****************/

Mixins.Thirst = function() {
  this.thirst = 100;
  this.mixinUpdates.push(function() {
    if (this.thirst-1 <= 0) {
      this.thirst = 0;
      if (this.die) this.die();
    } else {
      this.thirst--;
    }
  });
  this.drink = function(amount) {
    this.thirst = this.thirst+amount<=100 ? this.thirst+amount : 100;
  };
  this.descThirst = function() {
    if      (this.thirst > 90) return "full";
    else if (this.thirst > 75) return "fine";
    else if (this.thirst > 50) return "thirsty";
    else if (this.thirst > 25) return "dehydrated";
    else if (this.thirst > 1)  return "consumed";
  };
};
