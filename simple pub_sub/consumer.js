const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const Consumer = kafka.Consumer;
const topic = 'quickstart-events3';

const consumer = new Consumer(client, [{ topic: topic, partition: 0 }], { autoCommit: false });

consumer.on('message', function (message) {
    const parsedMessage = JSON.parse(message.value);
    const key = parsedMessage.key;
    const value = parsedMessage.value;
  
    if (key === 'my-key') {
      console.log('Valor da chave ' + key + ': ' + value);
    }
  });
consumer.on('error', function (err) {
  console.log('Erro: ' + err);
});
