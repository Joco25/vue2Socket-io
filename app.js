const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('chat.message', function(message){
		io.emit('chat.message',message);
	});
	socket.on('disconnect', function(){
		io.emit('chat.message', 'User has disconnected');
	});
});

server.listen(3000, function(){
	console.log('Listening on port 3000');
});

