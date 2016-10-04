(function() {
  function LandingCtrl() {
    this.heroTitle = "Turn the Music Up!";
  }

  angular
      .module('Jammies')
      .controller('LandingCtrl', LandingCtrl);
})();
