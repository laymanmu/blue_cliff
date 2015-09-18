
var Repository = function(repoName, instanceConstructor) {
  this.name            = repoName;
  this.constructor     = instanceConstructor;
  this.templates       = {};
  this.randomTemplates = [];
  this.randomTemplateNames = [];
};

Repository.prototype.define = function(name, template) {
  this.templates[name] = template;
  if (template.isRandom) {
    this.randomTemplates.push(template);
    this.randomTemplateNames.push(name);
  }
};

Repository.prototype.create = function(name, overridingProperties) {
  if (!this.templates[name]) {
    throw new Error("no template named "+ name +" found in "+ this.name +" repository.");
  }
  var template = Object.create(this.templates[name]);
  if (overridingProperties) {
    for (var key in overridingProperties) {
      template[key] = overridingProperties[key];
    }
  }
  return new this.constructor(template);
};

Repository.prototype.createRandom = function() {
  var index    = Helpers.randInt(0, this.randomTemplates.length-1);
  var template = this.randomTemplates[index];
  return new this.constructor(template);
};

