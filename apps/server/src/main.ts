import express from 'express';
import * as path from 'path';
// import { prisma } from '@scores3093/prisma';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', async (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
