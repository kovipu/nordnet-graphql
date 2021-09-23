import { buildSchema } from 'graphql';
import { getAccounts } from './nordnet/client';

const schema = buildSchema(`
  type Query {
    accounts: [Account!]!
  }
  type Account {
    accid: ID
    accno: Int!
    alias: String!
    atyid: Int
    blocked_reason: String
    default: Boolean!
    is_blocked: Boolean
    shareville_alias: String
    type: String!
  }
`);

const roots = {
  accounts: getAccounts
};

export { schema, roots };
