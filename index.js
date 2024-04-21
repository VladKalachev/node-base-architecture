import express from 'express';
import { userRouter } from './users/users.js';

const PORT = 8000;
const app = express();

app.use((req, res, next) => {
  console.log("Время " + Date.now())
  next();
});

app.get('/hello', (req, res) => {
  res.end("Привет");
})

app.use('/users', userRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
