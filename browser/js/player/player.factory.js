'use strict';

juke.factory('PlayerFactory', function ($rootScope) {
	var audio = document.createElement('audio');
  
  audio.addEventListener('ended', function() {
    player.next();
    $rootScope.$digest();
  });
  
  audio.addEventListener('timeupdate', function () {
    //$rootScope.progress = 100 * PlayerFactory.getProgress();
    $rootScope.$digest(); // no Angular-aware code is doing this for us here
  });

  var player = {
  	songList: null,
  	currentSong: null,
  	start: function (song, songList) {
  		this.songList = songList;
  		this.currentSong = song;
  		this.pause();
  		audio.src = song.audioUrl;
  		audio.load();
  		audio.play();
  	},
  	pause: function() {
  		audio.pause();
  	},
  	resume: function() {
  		audio.play();
  	},
  	isPlaying: function() {
  		return !audio.paused
  	},
  	getCurrentSong: function() {
  		return this.currentSong;
  	},
  	next: function() {
  		var list = this.songList;
  		var currentIndex = list.indexOf(this.currentSong);
  		var nextIndex = currentIndex===list.length-1 ? 0 : currentIndex+1;

  		this.start(this.songList[nextIndex], this.songList);
  	},
  	previous: function() {
  		var list = this.songList;
  		var currentIndex = list.indexOf(this.currentSong);
  		var previousIndex = currentIndex===0 ? list.length-1 : currentIndex-1;

  		this.start(this.songList[previousIndex], this.songList);
  	},
  	getProgress: function() {
  		return audio.currentTime/audio.duration || 0;
  	}

  };

  return player;

});
