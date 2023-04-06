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

const consumer = new Consumer(client,[{ topic: topic, partitions: 1 }],{autoCommit: true});

connection.connect();

consumer.on('message', function (message) {
  const deposit = JSON.parse(message.value);
  const name = deposit.name;
  const amount = deposit.amount;
  
  const sql = 'select saldo from client WHERE nome = ?';
  connection.query(sql, [name], function (error, results, fields) {
    if (error) console.error(error);
    if (results.length == 0){
      const newCLientSQL = 'insert into client(nome, saldo,tipo) values(?,?,?)';
      connection.query(newCLientSQL,[name,amount,'pessoa'], function (error,results){
        if (error) {
            console.error(error);
        } else
        console.log("novo usuario inserido");
      });
    } else {
      const updateCLientSQL = 'UPDATE client SET saldo = saldo + ? WHERE nome = ?';
      connection.query(updateCLientSQL, [amount, name], function (error, results, fields){
        if (error) {
            console.error(error);
        } else
        console.log("saldo atualizado");
      });
    }
  });
});