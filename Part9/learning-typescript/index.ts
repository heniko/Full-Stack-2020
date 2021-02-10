import express = require('express');
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        if (isNaN(height) || isNaN(weight)) {
            res.send({ error: 'malformatted parameters' });
        }
        const bmi: string = calculateBmi(height, weight);
        res.send({ weight, height, bmi });
    } catch (error) {
        console.log((<Error>error).message);
        res.send({ error: 'malformatted parameters' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
});