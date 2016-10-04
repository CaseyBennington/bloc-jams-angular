(function() {
  function SongPlayer($rootScope, Fixtures) {
    /**
    * @desc Empty SongPlayer object
    **/
    var SongPlayer = {};

    /**
    * @desc Current Album object from Fixtures service
    **/
    var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file
    * @type {Object}
    **/
    var currentBuzzObject = null;

    /**
    * @function playSong
    * @desc Plays currently selected song
    * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
    };

    /**
    * @function getSongIndex
    * @desc Gets the index of the song in the array
    * @param {Object} song
    * @returns {Object} song index
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @function stopSong
    * @desc Stops the currently playing song
    * @param {Object} song
    */
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    /**
    * @desc Active song object from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @desc current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;

    /**
    * @desc Current song volume
    * @type {Number}
    */
    SongPlayer.volume = 50;

    /**
    * @function play
    * @desc Plays current or new song
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /**
    * @function pause
    * @desc Pause current song
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function previous
    * @desc Move to playing the previous song in the array
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function next
    * @desc Move to playing the next song in the array
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > currentAlbum.songs.length-1) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function setCurrentTime
    * @desc Set current time (in seconds) of currently playing song
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    /**
    * @function setVolume
    * @desc Set current volume of currently playing song
    * @param {Number} volume
    */
    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
      }
      SongPlayer.volume = volume;
    };

    return SongPlayer;
  }


  angular
      .module('Jammies')
      .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
