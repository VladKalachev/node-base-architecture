import express from 'express';

const PORT = 8000;
const app = express();

app.get('/hello', (req, res) => {
  res.end("Привет");
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
