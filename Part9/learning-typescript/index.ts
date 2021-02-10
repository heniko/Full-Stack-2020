import express = require('express');

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
})

const PORT: number = 3000;

app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
})