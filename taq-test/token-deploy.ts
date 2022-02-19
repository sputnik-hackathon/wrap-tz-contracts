import { TezosToolkit } from '@taquito/taquito';
import { importKey } from '@taquito/signer';

const fs = require('fs')
const { Tezos } = require('@taquito/taquito')

const provider = 'https://rpc.hangzhounet.teztnets.xyz'

async function deploy() {
    const tezos = new TezosToolkit(provider);

    await importKey(
        tezos,
        "rrnesnob.ihhvbfrl@teztnets.xyz",
        "DBZQStpcfn",
        [
            "attend",
            "must",
            "senior",
            "usage",
            "screen",
            "pelican",
            "defy",
            "slush",
            "behave",
            "dad",
            "fault",
            "rule",
            "village",
            "blue",
            "junior"
        ].join(' '),
        "5718543ca3ccbdcfa0d1a0d5e4eabea4c7ef8cf5",
    )

    try {
        const op = await tezos.contract.originate({
            code: `{ parameter
                (or (or (or (pair %approve (address %spender) (nat %value))
                            (pair %getAllowance (pair (address %owner) (address %spender)) (contract nat)))
                        (or (pair %getBalance (address %owner) (contract nat))
                            (pair %getTotalSupply unit (contract nat))))
                    (pair %transfer (address %from) (pair (address %to) (nat %value)))) ;
              storage
                (pair (big_map %ledger address (pair (map %allowances address nat) (nat %balance)))
                      (nat %totalSupply)) ;
              code { NIL operation ;
                     LAMBDA
                       (pair address (pair (big_map address (pair (map address nat) nat)) nat))
                       (pair (map address nat) nat)
                       { UNPAIR ;
                         SWAP ;
                         CAR ;
                         SWAP ;
                         GET ;
                         IF_NONE { PUSH nat 0 ; EMPTY_MAP address nat ; PAIR } {} } ;
                     LAMBDA
                       (pair (pair (pair (map address nat) nat) address)
                             (pair (big_map address (pair (map address nat) nat)) nat))
                       nat
                       { CAR ; UNPAIR ; CAR ; SWAP ; GET ; IF_NONE { PUSH nat 0 } {} } ;
                     DIG 3 ;
                     UNPAIR ;
                     IF_LEFT
                       { IF_LEFT
                           { IF_LEFT
                               { UNPAIR ;
                                 DUP 3 ;
                                 SENDER ;
                                 PAIR ;
                                 DIG 5 ;
                                 SWAP ;
                                 EXEC ;
                                 DUP 4 ;
                                 DUP 3 ;
                                 DUP 3 ;
                                 PAIR ;
                                 PAIR ;
                                 DIG 5 ;
                                 SWAP ;
                                 EXEC ;
                                 PUSH nat 0 ;
                                 DUP 5 ;
                                 COMPARE ;
                                 GT ;
                                 PUSH nat 0 ;
                                 DIG 2 ;
                                 COMPARE ;
                                 GT ;
                                 AND ;
                                 IF { PUSH string "UnsafeAllowanceChange" ; FAILWITH } {} ;
                                 DUP 4 ;
                                 CDR ;
                                 DIG 4 ;
                                 CAR ;
                                 DUP 3 ;
                                 CDR ;
                                 DIG 3 ;
                                 CAR ;
                                 DIG 5 ;
                                 DIG 5 ;
                                 SWAP ;
                                 SOME ;
                                 SWAP ;
                                 UPDATE ;
                                 PAIR ;
                                 SOME ;
                                 SENDER ;
                                 UPDATE ;
                                 PAIR ;
                                 SWAP ;
                                 PAIR }
                               { DIG 4 ;
                                 DROP ;
                                 DUP ;
                                 DUG 2 ;
                                 CDR ;
                                 PAIR ;
                                 SWAP ;
                                 DUP ;
                                 DUG 2 ;
                                 CAR ;
                                 CDR ;
                                 DIG 2 ;
                                 CAR ;
                                 CAR ;
                                 DIG 2 ;
                                 UNPAIR ;
                                 SWAP ;
                                 DUP ;
                                 DUG 2 ;
                                 DIG 3 ;
                                 PAIR ;
                                 DIG 5 ;
                                 SWAP ;
                                 EXEC ;
                                 DUP 3 ;
                                 DIG 4 ;
                                 DIG 2 ;
                                 PAIR ;
                                 PAIR ;
                                 DIG 3 ;
                                 SWAP ;
                                 EXEC ;
                                 DIG 2 ;
                                 NIL operation ;
                                 DIG 3 ;
                                 PUSH mutez 0 ;
                                 DIG 4 ;
                                 TRANSFER_TOKENS ;
                                 CONS ;
                                 PAIR } }
                           { DIG 2 ;
                             DIG 4 ;
                             DROP 2 ;
                             IF_LEFT
                               { UNPAIR ;
                                 DUP 3 ;
                                 SWAP ;
                                 PAIR ;
                                 DIG 3 ;
                                 SWAP ;
                                 EXEC ;
                                 DIG 2 ;
                                 NIL operation ;
                                 DIG 3 ;
                                 PUSH mutez 0 ;
                                 DIG 4 ;
                                 CDR ;
                                 TRANSFER_TOKENS ;
                                 CONS ;
                                 PAIR }
                               { DIG 2 ;
                                 DROP ;
                                 CDR ;
                                 SWAP ;
                                 DUP ;
                                 DUG 2 ;
                                 NIL operation ;
                                 DIG 2 ;
                                 PUSH mutez 0 ;
                                 DIG 4 ;
                                 CDR ;
                                 TRANSFER_TOKENS ;
                                 CONS ;
                                 PAIR } } }
                       { DUP ;
                         DUG 2 ;
                         CDR ;
                         CDR ;
                         PAIR ;
                         SWAP ;
                         DUP ;
                         DUG 2 ;
                         CDR ;
                         CAR ;
                         DIG 2 ;
                         CAR ;
                         DIG 2 ;
                         UNPAIR ;
                         SWAP ;
                         DUP ;
                         DUG 2 ;
                         DUP 4 ;
                         PAIR ;
                         DUP 7 ;
                         SWAP ;
                         EXEC ;
                         SWAP ;
                         DUP ;
                         DUG 2 ;
                         SWAP ;
                         DUP ;
                         DUG 2 ;
                         CDR ;
                         COMPARE ;
                         LT ;
                         IF { PUSH string "NotEnoughBalance" ; FAILWITH } {} ;
                         SENDER ;
                         DUP 5 ;
                         COMPARE ;
                         NEQ ;
                         IF { DUP 3 ;
                              SENDER ;
                              DUP 3 ;
                              PAIR ;
                              PAIR ;
                              DIG 6 ;
                              SWAP ;
                              EXEC ;
                              DUP 3 ;
                              SWAP ;
                              DUP ;
                              DUG 2 ;
                              COMPARE ;
                              LT ;
                              IF { PUSH string "NotEnoughAllowance" ; FAILWITH } {} ;
                              SWAP ;
                              DUP ;
                              DUG 2 ;
                              CDR ;
                              DIG 2 ;
                              CAR ;
                              DUP 4 ;
                              DIG 3 ;
                              SUB ;
                              ABS ;
                              SOME ;
                              SENDER ;
                              UPDATE ;
                              PAIR }
                            { DIG 5 ; DROP } ;
                         SWAP ;
                         DUP ;
                         DUG 2 ;
                         SWAP ;
                         DUP ;
                         DUG 2 ;
                         CDR ;
                         SUB ;
                         ABS ;
                         SWAP ;
                         CAR ;
                         PAIR ;
                         DUP 3 ;
                         CDR ;
                         DIG 3 ;
                         CAR ;
                         DIG 2 ;
                         DIG 4 ;
                         SWAP ;
                         SOME ;
                         SWAP ;
                         UPDATE ;
                         PAIR ;
                         DUP ;
                         DUP 4 ;
                         PAIR ;
                         DIG 4 ;
                         SWAP ;
                         EXEC ;
                         DIG 2 ;
                         SWAP ;
                         DUP ;
                         DUG 2 ;
                         CDR ;
                         ADD ;
                         SWAP ;
                         CAR ;
                         PAIR ;
                         SWAP ;
                         DUP ;
                         DUG 2 ;
                         CDR ;
                         DIG 2 ;
                         CAR ;
                         DIG 2 ;
                         DIG 3 ;
                         SWAP ;
                         SOME ;
                         SWAP ;
                         UPDATE ;
                         PAIR ;
                         SWAP ;
                         PAIR } } }
            
            `,
            init: '(Pair { Elt "tz1gDNe8ZTqSJvoJWRdMjKRPU5zMgyBJ6L9M" (Pair { Elt "tz1gDNe8ZTqSJvoJWRdMjKRPU5zMgyBJ6L9M" 1000 } 1000) } 1000)',
          })

        console.log('Awaiting confirmation...')
        const contract = await op.contract()

        console.log('Gas Used', op.consumedGas)
        console.log('Storage', await contract.storage())

        console.log('Operation hash:', op.hash)
    } catch (ex) {
        console.error(ex)
      }
}

deploy();