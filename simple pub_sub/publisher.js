const kafka = require('kafka-node');
const readline = require('readline');


const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const Producer = kafka.Producer;
const topic = 'quickstart-events3';

const producer = new Producer(client);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var recursiveAsyncReadLine = function () {
  rl.question('Digite a mensagem a ser enviada: ', function (msg) {
    const message = {
        key: 'my-key',
        value: msg
    };

    producer.send([{ topic: topic, messages: [JSON.stringify(message)] }], function (err, data) {
        if (err) {
        console.log('Erro: ' + err);
        } else {
        console.log('Mensagem enviada: ' + JSON.stringify(data));
        }
    });
    recursiveAsyncReadLine();
  });
}


recursiveAsyncReadLine();

