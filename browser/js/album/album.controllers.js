'use strict';

juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {
  
  // main toggle
  $scope.toggle = function (song) {
    if ( $scope.currentlyPlaying(song) ) PlayerFactory.pause();
    else PlayerFactory.start(song, $scope.album.songs);
  };

  $scope.currentlyPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong()===song;
  }

  $scope.next = function () {
    PlayerFactory.next();
  };

  $scope.prev = function () {
    PlayerFactory.previous()
  };

  // load our initial data
  $http.get('/api/albums/')
  .then(res => $http.get('/api/albums/' + res.data[1]._id)) // temp: use first
  .then(res => res.data)
  .then(album => {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    });
    $scope.album = album;
    return StatsFactory.totalTime(album)
  })
  .then(function (totalTime) {
    $scope.album.duration = totalTime;
    console.log($scope);
  })
  .catch($log.error);

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  
  // };

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; };

  // // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // };

});
