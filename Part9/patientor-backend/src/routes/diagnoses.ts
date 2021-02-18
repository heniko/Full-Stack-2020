import express from 'express';
import diagnosisServise from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnosisServise.getDiagnoses());
});

router.post('/', (_req, res) => {
    res.send('Saving diagnosis!');
});

export default router;