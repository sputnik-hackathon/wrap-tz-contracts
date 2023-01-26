type amt is nat;
type coinId is int;

type lockEvent is record [
  user : address;
  amount : tez;
  destAddress : string;
  destCoinId : coinId;
  ts : timestamp;
]

type burnEvent is record [
  user : address;
  amount : amt;
  destAddress : string;
  destCoinId : coinId;
  ts : timestamp;
]

type storage is record [
  owner : address;
  oracles : map (address, bool);
  tokens : map (coinId, address); 
]

type event is
  | LockEvent of lockEvent
  | BurnEvent of burnEvent

type return is list (operation) * storage

const noOperations : list (operation) = nil;

type lockParams is michelson_pair (string, "destAddress", coinId, "destCoinId")
type unlockParams is michelson_pair (address, "user", nat, "amount")
type notifyBurnParams is michelson_pair (address, "user", michelson_pair(amt, "coinAmount", string, "destAddress"), "")
type addTokenParams is michelson_pair (coinId, "coinId", address, "tokenAddress")

type entryAction is
  | Lock of lockParams
  | Unlock of unlockParams
  | NotifyBurn of notifyBurnParams
  | AddToken of addTokenParams

function lock (const destAddress : string; const destCoinId : coinId; var s : storage) : return is {
  if Tezos.get_amount () = 0tez then
    failwith ("Amount must be greater than 0");

  const op : operation = Tezos.emit ("%lock", LockEvent(record [
    user = Tezos.get_sender ();
    amount = Tezos.get_amount ();
    destAddress = destAddress;
    destCoinId = destCoinId;
    ts = Tezos.get_now ();
  ]));
} with (list [op], s)

function unlock (const user : address; const amount_ : nat; var s : storage) : return is {
  const is_oracle : bool = case s.oracles[Tezos.get_sender ()] of [
      Some (is_oracle) -> is_oracle
    | None -> False
  ];

  if not is_oracle then 
    failwith ("Only oracle can unlock");

  const destination : contract (unit) =
      case (Tezos.get_contract_opt (user) : option (contract (unit))) of [
        Some (contract) -> contract
      | None -> (failwith ("Wallet not found") : contract (unit))
  ];

  const op : operation = Tezos.transaction (unit, amount_ * 1mutez, destination);
} with (list [op], s)

function notifyBurn (const user : address; const coinAmount : nat; const destAddress: string; var s : storage) : return is {
  var burnedCoinId : coinId := -1;

  for k -> v in map s.tokens {
    if Tezos.get_sender () = v then
      burnedCoinId := k;
  };

  if burnedCoinId = -1 then
    failwith ("get_sender () is unknown token");

  const op : operation = Tezos.emit ("%burn", BurnEvent (record [
    user = user;
    amount = coinAmount;
    destAddress = destAddress;
    destCoinId = burnedCoinId;
    ts = Tezos.get_now ();
  ]));
} with (list [op], s)

function addToken (const coinId : coinId; const tokenAddress : address; var s : storage) : return is {
  const token_exists : bool = case s.tokens[coinId] of [
      Some (_) -> True
    | None -> False
  ];

  if token_exists then 
    failwith ("Token already exists");

  s.tokens[coinId] := tokenAddress;
} with (noOperations, s)

function main (const action : entryAction; var s : storage) : return is
  case action of [
    | Lock (params) -> lock (params.0, params.1, s)
    | Unlock (params) -> unlock (params.0, params.1, s)
    | NotifyBurn (params) -> notifyBurn (params.0, params.1.0, params.1.1, s)
    | AddToken (params) -> addToken (params.0, params.1, s)
  ]