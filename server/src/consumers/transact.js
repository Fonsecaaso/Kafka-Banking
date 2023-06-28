import mongoose from "mongoose";
import kafka from 'kafka-node';
const Client = mongoose.model('Client3')

const handle = {}
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:29092' });
const producer = new kafka.Producer(client);

function publish(msg, id){
  var message = "[id:"+parseInt(id)+"] "+msg
  console.log(message)
  producer.send([{ topic: 'response', messages: [JSON.stringify(message)] }], function (err, data) {
    if (err) console.log('Erro: ' + err);
  });
}


handle.transfer = async (msg)=> {
    const origin = msg.name1;
    const destination = msg.name2;
    const amount = msg.amount;

    const userOrigin = await Client.findOne({name:origin}, '_id name amount')
    const userDestination = await Client.findOne({name:destination}, '_id name amount job')
  
    if (userOrigin==null ||  userDestination==null){
      publish("usuário inexistente", msg.id)
    }else{
      const originAmount = parseInt(userOrigin.amount) - parseInt(amount)
      const destinationAmount = parseInt(userDestination.amount) + parseInt(amount)
      await Client.findOneAndUpdate({name: origin}, {amount: originAmount})
      await Client.findOneAndUpdate({name: destination}, {amount: destinationAmount})
      publish("usuario " +origin+ " atualizado, saldo: "+originAmount+" - "+"usuario " +destination+ " atualizado, saldo: "+destinationAmount, msg.id) 
    }
  };

handle.deposit = async (msg)=> {
  const user = msg.name1;
  const amount = msg.amount;

  const user_data = await Client.findOne({name:user}, '_id name amount')

  if (user_data==null){
    await Client.create({name: user, amount: parseInt(amount), job: "musician"})
    publish("usuario " +user+ " criado, saldo: "+amount, msg.id)
  }else{
    const newamount = parseInt(user_data.amount) + parseInt(amount)
    await Client.findOneAndUpdate({name: user}, {amount: newamount})
    publish("usuario " +user+ " atualizado, saldo: "+newamount, msg.id)
  }
};

handle.extract = async (msg)=> {
  const user = msg.name1;

  const user_data = await Client.findOne({name:user}, '_id name amount')

  if (user_data==null){
    publish("usuario inexistente", msg.id)
  }else{
    publish(user_data.name + " tem em conta " + user_data.amount, msg.id)
  }

};

export default handle;