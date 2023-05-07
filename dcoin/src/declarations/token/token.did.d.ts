import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'getPrincipal' : () => Promise<Principal>,
  'getSymbol' : () => Promise<string>,
  'isNullCallerBalances' : () => Promise<boolean>,
  'payOut' : () => Promise<string>,
}
