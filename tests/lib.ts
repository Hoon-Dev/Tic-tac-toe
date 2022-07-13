import * as anchor from "@project-serum/anchor";

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

export async function getPlayerInfo(
  connection: anchor.web3.Connection,
  playerInfoPDA: anchor.web3.PublicKey,
  userDebugName: string = "user"
): Promise<anchor.web3.AccountInfo<Buffer> | null> {
  console.log(`- get ${userDebugName} info: running ...`);
  const userOneInfo = await connection.getAccountInfo(playerInfoPDA, "confirmed");
  console.log(`- get ${userDebugName} info: complete ...`);

  console.log(`
      # ${userDebugName}
      - info: ${userOneInfo == null ? "NO_INFO" : JSON.stringify(userOneInfo)}
  `);

  return userOneInfo;
}