import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.js';

const PORT = 8000;
const app = express();

app.use((req: Request, res:Response, next: NextFunction) => {
  console.log("Время " + Date.now())
  next();
});

app.get('/hello', (req: Request, res:Response) => {
  res.end("Привет");
})

app.use('/users', userRouter)

app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
