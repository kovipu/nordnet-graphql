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