angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $socket, $interval) {
  $interval(function() {
      if($scope.position != undefined &&  angular.equals($scope.position,{}) == false)
      {
        $socket.emit($scope.position);
        console.dir($scope.position);
      }
  }, 100);
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SettingsController', function($scope, $socket, $ionicPopup, $rootScope) {
  $scope.applyIpAddress = function(ipAddress){
    $socket.connect(ipAddress, function(data){
      console.log(data);
      $ionicPopup.alert({
        title: "Cheers!",
        template:"We are now connected to `" + data.name + "`."
      });
    });
  }
  $scope.settingsChanged = function(){
    // $rootScope.enableControl =  $scope.enableControl;
  }
});
