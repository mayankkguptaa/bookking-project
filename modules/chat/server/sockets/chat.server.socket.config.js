'use strict';

// Create the chat configuration
module.exports = function (io, socket) {
  // when the client emits 'addUser', this listens and executes
  socket.on('addUser', function (data) {
    socket.username = data.username;
    // store the room name in the socket session for this client
    socket.room = 'default';
    // send client to room 1
    socket.join(data.room);
  });

  // when the client emits 'sendChat', this listens and executes
  socket.on('sendChat', function (data) {
    data.message.type = 'message';
    // we tell the client to execute 'updateChat' with 2 parameters
    io.sockets.in(socket.room).emit('updateChat', data.message);
  });

  socket.on('switchRoom', function (newRoom) {
    socket.leave(socket.room);
    socket.join(newRoom);
    // update socket session room title
    socket.room = newRoom;
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    io.emit('updateChat', {
      type: 'status',
      content: 'disconnected'
    });

    socket.leave(socket.room);
  });
};
