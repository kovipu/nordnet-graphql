import express, { Application, Request, Response } from 'express';

import Nordnet from 'nordnet-api';

const app: Application = express();

const port: number = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

// TODO: Require these from client.
const { NORDNET_USERNAME, NORDNET_PASSWORD } = process.env;

app.get('/login', async (req: Request, res: Response) => {
  const nordnet = new Nordnet(NORDNET_USERNAME || '', NORDNET_PASSWORD || '');

  try {
    const instrument = await nordnet.instrument(17092094);
    res.send(instrument);
  } catch (err: any) {
    console.log(err);
    res.status(500)
      .send(err.message);
  }
});

app.listen(port, function () {
  console.log(`App is listening on port ${port}`);
});