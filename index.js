import http from 'http';

const HOST = '127.0.0.1';
const PORT = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("Привет");
});

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен на ${HOST}:${PORT}`);
})