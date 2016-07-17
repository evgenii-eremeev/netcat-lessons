const net = require('net');

const serverPort = 4000;
const serverHost = 'localhost';
const clients = {};

function handleClients(socket) {
    const clientAddress = socket.remoteAddress;
    const clientPort = socket.remotePort;
    const clientName = clientAddress + ':' + clientPort;

    clients[clientName] = socket;

    console.log("[Client connected]", clientName);

    socket.on('data', (chunk) => {
        Object.keys(clients).forEach((clientName) => {
            const otherClient = clients[clientName];

            if (otherClient !== socket) {
                otherClient.write(clientName + ' > ' + chunk);
            }
        });
    });

    socket.on('end', () => {
        console.log("[Client disconnected]", clientName);
    });
}

const server = net.createServer(handleClients);

server.listen(serverPort, serverHost, () => {
    console.log("Listening on", server.address())
});
