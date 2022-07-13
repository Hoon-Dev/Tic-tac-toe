import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TicTacToe } from "../target/types/tic_tac_toe";

async function requestAirDrop(
  connection: anchor.web3.Connection,
  toAddress: anchor.web3.PublicKey,
  amount: number = 1
) {
  console.log("- request airdrop: start ...");
  let signature = await connection.requestAirdrop(
    toAddress, amount * anchor.web3.LAMPORTS_PER_SOL
  );
  console.log("- request airdrop: complete");

  console.log("- get last blockhash: start ...");
  let getLastBlockHash = await connection.getLatestBlockhash();
  console.log("- get last blockhash: complete");

  console.log("- confirm transaction: start ...");
  await connection.confirmTransaction({
    signature,
    ...getLastBlockHash
  });
  console.log("- confirm transaction: complete");
}

describe("Tic-tac-toe", async () => {
  const connection = new anchor.web3.Connection("http://127.0.0.1:8899");

  const providerOption: anchor.web3.ConfirmOptions = {
    preflightCommitment: "processed",
    commitment: "processed",
  };

  const userOneKeypair = anchor.web3.Keypair.generate();
  const userOneWallet = new anchor.Wallet(userOneKeypair);
  console.log(`
    # user1
    - pubkey: ${userOneKeypair.publicKey}
  `);

  await requestAirDrop(
    connection,
    userOneKeypair.publicKey
  );

  console.log(`
    # user1
    - balance: ${await connection.getBalance(userOneKeypair.publicKey)}
  `);

  const userOneProvider = new anchor.AnchorProvider(
    connection,
    userOneWallet,
    providerOption
  );

  const userTwoKeypair = anchor.web3.Keypair.generate();
  const userTwoWallet = new anchor.Wallet(userTwoKeypair);
  console.log(`
    # user2
    - pubkey: ${userTwoKeypair.publicKey}
  `);
  
  await requestAirDrop(
    connection,
    userTwoKeypair.publicKey
  );

  console.log(`
    # user2
    - balance: ${await connection.getBalance(userTwoKeypair.publicKey)}
  `);

  const userTwoProvider = new anchor.AnchorProvider(
    connection,
    userTwoWallet,
    providerOption
  );

  anchor.setProvider(userOneProvider);

  const program = anchor.workspace.TicTacToe as Program<TicTacToe>;

  it("User1 Create Room", async () => {
    // await 
  });

  it("User2 Join Room", async () => {
  });
});
