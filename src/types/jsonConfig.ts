export type JsonConfigKind = 'common' | 'sp' | 'hook' | 'cvt' | 'other' | string;

export interface JsonConfigFileEntry {
  name: string;
  path: string;
  kind: JsonConfigKind;
}

export type JsonConfigData = Record<string, any>;

export interface CommonCreditConfig {
  enable?: boolean;
  max_credit?: number;
  config?: {
    game_cost?: number[];
  };
}

export interface CommonAllnetAuthConfig {
  enable?: boolean;
  type?: string;
  support_line?: {
    broadband?: boolean;
    mobile?: boolean;
    xdsl?: boolean;
  };
}

export interface CommonAllnetAccountingConfig {
  enable?: boolean;
  mode?: string;
}

export interface CommonAimeUnit {
  port?: number;
  id?: number;
}

export interface CommonAimeConfig {
  enable?: boolean;
  unit?: CommonAimeUnit[];
  firmware_path?: string[];
  high_baudrate?: boolean;
}

export interface CommonEmoneyConfig {
  enable?: boolean;
  resource_path?: string;
  aime_unit?: number;
  display_port?: number;
  ignore_brand?: string[];
  log?: {
    level?: number;
    root_path?: string;
  };
}

export interface CommonConfigEditable {
  credit?: CommonCreditConfig;
  allnet_auth?: CommonAllnetAuthConfig;
  allnet_accounting?: CommonAllnetAccountingConfig;
  aime?: CommonAimeConfig;
  emoney?: CommonEmoneyConfig;
  [key: string]: unknown;
}
