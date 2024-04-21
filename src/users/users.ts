import express from 'express';

const userRouter = express.Router();

userRouter.post('/login', (req, res) => {
  res.end('login');
})

userRouter.post('/register', (req, res) => {
  res.end('register');
})

export { userRouter }