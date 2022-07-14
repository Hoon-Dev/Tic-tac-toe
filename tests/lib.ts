/*
  name: lib
  desc: 테스트 코드용 라이브러리 모음
*/

import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TicTacToe } from "../target/types/tic_tac_toe";

export async function requestAirDrop(
  connection: anchor.web3.Connection,
  toAddress: anchor.web3.PublicKey,
  amount: number = 1
) {
  console.log("- request airdrop: running ...");
  let signature = await connection.requestAirdrop(
    toAddress, amount * anchor.web3.LAMPORTS_PER_SOL
  );
  console.log("- request airdrop: complete");

  console.log("- get last blockhash: running ...");
  let getLastBlockHash = await connection.getLatestBlockhash();
  console.log("- get last blockhash: complete");

  console.log("- confirm transaction: running ...");
  await connection.confirmTransaction({
    signature,
    ...getLastBlockHash
  });
  console.log("- confirm transaction: complete");
}

export async function fetchAccount(
  program: Program<TicTacToe>,
  accountName: "playerInfo" | "room",
  address: anchor.web3.PublicKey,
  accountDebugName: string = "account"
) {
  console.log(`- get ${accountDebugName} info: running ...`);
  let info;
  try {
    info = await program.account[accountName].fetch(address, "confirmed");
  } catch(e) {
    info = undefined;
  }
  console.log(`- get ${accountDebugName} info: complete ...`);

  console.log(`
      # ${accountDebugName}
      - info: ${info == undefined ? "NO_INFO" : JSON.stringify(info)}
  `);

  return info;
}

export function uint16ToUint8Array(uint16Number: number) {
  return new Uint8Array([uint16Number >> 8, uint16Number]);
}