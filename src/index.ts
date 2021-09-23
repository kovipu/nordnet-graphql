import express, { Application, Request, Response } from 'express';

import * as nordnet from './nordnet/client';

const app: Application = express();

const port: number = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.get('/accounts', async (req: Request, res: Response) => {
  const accounts = await nordnet.getAccounts();
  res.send(accounts);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port}`);
});