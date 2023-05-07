export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getPrincipal' : IDL.Func([], [IDL.Principal], []),
    'getSymbol' : IDL.Func([], [IDL.Text], ['query']),
    'isNullCallerBalances' : IDL.Func([], [IDL.Bool], []),
    'payOutFaucet' : IDL.Func([], [IDL.Text], []),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
