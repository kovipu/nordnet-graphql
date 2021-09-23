import { makeExecutableSchema } from '@graphql-tools/schema';
import { getAccountInfo, getAccounts } from './nordnet/client';

const typeDefs = `
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
    info: [AccountInfo]
  }

  type AccountInfo {
    accid: ID
    accno: Int!
    account_credit: Amount!
    account_currency: String!
    account_sum: Amount!
    bonus_cash: Amount
    collateral: Amount!
    credit_account_interest: Amount
    credit_account_sum: Amount
    forward_sum: Amount
    full_marketvalue: Amount
    future_sum: Amount
    interest: Amount!
    intraday_credit: Amount
    loan_limit: Amount!
    own_capital: Amount!
    own_capital_morning: Amount!
    pawn_value: Amount!
    registration_date: String
    trading_power: Amount!
    unrealized_future_profit_loss: Amount!
  }

  type Amount {
    currency: String!
    value: Float!
  }
`;

const resolvers = {
  Query: {
    accounts: getAccounts
  },

  Account: {
    info: (account: any) => getAccountInfo(account.accid)
  }
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
