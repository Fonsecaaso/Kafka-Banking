const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9043' });

const producer = new kafka.Producer(client);

producer.on('ready', () => {
  const message = 'teste';
  const payloads = [
    {
      topic: 'topic',
      messages: message
    }
  ];

  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Erro ao enviar a mensagem:', err);
    } else {
      console.log('Mensagem enviada com sucesso:', data);
    }

    producer.close();
    process.exit();
  });
});

producer.on('error', (err) => {
  console.error('Erro no producer:', err);
});
