//Load library
const net = require('net');
//connecting client to server
const client = net.connect({ port: 6969, host: '0.0.0.0'}, () => {

});
//Importing message from server
client.on('data', (data) => {
  process.stdout.write(data);

});

//sending message to server
process.stdin.on('readable', () => {
  let chuck = process.stdin.read()
  if(chuck !== null){
    client.write(chuck)
  }
});


