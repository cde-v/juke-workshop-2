'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  $scope.isPlaying = PlayerFactory.isPlaying;
  
  $scope.currentSong = function() {
    return this.isPlaying() || PlayerFactory.getCurrentSong();
  };

  $scope.progress = function() {
    return 100*PlayerFactory.getProgress();
  }

  $scope.songList = PlayerFactory.songList;

  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.resume();
  };

  // outgoing events (to Album… or potentially other characters)
  $scope.next = function () {
    PlayerFactory.next();
  };
  $scope.prev = function () {
    PlayerFactory.previous()
  };

});
