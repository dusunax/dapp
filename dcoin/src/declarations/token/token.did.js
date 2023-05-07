export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getPrincipal' : IDL.Func([], [IDL.Principal], []),
    'getSymbol' : IDL.Func([], [IDL.Text], ['query']),
    'isNullCallerBalances' : IDL.Func([], [IDL.Bool], []),
    'payOut' : IDL.Func([], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
