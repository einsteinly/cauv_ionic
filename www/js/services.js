angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Surface Vehicle',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Underwater Vehicle',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory("$socket", function(){
  socket = {};
  socket.connected = false;
  return {
    connect: function(ipAddress, callback){
      socket = io('http://' + ipAddress);
      // console.dir(socket);
      // console.log( "connecting to ws://"+ ipAddress);
      socket.on('connection', function(data){
        // console.dir(socket);
        socket.connected = true;
        callback(data);
      })
    },
    emit: function(data){
      if(socket.connected)
        socket.emit('move', {data:data})
    }
  }
})