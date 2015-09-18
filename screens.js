
App.screens = {
  currentScreen: null,
  screenLevel:      0,

  init: function() {
    this.enterScreen(App.screens.Start);
  },

  enterScreen: function(screen, properties) {
    this.screenLevel++;
    if (this.currentScreen) {
      this.currentScreen.childScreen = screen;
      screen.parentScreen            = this.currentScreen;
    }
    this.currentScreen = screen;
    this.currentScreen.enter(properties);
    this.refresh();
  },

  exitScreen: function() {
    this.screenLevel--;
    var parent = this.currentScreen.parentScreen;
    this.currentScreen.exit();
    this.currentScreen = parent ? parent : App.screens.Start;
    this.refresh();
  },

  refresh: function() {
    if (this.currentScreen) {
      this.currentScreen.update();
      this.currentScreen.draw();
    }
    console.log("screenLevel: "+ this.screenLevel);
  }
};

/** App.screens.Start **/

App.screens.Start = {
  enter: function(properties) {
    App.ui.actions.innerHTML = "";
    App.ui.side.innerHTML    = "";
    App.ui.log.innerHTML     = "";
  },
  exit: function() {
  },
  update: function() {
  },
  draw: function() {
    App.ui.details.innerHTML = "start screen";
  },
  handleInput: function(key) {
    if (key == Keyboard.KEY_Enter) {
      App.screens.enterScreen(App.screens.Play);
    }
  },
};

/** App.screens.Play **/

App.screens.Play = {
  enter: function(properties) {
  },
  exit: function() {
  },
  update: function() {
  },
  draw: function() {
    App.ui.details.innerHTML = "play screen";
  },
  handleInput: function(key) {
    if (key == Keyboard.KEY_Escape) {
      App.screens.exitScreen();
    } else if (key == Keyboard.KEY_i || key == Keyboard.KEY_I) {
      App.screens.enterScreen(App.screens.Interaction);
    } else {
      App.printToLog("unhandled input: "+ key);
    }
  }
};

/** App.screens.Interaction **/

App.screens.Interaction = {
  enter: function(properties) {
  },
  exit: function() {
  },
  update: function() {
  },
  draw: function() {
    App.ui.details.innerHTML = "interaction screen";
  },
  handleInput: function(key) {
    if (key == Keyboard.KEY_Escape) {
      App.screens.exitScreen();
    }
  }
};
