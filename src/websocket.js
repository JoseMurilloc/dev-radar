import socketio from 'socket.io';

exports.setupWebSocket = (server) => {
  const io = socketio(server);

  // Adicionando um eventListner
  io.on('connection', socket => {
    console.log(socket.id);
  });
}