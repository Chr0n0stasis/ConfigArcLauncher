import { invokeTauri } from './tauriClient';
import { SegatoolsConfig } from '../types/config';
import { ConfigProfile } from '../types/games';

export const loadSegatoolsConfig = () => invokeTauri<SegatoolsConfig>('get_segatoools_config');
export const saveSegatoolsConfig = (config: SegatoolsConfig) => invokeTauri<void>('save_segatoools_config', { config });
export const loadDefaultSegatoolsConfig = () => invokeTauri<SegatoolsConfig>('default_segatoools_config_cmd');
export const listProfiles = () => invokeTauri<ConfigProfile[]>('list_profiles_cmd');
export const loadProfile = (id: string) => invokeTauri<ConfigProfile>('load_profile_cmd', { id });
export const saveProfile = (profile: ConfigProfile) => invokeTauri<void>('save_profile_cmd', { profile });
export const deleteProfile = (id: string) => invokeTauri<void>('delete_profile_cmd', { id });
export const getSegatoolsPath = () => invokeTauri<string>('segatoools_path_cmd');
