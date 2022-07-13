use anchor_lang::prelude::*;

declare_id!("2Vp6DmE6YL9ffS8bb215YbWS6jBBWtADpmpXFYbx2eRv");

#[program]
pub mod tic_tac_toe {
    use super::*;

    pub fn create_player_info(ctx: Context<CreatePlayerInfo>) -> Result<()> {
        let accounts = ctx.accounts;
        accounts.player_info.created_room_count = 0;
        accounts.player_info.bump = *ctx.bumps.get("player_info").unwrap();
        Ok(())
    }

    pub fn create_room(ctx: Context<CreateRoom>, bet: u8) -> Result<()> {
        let accounts = ctx.accounts;
        accounts.room.o = None;
        accounts.room.x = None;
        accounts.room.current_turn = Player::o;
        accounts.room.playing = GameState::Waiting { Waiter: accounts.signer.key() };
        accounts.room.beted = bet;
        accounts.room.last_turn_time = 0;
        accounts.room.created_time = Clock::get().unwrap().unix_timestamp;
        accounts.room.board = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ];
        accounts.room.bump = *ctx.bumps.get("room").unwrap();
        accounts.player_info.created_room_count += 1;
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
        space = 8 + 3
    )]
    pub player_info: Account<'info, PlayerInfo>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Room {
    o: Option<Pubkey>,    // 1 + 32
    x: Option<Pubkey>,    // 1 + 32
    current_turn: Player, // 1
    playing: GameState,   // 1 + 32 + 32
    beted: u8,            // 1
    last_turn_time: i64,  // 8
    created_time: i64,    // 8
    board: [u8; 9],       // 9
    bump: u8              // 1
}

impl Room {
    pub const ALLOC_SIZE: usize = 159;
}

#[derive(Accounts)]
pub struct CreateRoom<'info> {
    #[account(
        seeds = [
            b"player-info",
            signer.key().as_ref()
        ],
        bump = player_info.bump
    )]
    pub player_info: Account<'info, PlayerInfo>,
    #[account(
        init,
        payer = signer,
        seeds = [
            b"room",
            signer.key().as_ref(),
            player_info.created_room_count.to_le_bytes().as_ref()
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
    Waiting { Waiter: Pubkey },
    Playing,
    End { winner: Pubkey }
}