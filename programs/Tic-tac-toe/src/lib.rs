use anchor_lang::prelude::*;

declare_id!("2Vp6DmE6YL9ffS8bb215YbWS6jBBWtADpmpXFYbx2eRv");

#[program]
pub mod tic_tac_toe {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn create_room(ctx: Context<CreateRoom>, bet: u8) -> Result<()> {
        // Room account 만든다.
        Ok(())
    }

    pub fn join_room(ctx: Context<JoinRoom>, room_pda_bump: u8 ) -> Result<()> {
        // bump로 일치하는 pda의 Room에 참가한다.
        Ok(())
    }

    pub fn update_board(ctx: Context<UpdateBoard>) -> Result<()> {
        Ok(())
    }
}


#[derive(Accounts)]
pub struct Initialize {
 
}

#[derive(Accounts)]
pub struct CreateRoom {

}

#[derive(Accounts)]
pub struct JoinRoom {
 
}

#[derive(Accounts)]
pub struct UpdateBoard {
 
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

#[account]
pub struct Room {
    o: Pubkey,
    x: Pubkey,
    current_turn: Player,
    playing: GameState,
    beted: u8
}