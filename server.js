var http = require('http');
var express = require('express');
var tts = require('node-tts-api');
var util = require('util');
var exec = require('child_process').exec;
var app = express();

//create server, listen on port 1337
var server = app.listen(1337, function() {

console.log('Listening on port 1337');
});


app.use(express.static('./public/'));

//initialize socket listener
var io = require('socket.io').listen(server);



io.on('connection', function(socket){
	
	//play text to speech when user submits text
	socket.on('new message', function(msg){
		playSpeech(msg,function(err){
		});
	});
	
	//play alarm sound when user hits alarm button
	socket.on('play alarm', function(){
		playAlarm(function(err){
		});
	});

});




//plays Navi's most hated alarm sound
function playAlarm(callback){
	console.log("Playing alarm noise");
	exec('mpg321 http://clyp.it/bfk4ffnu.mp3', function(error, stdout, stderr){
		if(error){
			return callback(error);
		}
	return callback(null);
})

};
//plays Speech inputed into burf box
function playSpeech(sentence,callback){
	console.log('Playing sentence :'+sentence);
	tts.getSpeech(sentence, function(error, link) {
		if(error){
			return callback(error);
		}
		exec('mpg321 '+link, function(error, stdout, stderr){
			if(error){
				return callback(error);
			}	
		callback(null);
	});
  });
};


