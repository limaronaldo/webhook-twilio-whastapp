const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');


const app = express();

/*
app.get('/', function (req, res) {
    res.send('Hello World!');
});

const accountSid = 'AC4911392a037134f2fe88cbff4b2ecf82';
const authToken = '18f3968756a303e47e8c8eb4630dae7a';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Aquinão Dentão 3',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+553198835100'
    })
    .then(message => console.log(message.sid))
    .done(); */
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
    const twiml = new MessagingResponse();
    if (req.body.Body[0] == 's' || req.body.Body[0] == 'S' || req.body.Body[0] == 'Q' || req.body.Body[0] == 'q' ) {
        twiml.message('Sua Pontuação é 30.000 pontos');
    } else if (req.body.Body[0] == 'T' || req.body.Body[0] == 't' ) {
        twiml.message('Quer saber seus pontos?');
    } else {
        twiml.message(
            'E ai Brenão tudo bem?')
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

http.createServer(app).listen(process.env.PORT || 1337, () => {
    console.log('Express server listening on port 1337');
});
