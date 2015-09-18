
var App = {
  mouse:   {clientX:0, clientY:0, pageX:0, pageY:0},
  ui:      {},
  screens: {},

  init: function() {
    this.initUI();
    this.screens.init();
  },

  initUI: function() {
    // ui elements:
    this.ui.layout  = document.getElementById('layout');
    this.ui.canvas  = document.getElementById('canvas');
    this.ui.side    = document.getElementById('side');
    this.ui.details = document.getElementById('details');
    this.ui.actions = document.getElementById('actions');
    this.ui.log     = document.getElementById('log');
    this.ui.input   = document.getElementById('input');
    this.ui.popup   = document.getElementById('popup');

    // ui events:
    window.onkeypress = function(e) {
      e = e || window.event;
      var key = e.which==0 ? e.keyCode : e.which;
      App.handleInput(key);
    };
    window.onmousemove = function(e) {
      App.mouse.clientX = e.clientX;
      App.mouse.clientY = e.clientY;
      App.mouse.pageX   = e.pageX;
      App.mouse.pageY   = e.pageY;
    };
  },

  handleInput: function(key) {
    if (App.screens.currentScreen != null) {
      App.screens.currentScreen.handleInput(key);
    }
  },

  printToLog: function(string) {
    App.ui.log.innerHTML += string +"<br>";
    //App.ui.log.scrollTop  = App.ui.log.scrollHeight;
  }

};
