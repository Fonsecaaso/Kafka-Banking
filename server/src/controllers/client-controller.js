import mongoose from "mongoose";

const Client = mongoose.model('Client3')

const controller = {}

controller.getAllClients = async (req,res)=>{
    try{
        const data = await Client
            .find({}, '_id name amount')
        console.log(data)
        res.status(200).send(data)
    } catch (e){
        res.status(400).send(e)
    }
};

controller.getById = async (req,res)=>{
    try{
        const data = await Client.findById(req.params.id, '_id name amount')
        res.status(200).send(data)
    } catch (e){
        res.status(400).send(e)
    }
};

controller.newClient = async (req, res) => {
    const client = new Client(req.body)
    try{
        await client.save()
        res.status(201).send({
            message: "Cadastrado efetuado",
            id: client._id
        });
    } catch(e){
        res.status(400).send({
            message: "Falha no cadastro",
            data: e
        });
    }
};

controller.updateClient = async (req,res)=>{
    try{
        await Client
            .findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
        res.status(201).send({
            message: "Atualização efetuada"
        });
    } catch(e){
        res.status(400).send({
            message: "Falha na atualização",
            data: e
        });
    }
};

controller.deleteClient = async (req,res)=>{
    try{
        await Client
            .findByIdAndRemove(req.params.id);
        res.status(200).send({
            message: 'Cliente deletado com sucesso'
        });
    } catch(e){
        res.status(400).send({
            message: 'Falha ao deletar',
            data: e
        });
    }
};

export default controller;
