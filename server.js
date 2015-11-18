var http = require('http');
var express = require('express');
var tts = require('node-tts-api');
var util = require('util');
var exec = require('child_process').exec;
var rest = require('restler');
var uri = "https://api.particle.io/v1/devices/32001e000447343232363230/givetreat?access_token=73582194c8f57637ac30dafc326c1dcf546fee83";
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

	//dispense treat when user hits treat button
	socket.on('treat', function (){
		giveTreat(function(err){
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
	console.log('Commanding the following: '+sentence);

	tts.getSpeech(sentence, function(error, link) {
		if(error){
			return callback(error);
		}
        console.log('Audio Link :' + link);
		exec('mpg321 '+link, function(error, stdout, stderr){
			if(error){
				return callback(error);
			}	
		callback(link);
	});
  });
};

function getSpeechAudio(sentence,callback){
	tts.getSpeech(sentence, function(error, link){
		if(error){
			return callback(error);
		}
		return link;
	});

};

function giveTreat(callback){
	console.log("Dispensing Treat");

	rest.post(uri, {data: { arg: "givetreat"}}).on('complete', function(data, response){
		console.log(response.statusCode);
	});
}


