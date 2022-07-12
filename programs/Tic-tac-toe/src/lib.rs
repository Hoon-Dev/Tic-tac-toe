use anchor_lang::prelude::*;

declare_id!("2Vp6DmE6YL9ffS8bb215YbWS6jBBWtADpmpXFYbx2eRv");

#[program]
pub mod tic_tac_toe {
    use super::*;

    pub fn create_player_info(mut ctx: Context<CreatePlayerInfo>) -> Result<()> {
        let accounts = &mut ctx.accounts;
        accounts.player_info.created_room_count = 0;
        accounts.player_info.bump = *ctx.bumps.get("player_info").unwrap();
        Ok(())
    }

    pub fn create_room(ctx: Context<CreateRoom>, bet: u8) -> Result<()> {
        // Room account 만든다.

        // let a = Clock::get().unwrap();
        // msg!("{}", a.unix_timestamp);

        Ok(())
    }

    pub fn join_room(ctx: Context<JoinRoom>) -> Result<()> {
        // bump로 일치하는 pda의 Room에 참가한다.
        Ok(())
    }

    pub fn update_board(ctx: Context<UpdateBoard>) -> Result<()> {
        Ok(())
    }

    pub fn partner_left(ctx: Context<PartnerLeft>) -> Result<()> {
        // 상대방이 퇴장했을때
        Ok(())
    }
}

#[account]
pub struct PlayerInfo {
    created_room_count: u16, // 2
    bump: u8                 // 1
}

#[derive(Accounts)]
pub struct CreatePlayerInfo<'info> {
    #[account(
        init,
        payer = signer,
        seeds = [
            b"player-info",
            signer.key().as_ref()
        ], bump,
        space = 3
    )]
    pub player_info: Account<'info, PlayerInfo>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Room {
    o: Pubkey,            // 32
    x: Pubkey,            // 32
    current_turn: Player, // 1
    playing: GameState,   // 1 + 32
    beted: u8,            // 1
    last_turn_time: i64,  // 8
    created_time: i64,    // 8
    board: [u8; 9],       // 9
    bump: u8
}

impl Room {
    pub const ALLOC_SIZE: usize = 124;
}

#[derive(Accounts)]
pub struct CreateRoom<'info> {
    pub player_info: Account<'info, PlayerInfo>,
    #[account(
        init,
        payer = signer,
        seeds = [
            b"room",
            player_info.created_room_count.to_be_bytes().as_ref()
        ], bump,
        space = 8 + Room::ALLOC_SIZE,
    )]
    pub room: Account<'info, Room>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct JoinRoom {
 
}

#[derive(Accounts)]
pub struct UpdateBoard {
 
}

#[derive(Accounts)]
pub struct PartnerLeft {

}

#[derive(
    AnchorSerialize,
    AnchorDeserialize,
    Clone
)]
pub enum Player {
    o,
    x
}

#[derive(
    AnchorSerialize,
    AnchorDeserialize,
    Clone
)]
pub enum GameState {
    Waiting,
    Playing,
    End { winner: Pubkey }
}