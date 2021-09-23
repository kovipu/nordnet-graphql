import express, { Application, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';

import { schema, roots } from './schema';

const port: number = 3001;

const app: Application = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: roots
  })
);

app.listen(port, function () {
  console.log(`App is listening on port ${port}`);
});