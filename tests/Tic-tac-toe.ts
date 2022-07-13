import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TicTacToe } from "../target/types/tic_tac_toe";
import { requestAirDrop, getPlayerInfo } from "./lib";

describe("Tic-tac-toe", async () => {
  const connection = new anchor.web3.Connection("http://127.0.0.1:8899");

  const providerOption: anchor.web3.ConfirmOptions = {
    preflightCommitment: "confirmed",
    commitment: "confirmed",
  };

  const userOneKeypair = /* anchor.web3.Keypair.fromSecretKey(new Uint8Array([
    147, 193, 136, 189, 18 , 81 , 97 , 251,
    49 , 104, 69 , 116, 137, 76 , 156, 230,
    98 , 244, 144, 21 , 178, 199, 188, 37 ,
    246, 140, 248, 192, 168, 134, 117, 26 ,
    136, 106, 34 , 47 , 138, 123, 78 , 150,
    93 , 108, 38 , 25 , 61 , 22 , 56 , 191,
    7  , 99 , 11 , 249, 140, 86 , 87 , 92 ,
    12 , 245, 180, 182, 170, 207, 52 , 128
  ])); */ anchor.web3.Keypair.generate();
  const userOneWallet = new anchor.Wallet(userOneKeypair);

  console.log(`
    # user1
    - pubkey: ${userOneKeypair.publicKey}
    - secret_key: ${userOneKeypair.secretKey}
  `);

  const userTwoKeypair = /* anchor.web3.Keypair.fromSecretKey(new Uint8Array([
    204, 133, 151, 192, 172, 242, 100, 152,
    194, 5  , 67 , 92 , 4  , 254, 7  , 223,
    77 , 196, 111, 172, 247, 237, 122, 93 ,
    228, 138, 159, 16 , 238, 137, 127, 244,
    100, 17 , 193, 63 , 107, 13 , 154, 186,
    188, 21 , 43 , 205, 44 , 180, 84 , 9  ,
    122, 115, 31 , 254, 172, 29 , 98 , 95 ,
    200, 162, 148, 184, 172, 59 , 225, 31
  ])); */ anchor.web3.Keypair.generate();
  const userTwoWallet = new anchor.Wallet(userTwoKeypair);

  console.log(`
    # user2
    - pubkey: ${userTwoKeypair.publicKey}
    - secret_key: ${userTwoKeypair.secretKey}
  `);
  
  const userOneProvider = new anchor.AnchorProvider(
    connection,
    userOneWallet,
    providerOption
  );

  const userTwoProvider = new anchor.AnchorProvider(
    connection,
    userTwoWallet,
    providerOption
  );
  
  it("User1, user2 airdrop", async () => {
    await requestAirDrop(
      connection,
      userOneKeypair.publicKey
    );

    console.log(`
      # user1
      - balance: ${await connection.getBalance(userOneKeypair.publicKey)}
    `);

    await requestAirDrop(
      connection,
      userTwoKeypair.publicKey
    );
  
    console.log(`
      # user2
      - balance: ${await connection.getBalance(userTwoKeypair.publicKey)}
    `);
  });

  it("User1 create room with bet 100 lamport", async () => {
    anchor.setProvider(userOneProvider);
    const program = anchor.workspace.TicTacToe as Program<TicTacToe>;

    console.log("- find user1 info pda: running ...");
    const [userOneInfoPDA, _bump1] = await anchor.web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("player-info"),
        userOneKeypair.publicKey.toBuffer()
      ],
      program.programId
    );
    console.log("- find user1 info pda: complete");
    console.log(`
      # user1 playerinfo
      - pda: ${userOneInfoPDA}
    `);

    let userOneInfo = await getPlayerInfo(connection, userOneInfoPDA, "user1");

    if(userOneInfo == null) {
      console.log("- create user1 playerinfo: running ...");
      await program.methods
        .createPlayerInfo()
        .accounts({
          playerInfo: userOneInfoPDA,
          signer: userOneWallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId
        })
        .rpc();
      console.log("- create user1 playerinfo: complete");

      userOneInfo = await getPlayerInfo(connection, userOneInfoPDA, "user1");
    }

    console.log("- find user1 room pda: running ...");
    const [userOneRoomPDA, _bump2] = await anchor.web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("room"),
        userOneKeypair.publicKey.toBuffer(),
        new Uint8Array(new Uint8ClampedArray([0, 0]))
      ],
      program.programId
    );
    console.log("- find user1 room pda: complete");
    console.log(`
      # user1 room
      - pda: ${userOneRoomPDA}
    `);

    console.log("- create user1 room: running ...");
    await program.methods
      .createRoom(100)
      .accounts({
        playerInfo: userOneInfoPDA,
        room: userOneRoomPDA,
        signer: userOneKeypair.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .rpc();
    console.log("- create user1 room: complete");
  });

  it("User2 join room", async () => {
  });
});
