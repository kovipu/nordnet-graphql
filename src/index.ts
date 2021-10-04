import 'reflect-metadata';
import express, { Application } from 'express';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { graphqlHTTP } from 'express-graphql';

import { NordnetAccountResolver } from './nordnet/resolver';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [NordnetAccountResolver]
  });

  const port: number = 3001;

  const app: Application = express();

  app.use(cors());

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  );

  app.listen(port, function () {
    console.log(`App is listening on port ${port}`);
  });
};

main();
