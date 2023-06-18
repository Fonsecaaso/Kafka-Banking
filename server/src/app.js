import express from 'express';
import bodyParser from 'body-parser';
//import cors from 'cors';
import mongoose from 'mongoose';

//Schemas
import Client from './models/client.js';
import Client3 from './models/client3.js';

//Routes
import indexRoute from './routes/index-route.js';
import clientRoute from './routes/client-route.js';

const app = express();

import runConsumer from './consumers/transactions-consumer.js';

runConsumer();

// Connect to MongoDB instance:
mongoose.connect('mongodb+srv://user:1234@cluster0.7woti.mongodb.net/kafka-banking?retryWrites=true&w=majority');

// Verificação da conexão
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected')
})

db.on('error', err => {
  console.error('connection error:', err)
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cors());

//Add routes
app.use('/', indexRoute);
app.use('/clients', clientRoute);

export default app;