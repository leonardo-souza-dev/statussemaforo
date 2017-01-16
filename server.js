var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var helmet = require('helmet');

app.use(helmet());
app.set('port', (process.env.PORT || 8090));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(bodyParser({ uploadDir: '/path/to/temporary/directory/to/store/uploaded/files' }));
/*
	retorna status do semaforo solicitado
*/
app.post('/api/status', function (req, res) {
	
	console.log('');
	console.log('**************');
	console.log('*   status   *');
	console.log('**************');
	console.log('');
	console.log('req.body');
	console.log(req.body);
	console.log('');
	
	var mathRandom = Math.random() * 2;
	var status = Math.floor(mathRandom + 0);	
	
	console.log('Status do semaforo #' + req.body.semaforoId + ' eh ' + status);
	console.log('');
	
	var resposta = { sucesso: true, mensagem: 'SUCESSO', status: status };
	res.json(resposta);
});

app.get('/', function (req, res) { 
    res.status(200).send('ok');
});

app.listen(app.get('port'), function () {
    console.log('cf web api na porta', app.get('port'));
});