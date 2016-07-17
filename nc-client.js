const net = require('net');

const serverHost = process.argv[2] || 'localhost';
const serverPort = process.argv[3] || 4000;

const socket = net.connect(serverPort, serverHost);

function assignEvents() {
    console.log('Connect to the server');

    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
        var chunk = process.stdin.read();
        if (chunk !== null) {
            socket.write(chunk);
        }
    });
    process.stdin.on('end', () => {
        socket.end("Goodbye!");
    });

    socket.on('data', (chunk) => {
        console.log(chunk.toString('utf8').slice(0, -1)); // get rid of last newline
    });

    socket.on('end', () => {
        console.log("Server hung up");
        process.stdin.pause();
    });
}

socket.on('connect', assignEvents);
