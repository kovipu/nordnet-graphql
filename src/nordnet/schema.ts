import { Field, Float, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Amount {
  @Field({ description: 'The amount currency' })
  currency: string;

  @Field(type => Float, { nullable: true, description: 'The amount' })
  value?: number;
}

@ObjectType()
export class NordnetAccountInfo {
  @Field(type => ID, {
    nullable: true,
    description:
      'The account identifier (id) of the account. The id is unique within the session. Not applicable for partners'
  })
  accid?: number;

  @Field(type => Int, { description: 'The Nordnet account number' })
  accno: number;

  @Field({ description: 'Account credit' })
  account_credit: Amount;

  @Field({ description: 'The account currency' })
  account_currency: string;

  @Field({ description: 'All ledgers combined' })
  account_sum: Amount;

  @Field({ nullable: true, description: 'Bonus cash if available' })
  bonus_cash?: Amount;

  @Field({ description: 'Collateral claim for options' })
  collateral: Amount;

  @Field({ nullable: true, description: 'Accrued interest for credit account if available' })
  credit_account_interest?: Amount;

  @Field({ nullable: true, description: 'Sum for credit account if available' })
  credit_account_sum?: Amount;

  @Field({ description: 'Locked amount for forwards' })
  forward_sum: Amount;

  @Field({ description: 'Total market value' })
  full_marketvalue: Amount;

  @Field({ description: 'Not realized profit/loss for future' })
  future_sum: Amount;

  @Field({ description: 'Interest on the account' })
  interest: Amount;

  @Field({ nullable: true, description: 'Intraday credit if available' })
  intraday_credit?: Amount;

  @Field({ description: 'Max loan limit (regardless of pawnvalue)' })
  loan_limit: Amount;

  @Field({
    description: 'account_sum + full_marketvalue + interest + forward_sum + future_sum + unrealized_future_profit_loss'
  })
  own_capital: Amount;

  @Field({ description: 'Own capital calculated in the morning. Static during the day' })
  own_capital_morning: Amount;

  @Field({ description: 'Pawn value of all positions combined' })
  pawn_value: Amount;

  @Field({ nullable: true, description: 'Registration date of the account in YYYY-MM-DD format' })
  registration_date?: string;

  @Field({ description: 'Available for trading' })
  trading_power: Amount;

  @Field({ description: 'Unrealized profit and loss for futures' })
  unrealized_future_profit_loss: Amount;
}

@ObjectType()
export class NordnetLedger {
  @Field({ description: 'Interest credit in the ledger currency' })
  acc_int_cred: Amount;

  @Field({ description: 'Interest debit in the ledger currency' })
  acc_int_deb: Amount;

  @Field({ description: 'The sum in the ledger currency' })
  account_sum: Amount;

  @Field({ description: 'The sum in the account currency' })
  account_sum_acc: Amount;

  @Field({ description: 'Currency of the ledger' })
  currency: string;

  @Field({ description: 'The price to convert to base currency' })
  exchange_rate: Amount;
}

@ObjectType()
export class NordnetLedgerInfo {
  @Field(type => [NordnetLedger], { description: 'Each ledger' })
  ledgers: NordnetLedger[];

  @Field({ description: 'Total of all the ledgers in the account currency' })
  total: Amount;

  @Field({ description: 'Total interest credit in the account currency' })
  total_acc_int_cred: Amount;

  @Field({ description: 'Total interest debit in the account currency' })
  total_acc_int_deb: Amount;
}

@ObjectType()
export class NordnetInstrument {
  @Field({ nullable: true, description: 'Asset class key word' })
  asset_class?: string;

  @Field({ nullable: true, description: 'URL to brochure if available' })
  brochure_url?: string;

  @Field({ description: 'The currency of the instrument' })
  currency: string;

  @Field({ nullable: true, description: 'The dividend policy' })
  dividend_policy?: string;

  @Field({ nullable: true, description: 'Expiration date if applicable.' })
  expiration_date?: string;

  @Field({
    nullable: true,
    description:
      'The instrument group. Wider description than instrument type. The description is available in the instrument type lookup'
  })
  instrument_group_type?: string;

  @Field(type => ID, {
    description: 'Unique identifier of the instrument. Can in some cases be 0 if the instrument is not tradable'
  })
  instrument_id: number;

  @Field({ description: 'The instrument type.' })
  instrument_type: string;

  @Field({ nullable: true, description: 'The instrument isin code' })
  isin_code?: string;

  // @Field({ nullable: true, description: "URLs to key information documents (KIDs) if available" })
  // key_information_documents?: NordnetKeyInformationDocuments;

  @Field(type => Float, { nullable: true, description: 'The leverage percentage if applicable' })
  leverage_percentage?: number;

  @Field(type => Float, { nullable: true, description: 'The margin percentage if applicable' })
  margin_percentage?: number;

  @Field({ nullable: true, description: 'Marking market view for leverage instruments. U for up and D for down' })
  market_view?: string;

  @Field(type => Int, {
    nullable: true,
    description: 'The mifid2 category of an instrument. Used to determine if a user can trade the instrument'
  })
  mifid2_category?: number;

  @Field(type => Float, { nullable: true, description: 'The instrument multiplier' })
  multiplier?: number;

  @Field({ description: 'The instrument name' })
  name: string;

  @Field(type => Float, { nullable: true, description: 'Number of securities, not available for all instruments' })
  number_of_securities?: number;

  @Field(type => Float, { nullable: true, description: 'The pawn percentage if applicable' })
  pawn_percentage?: number;

  @Field({
    nullable: true,
    description: 'Price type when trading, not available for all markets. Example: monetary_amount, percentage, yield'
  })
  price_type?: string;

  @Field({ nullable: true, description: 'URL to prospectus if available' })
  prospectus_url?: string;

  @Field({ nullable: true, description: 'The sector id of the instrument' })
  sector: string;

  @Field({ nullable: true, description: 'The sector group of the instrument' })
  sector_group: string;

  @Field(type => Int, { nullable: true, description: 'The SFDR article of a fund. Can be 6, 8 or 9' })
  sfdr_article?: number;

  @Field(type => Float, { nullable: true, description: 'Strike price if applicable' })
  strike_price?: number;

  @Field({ description: "The instrument symbol. E.g 'ERIC B'" })
  symbol: string;

  @Field(type => Float, { nullable: true, description: 'Total fee' })
  total_fee?: number;

  // @Field(type => [NordnetTradable], {
  //   nullable: true,
  //   description:
  //     'The tradables that belongs to the instrument. If the instrument is not tradable this field is left out'
  // })
  // tradables?: NordnetTradable[];

  // @Field(type => [NordnetUnderlyingInfo], { nullable: true, description: 'A list of underlyings to the instrument' })
  // underlyings?: NordnetUnderlyingInfo[];
}

@ObjectType()
export class NordnetPosition {
  @Field(type => Int, {
    nullable: true,
    description:
      'The account identifier (id) of the account. The id is unique within the session. Not applicable for partners'
  })
  accid?: number;

  @Field(type => Int, { description: 'The Nordnet account number' })
  accno: number;

  @Field({ description: 'Acquisition price in the tradable currency' })
  acq_price: Amount;

  @Field({ description: 'Acquisition price in the account currency' })
  acq_price_acc: Amount;

  @Field({ description: 'Position instrument' })
  instrument: NordnetInstrument;

  @Field(type => Int, { description: 'Collateral percentage required to cover this position if short (qty < 0).' })
  margin_percent: number;

  @Field({ description: 'Market value in the tradable currency' })
  market_value: Amount;

  @Field({ description: 'Market value in the account currency' })
  market_value_acc: Amount;

  @Field({ description: 'The price of the instrument of the position in the morning' })
  morning_price: Amount;

  @Field(type => Int, { description: 'How much can the user loan on this position' })
  pawn_percent: number;

  @Field(type => Float, { description: 'The quantity of the position' })
  qty: number;
}

@ObjectType()
export class NordnetAccountReturnsHistorical {
  @Field(type => Int, {
    nullable: true,
    description:
      'The account identifier (id) of the account. The id is unique within the session. Not applicable for partners'
  })
  accid?: number;

  @Field(type => Int, { description: 'The account number, omitted if this is an aggregate' })
  account_number?: number;

  @Field({ description: 'Indicates if this is the aggregated performance or not, defaults to false' })
  aggregated: boolean;

  @Field({ nullable: true, description: 'Result the last month' })
  result_1_month?: Amount;

  @Field({ nullable: true, description: 'Result the last week' })
  result_1_week?: Amount;

  @Field({ nullable: true, description: 'Result the last year' })
  result_1_year?: Amount;

  @Field({ nullable: true, description: 'Result the last 3 months' })
  result_3_month?: Amount;

  @Field({ nullable: true, description: 'Result the last 3 year' })
  result_3_year?: Amount;

  @Field({ nullable: true, description: 'Result the last 6 months' })
  result_6_month?: Amount;

  @Field({ nullable: true, description: 'Result this year' })
  result_this_year?: Amount;

  @Field(type => Float, { nullable: true, description: 'Return in % the last month' })
  returns_1_month?: number;

  @Field(type => Float, { nullable: true, description: 'Return in % the last week' })
  returns_1_week?: number;

  @Field(type => Float, { nullable: true, description: 'Return in % the last year' })
  returns_1_year?: number;

  @Field(type => Float, { nullable: true, description: 'Return in % the last three months' })
  returns_3_month?: number;

  @Field(type => Float, { nullable: true, description: 'Return in % the last three years' })
  returns_3_year?: number;

  @Field(type => Float, { nullable: true, description: 'Return in % the last six months' })
  returns_6_month?: number;

  @Field(type => Float, { nullable: true, description: 'Return in % this year' })
  returns_this_year?: number;

  @Field(type => Float, { nullable: true, description: 'Sharpe ratio the last month' })
  sharpe_ratio_1_month?: number;

  @Field(type => Float, { nullable: true, description: 'Sharpe ratio the last year' })
  sharpe_ratio_1_year?: number;

  @Field(type => Float, { nullable: true, description: 'Sharpe ratio the last three years' })
  sharpe_ratio_3_year?: number;

  @Field(type => Float, { nullable: true, description: 'Portfolio volatility the last month' })
  volatility_1_month?: number;

  @Field(type => Float, { nullable: true, description: 'Portfolio volatility the last year' })
  volatility_1_year?: number;

  @Field(type => Float, { nullable: true, description: 'Portfolio volatility the last three years' })
  volatility_3_year?: number;
}

@ObjectType()
export class NordnetAccount {
  @Field(type => ID, {
    nullable: true,
    description:
      'The account identifier (id) of the account. The id is unique within the session. Not applicable for partners'
  })
  accid?: number;

  @Field(type => Int, { description: 'The Nordnet account number' })
  accno: number;

  @Field({ description: 'Account alias can be set on Nordnet by the end user' })
  alias: string;

  @Field(type => Int, { nullable: true, description: 'Account type identifier' })
  atyid?: number;

  @Field({
    nullable: true,
    description:
      'Description to why the account is blocked. The language specified in the request is used in this reply so it can be displayed to the end user'
  })
  blocked_reason?: string;

  @Field({ description: 'True if this is the default account' })
  default: boolean;

  @Field({ nullable: true, description: 'True if the account is blocked. No queries can be made to this account' })
  is_blocked?: boolean;

  @Field({
    nullable: true,
    description: 'Shareville alias that is connected to this account number. Only available for certain systems'
  })
  shareville_alias?: string;

  @Field({ description: 'Translated account type.' })
  type: string;

  @Field(type => [NordnetAccountInfo], {
    description: 'The account info summary gives details of one or more account.'
  })
  info: NordnetAccountInfo[];

  @Field(type => NordnetLedgerInfo, {
    nullable: true,
    description: 'Information about the currency ledgers of an account'
  })
  ledgers?: NordnetLedgerInfo;

  @Field(type => [NordnetPosition], { description: 'The positions of the account' })
  positions: NordnetPosition[];

  @Field({ nullable: true, description: 'Historical returns of the account' })
  returns: NordnetAccountReturnsHistorical;
}
