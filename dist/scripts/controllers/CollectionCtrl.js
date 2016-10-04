(function() {
  function CollectionCtrl(Fixtures) {
    this.albums = Fixtures.getCollection(12);
  }


  angular
      .module('Jammies')
      .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
