import express = require('express');
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
    try {
        const height: number = Number(req.query.height);
        const weight: number = Number(req.query.weight);
        if (isNaN(height) || isNaN(weight)) {
            res.send({ error: 'malformatted parameters' });
        }
        const bmi: string = calculateBmi(height, weight);
        res.send({ weight, height, bmi });
    } catch (error) {
        console.log(error.message);
        res.send({ error: 'malformatted parameters' });
    }
})

const PORT: number = 3000;

app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
})