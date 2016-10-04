(function() {
  function AlbumCtrl(Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
  }


  angular
      .module('Jammies')
      .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
