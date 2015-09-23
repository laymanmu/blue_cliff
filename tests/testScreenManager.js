
var Entity        = require('../lib/entity.js').Entity;
var Mixins        = require('../lib/mixins.js').Mixins;
var Repository    = require('../lib/repository.js').Repository;
var Screen        = require('../lib/screen.js').Screen;
var ScreenManager = require('../lib/screenManager.js').ScreenManager;

module.exports = {

  setUp: function(callback) {
    var htmlContainer = {innerHTML:''};
    this.startScreen = new Screen({details:'start'});
    this.playScreen  = new Screen({details:'play'});
    this.screenMgr   = new ScreenManager(htmlContainer);
    callback();
  },
  tearDown: function(callback) {
    callback();
  },

  testEnterScreen: function(test) {
    test.equal(null, this.screenMgr.currentScreen);

    this.screenMgr.enterScreen(this.startScreen);
    test.equal('start', this.screenMgr.currentScreen.details);
    test.equal(undefined, this.screenMgr.currentScreen.parent);
    test.equal(undefined, this.screenMgr.currentScreen.child);

    this.screenMgr.enterScreen(this.playScreen);
    test.equal('play',  this.screenMgr.currentScreen.details);
    test.equal('start', this.screenMgr.currentScreen.parentScreen.details);
    test.equal('play',  this.startScreen.childScreen.details);

    test.done();
  },

  testExitScreen: function(test) {
    var shopScreen = new Screen({name:'shop', details:'shop'});
    this.screenMgr.enterScreen(this.startScreen);
    this.screenMgr.enterScreen(this.playScreen);
    this.screenMgr.enterScreen(shopScreen);

    test.equal('shop', this.screenMgr.currentScreen.details);
    this.screenMgr.exitScreen();
    test.equal('play', this.screenMgr.currentScreen.details);
    this.screenMgr.exitScreen();
    test.equal('start', this.screenMgr.currentScreen.details);
    test.done();
  }

};
