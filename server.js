// Load library
const net = require('net');
// Track clients
let clients = [];

const server = net.createServer((socket) => {
  clients.push(socket);

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort;
  socket.write('Username: ');
  //console.log(socket.name);

  // Incoming messages from clients
  socket.on('data', (data) => {
    //first data that is coming in from the data and taking the first user
    data = data.slice(0, data.length -1);
    if(socket.name === socket.remoteAddress + ":" + socket.remotePort) {
      socket.name = data;
    }else {
      broadcast(socket.name + ': ' + data + "\n");
    }
  });


}); //end of server connection
server.listen({port: 6969, host: '0.0.0.0'});


// Send message to all clients, except sender
function broadcast (message, sender) {
  clients.forEach (function (client) {
    if(client === sender) {
      return;
    } else {
      client.write(message);
    }
  });
  //log it to the server output
  process.stdout.write(message + '\n');
} //end of broadcast function
