import kafka from 'kafka-node';
import handle from './transact.js'

async function runConsumer() {
  try {
    const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
    const Consumer = kafka.Consumer;
    const topic = 'topico';
    const consumer = new Consumer(client,[{ topic: topic, partitions: 1 }],{autoCommit: true});

    await consumer.on('message', function (message) {
      const msg = JSON.parse(message.value);
    
      if(msg.operation == 'deposit')
        handle.deposit(msg);
      else if(msg.operation == 'transfer')
        handle.transfer(msg);
    
    });  

  } catch (error) {
    console.error('Erro ao executar consumidor Kafka:', error);
  }
}

runConsumer();

export default runConsumer;
