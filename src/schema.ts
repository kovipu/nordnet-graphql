import { makeExecutableSchema } from '@graphql-tools/schema';
import { getAccountInfo, getAccountLedgers, getAccounts, getAccountPositions, getAccountReturns } from './nordnet/client';

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
    ledgers: LedgerInfo
    positions: [Position]!
    returns: Returns!
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

  type LedgerInfo {
    ledgers: [Ledger!]!
    total: Amount!
    total_acc_int_cred: Amount!
    total_acc_int_deb: Amount!
  }

  type Ledger {
    acc_int_cred: Amount!
    acc_int_deb: Amount!
    account_sum: Amount!
    account_sum_acc: Amount!
    currency: String!
    exchange_rate: Amount!
  }

  type Position {
    accid: ID
    accno: Int!
    acq_price: Amount!
    acq_price_acc: Amount!
    instrument: Instrument!
    margin_percent: Int!
    market_value: Amount!
    market_value_acc: Amount!
    pawn_percent: Int!
    qty: Float!
  }

  type Instrument {
    asset_class: String
    brochure_url: String
    currency: String!
    dividend_policy: String
    expiration_date: String
    instrument_group_type: String
    instrument_id: ID!
    instrument_type: String!
    isin_code: String
    # key_information_documents: KeyInformationDocuments
    leverage_percentage: Float
    margin_percentage: Float
    market_view: String
    mifid2_category: Int
    multiplier: Float
    name: String
    number_of_securities: Float
    pawn_percentage: Float
    price_type: String
    prospectus_url: String
    sector: String
    sector_group: String
    sfdr_article: Int
    strike_price: Float
    symbol: String!
    total_fee: Float
    # tradables: [Tradable]
    # underlyings: [UnderlyingInfo]
  }

  type Returns {
    accid: ID
    account_number: Int
    aggregated: Boolean!
    result_1_month: Amount
    result_1_week: Amount
    result_1_year: Amount
    result_3_month: Amount
    result_3_year: Amount
    result_6_month: Amount
    result_this_year: Amount
    returns_1_month: Float
    returns_1_week: Float
    returns_1_year: Float
    returns_3_month: Float
    returns_3_year: Float
    returns_6_month: Float
    returns_this_year: Float
    sharpe_ratio_1_month: Float
    sharpe_ratio_1_year: Float
    sharpe_ratio_3_year: Float
    volatility_1_month: Float
    volatility_1_year: Float
    volatility_3_year: Float
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
    info: (account: any) => getAccountInfo(account.accid),
    ledgers: (account: any) => getAccountLedgers(account.accid),
    positions: (account: any) => getAccountPositions(account.accid),
    returns: (account: any) => getAccountReturns(account.accid)
  }
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
