use crate::config::{
    paths::{ensure_default_segatoools_exists, segatoools_path},
    profiles::{delete_profile, list_profiles, load_profile, save_profile, ConfigProfile},
    segatools::SegatoolsConfig,
    {default_segatoools_config, load_segatoools_config, save_segatoools_config as persist_segatoools_config},
};
use crate::games::{launcher::launch_game, model::Game, store};
use tauri::command;

#[command]
pub fn get_segatoools_config() -> Result<SegatoolsConfig, String> {
    ensure_default_segatoools_exists().map_err(|e| e.to_string())?;
    let path = segatoools_path();
    load_segatoools_config(&path).map_err(|e| e.to_string())
}

#[command]
pub fn save_segatoools_config(config: SegatoolsConfig) -> Result<(), String> {
    let path = segatoools_path();
    persist_segatoools_config(&path, &config).map_err(|e| e.to_string())
}

#[command]
pub fn list_profiles_cmd() -> Result<Vec<ConfigProfile>, String> {
    list_profiles().map_err(|e| e.to_string())
}

#[command]
pub fn load_profile_cmd(id: String) -> Result<ConfigProfile, String> {
    load_profile(&id).map_err(|e| e.to_string())
}

#[command]
pub fn save_profile_cmd(profile: ConfigProfile) -> Result<(), String> {
    save_profile(&profile).map_err(|e| e.to_string())
}

#[command]
pub fn delete_profile_cmd(id: String) -> Result<(), String> {
    delete_profile(&id).map_err(|e| e.to_string())
}

#[command]
pub fn list_games_cmd() -> Result<Vec<Game>, String> {
    store::list_games().map_err(|e| e.to_string())
}

#[command]
pub fn save_game_cmd(game: Game) -> Result<(), String> {
    store::save_game(game).map_err(|e| e.to_string())
}

#[command]
pub fn delete_game_cmd(id: String) -> Result<(), String> {
    store::delete_game(&id).map_err(|e| e.to_string())
}

#[command]
pub fn launch_game_cmd(id: String, profile_id: Option<String>) -> Result<(), String> {
    ensure_default_segatoools_exists().map_err(|e| e.to_string())?;
    let path = segatoools_path();

    if let Some(pid) = profile_id {
        let profile = load_profile(&pid).map_err(|e| e.to_string())?;
        persist_segatoools_config(&path, &profile.segatools).map_err(|e| e.to_string())?;
    }

    let games = store::list_games().map_err(|e| e.to_string())?;
    let game = games
        .into_iter()
        .find(|g| g.id == id)
        .ok_or_else(|| "Game not found".to_string())?;

    launch_game(&game).map_err(|e| e.to_string())
}

#[command]
pub fn default_segatoools_config_cmd() -> Result<SegatoolsConfig, String> {
    Ok(default_segatoools_config())
}

#[command]
pub fn segatoools_path_cmd() -> Result<String, String> {
    Ok(segatoools_path()
        .to_str()
        .unwrap_or("./segatools.ini")
        .to_string())
}
