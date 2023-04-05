const kafka = require('kafka-node');
const mysql = require('mysql');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const Consumer = kafka.Consumer;

const topic = 'deposit_topic2';

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "kafka",
    password: "Password@1"
  });

const consumer = new Consumer(
  client,
  [
    { topic: topic, partitions: 1 }
  ],
  {
    autoCommit: true
  }
);

connection.connect();

consumer.on('message', function (message) {
    const deposit = JSON.parse(message.value);
    const name = deposit.name;
    const amount = deposit.amount;
    console.log(name+ ":" +amount)

    // Atualização do registro do cliente
    const sql = 'UPDATE client SET saldo = saldo + ? WHERE nome = ?';
    connection.query(sql, [amount, name], function (error, results, fields) {
      if (error) {
        console.error(error);
      } else {
        console.log('Saldo atualizado para ' + name + ': ' + (results.affectedRows > 0));
      }
    });
});