import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TicTacToe } from "../target/types/tic_tac_toe";

describe("Tic-tac-toe", () => {
  const connnection = new anchor.web3.Connection("http://127.0.0.1:8899");

  const providerOption: anchor.web3.ConfirmOptions = {
    preflightCommitment: "processed",
    commitment: "confirmed",
  };

  const userOneKeypair = anchor.web3.Keypair.generate();
  const userOneWallet = new anchor.Wallet(userOneKeypair);
  console.log(`user1 pubkey: ${userOneKeypair.publicKey}`);

  const userOneProvider = new anchor.AnchorProvider(
    connnection,
    userOneWallet,
    providerOption
  );

  const userTwoKeypair = anchor.web3.Keypair.generate();
  const userTwoWallet = new anchor.Wallet(userTwoKeypair);
  console.log(`user2 pubkey: ${userTwoKeypair.publicKey}`);

  const userTwoProvider = new anchor.AnchorProvider(
    connnection,
    userTwoWallet,
    providerOption
  );

  anchor.setProvider(userOneProvider);

  const program = anchor.workspace.TicTacToe as Program<TicTacToe>;

  it("User1 Create Room", async () => {
    
  });

  it("User2 Join Room", async () => {
  });
});
