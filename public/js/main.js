var $burf = $("#burf");
var $burfmp3 = $("#burfmp3");


var socket = io();

function burf(){
	var message = $burf.val();
	console.log(message);
	socket.emit('new message',message);

};

function playAlarm(){
	document.getElementById("alarmp3").play();
	socket.emit('play alarm');

};