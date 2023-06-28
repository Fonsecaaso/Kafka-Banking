import kafka from 'kafka-node';
import handle from './transact.js'

const client = new kafka.KafkaClient({ kafkaHost: 'kafka:29092' });
const Consumer = kafka.Consumer;
const topic = 'request';
const consumer = new Consumer(client, [{ topic: topic, partitions: 1 }], { autoCommit: true });

async function runConsumer() {
  try {
    consumer.on('message', function (message) {
      const msg = JSON.parse(message.value);
      
      if (msg.operation == 'deposit')
        handle.deposit(msg);
      else if (msg.operation == 'transfer')
        handle.transfer(msg);
      else if (msg.operation == 'extract')
        handle.extract(msg);
    });


  } catch (error) {
    console.error('Erro ao executar consumidor Kafka:', error);
  }
}

export default runConsumer;
