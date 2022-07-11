use anchor_lang::prelude::*;

declare_id!("2Vp6DmE6YL9ffS8bb215YbWS6jBBWtADpmpXFYbx2eRv");

#[program]
pub mod tic_tac_toe {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
