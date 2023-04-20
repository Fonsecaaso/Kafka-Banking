import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        title: "Kafka Banking",
        version: "0.0.1"
    });
});

export default router;