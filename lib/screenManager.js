
// ScreenManager constructor:

var ScreenManager = function(htmlContainer) {
  this.htmlContainer = htmlContainer;
  this.currentScreen = null;

  this.enterScreen = function(screen, options) {
    if (this.currentScreen) {
      this.currentScreen.childScreen = screen;
      screen.parentScreen = this.currentScreen;
    }
    this.currentScreen = screen;
    this.currentScreen.enter(options);
    this.refresh();
  };

  this.exitScreen = function() {
    var parent = this.currentScreen.parentScreen;
    this.currentScreen.exit();
    this.currentScreen = parent ? parent : App.screens.Start;
    this.refresh();
  };

  this.refresh = function() {
    if (this.currentScreen) {
      if (this.currentScreen.readyToExit) {
        this.exitScreen();
      } else {
        this.currentScreen.update();
        this.currentScreen.draw(this.htmlContainer);
      }
    }
  };

};

if (typeof module !== 'undefined') {
  module.exports.ScreenManager = ScreenManager;
}

