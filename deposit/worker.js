const kafka = require('kafka-node');
const mysql = require('mysql');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const Consumer = kafka.Consumer;



var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "kafka",
    password: "Password@1"
  });

const topic = 'topico';
const consumer = new Consumer(client,[{ topic: topic, partitions: 1 }],{autoCommit: true});

connection.connect();

consumer.on('message', function (message) {
  const msg = JSON.parse(message.value);
  console.log("msg.key: ",msg.operation);


  if(msg.operation == 'deposit')
    deposit(msg);
  else if(msg.key == 'transfer')
    transfer(msg);

});


function deposit (msg) {
  const name = msg.name1;
  const amount = msg.amount;
  const sql = 'select saldo from client WHERE nome = ?';
  connection.query(sql, [name], function (error, results, fields) {
    if (error) console.error(error);

    if (results.length == 0){
      const newCLientSQL = 'insert into client(nome, saldo,tipo) values(?,?,?)';

      connection.query(newCLientSQL,[name,amount,'pessoa'], function (error,results){
        if (error) {
          console.error(error);
          return;
        } 
        console.log('novo usuario inserido');
      });

    } else {

      const updateCLientSQL = 'UPDATE client SET saldo = saldo + ? WHERE nome = ?';

      connection.query(updateCLientSQL, [amount, name], function (error, results, fields){
        if (error) {
          console.error(error);
          return;
        } 

        console.log('saldo atualizado');
      });

    }
  });
};

function transfer (msg) {
  const origin = msg.name1;
  const destination = msg.name2;
  const amount = msg.amount;
  const count = 'select saldo from client WHERE nome = ? or nome = ?';

  connection.query(count, [origin,destination], function (error, results, fields) {
    if (error){
      console.error(error);
      return;
    }

    if (results.length < 2){
      console.log("usuário inexistente");
    } 
    
    else {
      const updateOrigin = 'UPDATE client SET saldo = saldo - ? WHERE nome = ?';
      const updateDestination = 'UPDATE client SET saldo = saldo + ? WHERE nome = ?';

      try {
        connection.beginTransaction();

        connection.query(updateOrigin, [amount, origin]);
        connection.query(updateDestination, [amount, destination]);

        connection.commit();
        console.log('Transação concluída com sucesso!');
      } catch (error) {
        connection.rollback();
        console.log('Erro ao executar transação:', error);
      } 
    }
  });
};