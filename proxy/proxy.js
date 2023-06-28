const express = require('express');
const bodyParser = require('body-parser');
const { Kafka } = require('kafkajs');

const app = express();
const kafkaBrokers = ['kafka:29092']; // Endereço dos brokers do Kafka
const kafkaTopic = 'request'; // Tópico do Kafka para enviar os eventos

// Configuração do cliente Kafka
const kafka = new Kafka({
  brokers: kafkaBrokers,
});

// Configuração do produtor Kafka
const producer = kafka.producer();

// Middleware para tratar o body da requisição como JSON
app.use(bodyParser.json());

// Rota POST para receber a requisição e enviar um evento para o Kafka
app.post('/', async (req, res) => {
  try {
    id = Math.floor(Math.random() * 100000000);
    const mensagem = {
        operation: req.body.operation,
        amount: req.body.amount,
        name1: req.body.user1,
        name2: req.body.user2,
        id: id
    };

    // Envia a mensagem para o Kafka
    await producer.send({
      topic: kafkaTopic,
      messages: [{ value: JSON.stringify(mensagem) }],
    });

    res.status(200).send('sucesso, id: '+id);
  } catch (error) {
    console.error('Erro ao enviar evento para o Kafka:', error);
    res.status(500).send('Erro ao enviar evento para o Kafka');
  }
});

// Inicializa o produtor Kafka
async function startKafkaProducer() {
  await producer.connect();
  console.log('Produtor Kafka conectado');
}

// Inicializa o servidor na porta 9043
app.listen(9043, () => {
  console.log('Servidor ouvindo na porta 9043');
  startKafkaProducer();
});
