import express, { Express, Request, Response } from 'express';
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('OK')
});

app.listen(3000, () => {
    console.log('Server online');
});