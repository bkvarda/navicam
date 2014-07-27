var $burf = $("#burf");

var socket = io();

function burf(){
	var message = $burf.val();
	console.log(message);
	socket.emit('new message',message);

};

function playAlarm(){
	socket.emit('play alarm');

};