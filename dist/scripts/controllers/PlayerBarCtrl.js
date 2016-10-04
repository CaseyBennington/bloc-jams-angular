(function() {
  function PlayerBarCtrl(Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
  }


  angular
      .module('Jammies')
      .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();
