import express from 'express';
import controller from '../controllers/client-controller.js'

const router = express.Router();

router.get('/', controller.getAllClients);

router.get('/:id', controller.getById);

router.post('/cadastro', controller.newClient);

router.put('/:id', controller.updateClient);

router.delete('/:id', controller.deleteClient);

export default router;
