import { invokeTauri } from './tauriClient';
import { JsonConfigData, JsonConfigFileEntry } from '../types/jsonConfig';

export const listJsonConfigs = () => invokeTauri<JsonConfigFileEntry[]>('list_json_configs_cmd');
export const loadJsonConfig = (name: string) => invokeTauri<JsonConfigData>('load_json_config_cmd', { name });
export const saveJsonConfig = (name: string, content: JsonConfigData) =>
  invokeTauri<void>('save_json_config_cmd', { name, content });
