import socketio from 'socket.io';
import parserStringAsArray from './utils/ParserStringAsArray';
import calculeteDistance from './utils/calculeteDistance';


const connections = [];

let io;

exports.setupWebSocket = (server) => {
  io = socketio(server);

  // Adicionando um eventListner
  io.on('connections', socket => {
    
    const { latitude, longitude, techs } = socket.handshake.query;
    
    // Salvando todas as conexões feita dentro da nossa aplicação em array mesmo podendo ser banco mongodb
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parserStringAsArray(techs),
    });
  });
}



// Estou vericando se ele esta a 10km do dev e se tem techs em comuns
exports.findConection = (coordinates, techs) => {
  return connections.filter(connection =>   {
    // Esta cpmparando as conexões dos novos devs com as conexões dos devs armazenados
    return calculeteDistance(coordinates, connection.coordinates) < 10 && connections.techs.some(item => techs.includes(item))
  })
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}