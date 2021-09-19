declare module 'nordnet-api' {
  export default class Nordnet {
    constructor(username: string, password: string);
    init(): void;
    isLoggedIn(): Promise<any>;
    getNextCookie(): Promise<void>;
    instrument(instrument_id: number): any;
    stockhistory(instrument_id: number, start_date: string): any;
    fundlist(): Promise<any[]>;
    stocklist(exchange_country?: string): Promise<any[]>;
  }
}