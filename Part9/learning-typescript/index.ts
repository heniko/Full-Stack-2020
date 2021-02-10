import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

interface ExerciseBody {
    target: number,
    daily_exercises: Array<number>
}

app.post('/exercises', (req, res) => {
    try {
        const body: ExerciseBody = req.body as ExerciseBody;
        if (isNaN(body.target)) {
            res.send({ error: 'malformatted parameters' });
        }
        for (let i = 0; i < body.daily_exercises.length; i++) {
            if (isNaN(body.daily_exercises[i])) {
                res.send({ error: 'malformatted parameters' });
            }
        }
        res.send(calculateExercises(body.daily_exercises, body.target));
    } catch (error) {
        console.log((<Error>error).message);
        res.send({ error: 'malformatted parameters' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
});