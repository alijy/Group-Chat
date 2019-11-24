var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    // emitting a sent message to all connected sockets
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    // informing a new user connection within the server
    console.log('a user connected');
    // informing connected sockets of a new user connection
    io.emit('chat message', 'a user connected');
    // informing a user disconnection within the server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    // echoing user messages within the server
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});

http.listen(port, function(){
    console.log('listening on port: ' + port);
});