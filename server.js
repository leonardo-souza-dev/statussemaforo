var express = require('express');
var app = express();
var morgan = require('morgan');
var five = require("johnny-five");
var board = new five.Board({ port: "COM3" });

app.set('port', (process.env.PORT || 8090));
app.use(express.static(__dirname + '/public'));


board.on("ready", function() {
	var semaforo1;
	var ledVm1,
	var ledVd1;
	
	var semaforo2;
	var ledVm2;
	var ledVd2;
	
    ledVm1 = new five.Led(3);
	ledVd1 = new five.Led(5);
	
    ledVm2 = new five.Led(6);
	ledVd2 = new five.Led(7);
	
	var self = this;
	
	ledVm1.off();
	ledVd1.off();
	ledVm2.off();
	ledVd2.off();
	
	const delay = 1000;

	//status inicial
	
	for(i = 0; i < 1000; i++) {
		self.wait(delay, function() {
			ledVm1.on();console.log('ligando vermelho');
			ledVd1.off();console.log('desligando verde');
			ledVm2.on();console.log('desligando vermelho');
			ledVd2.off();console.log('ligando verde');
			semaforo1.aberto = 0;
			semaforo2.aberto = 1;
		});
		
		self.wait(delay, function() {
			ledVm1.off();console.log('desligando vermelho');
			ledVd1.on();console.log('ligando verde');
			ledVm2.off();console.log('ligando vermelho');
			ledVd2.on();console.log('desligando verde');
			semaforo1.aberto = 1;
			semaforo2.aberto = 0;
		});
	}

	
	app.post('/api/status', function (req, res) {
		
		console.log('');
		console.log('**************');
		console.log('*   status   *');
		console.log('**************');
		console.log('');
		console.log('req.body');
		console.log(req.body);
		console.log('');
		
		//busca semaforo perto
		var latUsuario = req.body.lat;
		var lngUsuario = req.body.lng;
		
		var semaforoMaisPerto;
		
		for(i = 0; i < semaforos.length; i++) {
			var latSemaforo = semaforos[i].lat;
			var lngSemaforo = semaforos[i].lng;
			
			if (latUsuario >= latSemaforo - 1 && latUsuario =< latSemaforo + ! && 
			    lngUsuario >= lngSemaforo - 1 && lngUsuario =< lngSemaforo + !) {
				semaforoMaisPerto = semaforos[i];				
			} 
		}
		
		//se usuario estiver longe
		if (semaforoMaisPerto == null){
			var resposta = { status: 2 };
			res.json(resposta);
		}
		
		//retorna status
		switch(semaforoMaisPerto.semaforoId) {
			case 1:
				var resposta = { status: semaforo1.aberto };
			res.json(resposta);
			case 2:
				var resposta = { status: semaforo2.aberto };
			res.json(resposta);
		}		
	});
});

var semaforo1 = {"semaforoId": 1, "lat": 20, "lng": 20};
var semaforo2 = {"semaforoId": 2, "lat": 20.5, "lng": 20.5};
var semaforos = [semaforo1, semaforo2];

app.get('/', function (req, res) { 
    res.status(200).send('ok');
});

app.listen(app.get('port'), function () {
    console.log('status semaforo web api na porta', app.get('port'));
});
