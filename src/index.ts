import express, { Application } from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { graphqlHTTP } from 'express-graphql';

const { NordnetAccountResolver } = require('./nordnet/resolver');

const main = async () => {
  const schema = await buildSchema({
    resolvers: [NordnetAccountResolver]
  })

  const port: number = 3001;

  const app: Application = express();

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
}

main();