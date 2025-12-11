use super::{default_segatoools_config, save_segatoools_config};
use crate::error::ConfigError;
use std::env;
use std::path::{Path, PathBuf};

pub fn segatoools_path() -> PathBuf {
  if let Ok(custom) = env::var("SEGATOOLS_CONFIG_PATH") {
    PathBuf::from(custom)
  } else {
    Path::new(".").join("segatools.ini")
  }
}

pub fn ensure_default_segatoools_exists() -> Result<(), ConfigError> {
  let path = segatoools_path();
  if !path.exists() {
    if let Some(parent) = path.parent() {
      std::fs::create_dir_all(parent)?;
    }
    let cfg = default_segatoools_config();
    save_segatoools_config(&path, &cfg)?;
  }
  Ok(())
}
