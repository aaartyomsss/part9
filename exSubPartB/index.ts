import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const h = Number(req.query.height);
    const w = Number(req.query.weight);
    try {
        const bmiStr: string = calculateBmi(h, w);
        res.json({
            height: h,
            weight: w,
            bmi: bmiStr
        });
    } catch (error) {
        // eslint-disable-next-line
        res.json({ error: error.message });
    }
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});