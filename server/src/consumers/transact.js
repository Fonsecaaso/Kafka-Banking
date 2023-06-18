import mongoose from "mongoose";
const Client = mongoose.model('Client3')

const handle = {}

handle.transfer = async (msg)=> {
    const origin = msg.name1;
    const destination = msg.name2;
    const amount = msg.amount;

    const userOrigin = await Client.findOne({name:origin}, '_id name amount')
    const userDestination = await Client.findOne({name:destination}, '_id name amount job')
  
    if (userOrigin==null ||  userDestination==null){
      console.log("usuário inexistente")
      return
    }
    console.log("atualizando ...")
    const originAmount = parseInt(userOrigin.amount) - parseInt(amount)
    const destinationAmount = parseInt(userDestination.amount) + parseInt(amount)
    await Client.findOneAndUpdate({name: origin}, {amount: originAmount})
    await Client.findOneAndUpdate({name:destination}, {amount: destinationAmount})
    console.log("atualizado")

  };

  handle.deposit = async (msg)=> {
    const user = msg.name1;
    const amount = msg.amount;


    const user_data = await Client.findOne({name:user}, '_id name amount')
  

    if (user_data==null){
      await Client.create({name: user, amount: parseInt(amount), job: "musician"})
      console.log("usuario criado")
      return
    }

    console.log("atualizando ...")
    const newamount = parseInt(user_data.amount) + parseInt(amount)
    await Client.findOneAndUpdate({name: user}, {amount: newamount})
    console.log("atualizado")
  
    };

export default handle;