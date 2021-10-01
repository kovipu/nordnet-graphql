import { FieldResolver, Query, Resolver, Root } from 'type-graphql';

import { getAccountInfo, getAccountLedgers, getAccountPositions, getAccountReturns, getAccounts } from './client';
import { NordnetAccount } from './schema';

@Resolver(NordnetAccount)
export class NordnetAccountResolver {
  @Query(returns => [NordnetAccount], { description: 'Returns a list of accounts that the user has access to.' })
  nordnetAccounts() {
    return getAccounts();
  }

  @FieldResolver()
  info(@Root() account: NordnetAccount) {
    const { accid } = account;

    if (accid === undefined || accid === null) {
      return [];
    }

    return getAccountInfo(accid);
  }

  @FieldResolver()
  ledgers(@Root() account: NordnetAccount) {
    const { accid } = account;

    if (accid === undefined || accid === null) {
      return [];
    }

    return getAccountLedgers(accid);
  }

  @FieldResolver()
  positions(@Root() account: NordnetAccount) {
    const { accid } = account;

    if (accid === undefined || accid === null) {
      return [];
    }

    return getAccountPositions(accid);
  }

  @FieldResolver()
  returns(@Root() account: NordnetAccount) {
    const { accid } = account;

    if (accid === undefined || accid === null) {
      return null;
    }

    return getAccountReturns(accid);
  }
}
