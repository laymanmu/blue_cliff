
var KeyStore = function(hash) {
  this.length = 0;
  this.items  = {};
  for (var key in hash) {
    if (hash.hasOwnProperty(key)) {
      this.items[key] = hash[key];
      this.length++;
    }
  }
};

KeyStore.prototype.set = function(key, value) {
  if (!this.items.hasOwnProperty(key)) {
    this.length++;
  }
  this.items[key] = value;
};

KeyStore.prototype.add = function(key, value) {
  this.set(key, value);
};

KeyStore.prototype.get = function(key) {
  return this.items[key];
};

KeyStore.prototype.delete = function(key) {
  if (this.items.hasOwnProperty(key)) {
    delete this.items[key];
    this.length--;
  }
};

KeyStore.prototype.clear = function() {
  this.items  = {};
  this.length = 0;
};

KeyStore.prototype.keys = function() {
  var keys = [];
  for (var key in this.items) {
    if (this.items.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys;
};

KeyStore.prototype.values = function() {
  var values = [];
  for (var key in this.items) {
    if (this.items.hasOwnProperty(key)) {
      values.push(this.items[key]);
    }
  }
  return values;
};
