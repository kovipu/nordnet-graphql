export interface Account {
  // The account identifier (id) of the account. The id is unique within the session. Not applicable for partners
  accid?: number,

  // The Nordnet account number
  accno: number,

  // Account alias can be set on Nordnet by the end user
  alias: string,

  // Account type identifier
  atyid?: number,

  // Description to why the account is blocked. The language specified in the request is used in this reply so it can be displayed to the end user
  blocked_reason?: string,

  // True if this is the default account
  default: boolean,

  // True if the account is blocked. No queries can be made to this account
  is_blocked: boolean,

  // Shareville alias that is connected to this account number. Only available for certain systems
  shareville_alias?: number,

  // Translated account type.
  type: string
}

export interface AccountInfo {
  accid?: number,
  accno: number,
  account_credit: Amount,
  account_currency: string,
  account_sum: Amount, // All ledgers combined
  bonush_cash?: Amount, // Bonus cash if available
  collateral: Amount, // Collateral claim for options
  credit_account_interest?: Amount, // Accrued interest for credit account if available
  credit_account_sum?: Amount, // Sum for credit account if available
  forward_sum: Amount, // Locked amount for forwards
  full_marketvalue: Amount, // Total market value
  future_sum: Amount, // Not realized profit/loss for future
  interest: Amount, // Interest on the account
  intraday_credit?: Amount, // Intraday credit if available
  loan_limit: Amount, // Max loan limit (regardless of pawnvalue)
  own_capital: Amount, // account_sum + full_marketvalue + interest + forward_sum + future_sum + unrealized_future_profit_loss
  own_capital_morning: Amount, // Own capital calculated in the morning. Static during the day
  pawn_value: Amount, // Pawn value of all positions combined
  registration_date?: string, // Registration date of the account in YYYY-MM-DD format
  trading_power: Amount, // Available for trading
  unrealized_future_profit_loss: Amount, // Unrealized profit and loss for futures
}

export interface Amount {
  curreny: string,
  value: number
}