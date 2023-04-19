const kafka = require('kafka-node');
const readline = require('readline');


const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const Producer = kafka.Producer;
const topic = 'deposit_topic2';

const producer = new Producer(client);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var recursiveAsyncReadLine = function () {
  rl.question('\ninsira: ', function (msg) {
    values = msg.split(" ")
    const message = {
        key: values[0],
        amount: values[1],
        name1: values[2],
        name2: values.length==4? values[3]:''
    };

    producer.send([{ topic: topic, messages: [JSON.stringify(message)] }], function (err, data) {
        if (err) {
        console.log('Erro: ' + err);
        } else {
          console.log();
        }
    });
    recursiveAsyncReadLine();
  });
}


recursiveAsyncReadLine();

