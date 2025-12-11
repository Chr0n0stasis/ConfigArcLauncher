use super::model::Game;
use crate::error::GameError;
use std::process::Command;

pub fn launch_game(game: &Game) -> Result<(), GameError> {
  if !game.enabled {
    return Err(GameError::Launch("Game is disabled".to_string()));
  }

  let mut cmd = Command::new(&game.executable_path);
  if let Some(dir) = &game.working_dir {
    if !dir.is_empty() {
      cmd.current_dir(dir);
    }
  }
  cmd.args(&game.launch_args);
  cmd.spawn().map_err(|e| GameError::Launch(e.to_string()))?;
  Ok(())
}
