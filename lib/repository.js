
var Repository = function(name, constructor) {
  this.name          = name;
  this.constructor   = constructor;
  this.templates     = {};
  this.templateNames = [];

  this.define = function(name, template) {
    if (!this.templates[name]) {
      this.templateNames.push(name);
    }
    this.templates[name] = template;
  };

  this.create = function(name, overridingOptions) {
    var created = new this.constructor(this.templates[name]);
    for (var key in overridingOptions) {
      created[key] = overridingOptions[key];
    }
    return created;
  };
};
 
if (typeof module !== 'undefined') {
  module.exports.Repository = Repository;
}

