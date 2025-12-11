/**
 * Segatools configuration mirrors segatools.ini sections and keys.
 */
export interface SegatoolsConfig {
  aimeio: AimeioConfig;
  aime: AimeConfig;
  vfd: VfdConfig;
  amvideo: AmvideoConfig;
  clock: ClockConfig;
  dns: DnsConfig;
  ds: DsConfig;
  eeprom: EepromConfig;
  gpio: GpioConfig;
  gfx: GfxConfig;
  hwmon: HwmonConfig;
  jvs: JvsConfig;
  io4: Io4Config;
  keychip: KeychipConfig;
  netenv: NetenvConfig;
  pcbid: PcbidConfig;
  sram: SramConfig;
  vfs: VfsConfig;
  epay: EpayConfig;
  openssl: OpensslConfig;
}

export interface AimeioConfig { path: string; }

export interface AimeConfig {
  enable: boolean;
  portNo: number;
  highBaud: boolean;
  gen: number;
  aimePath: string;
  aimeGen: boolean;
  felicaPath: string;
  felicaGen: boolean;
  scan: number;
  proxyFlag: number;
  authdataPath: string;
}

export interface VfdConfig {
  enable: boolean;
  portNo: number;
  utfConversion: boolean;
}

export interface AmvideoConfig { enable: boolean; }

export interface ClockConfig {
  timezone: boolean;
  timewarp: boolean;
  writeable: boolean;
}

export interface DnsConfig {
  default: string;
  title: string;
  router: string;
  startup: string;
  billing: string;
  aimedb: string;
  replaceHost: boolean;
  startupPort: number;
  billingPort: number;
  aimedbPort: number;
}

export interface DsConfig {
  enable: boolean;
  region: number;
  serialNo: string;
}

export interface EepromConfig {
  enable: boolean;
  path: string;
}

export interface GpioConfig {
  enable: boolean;
  sw1: number;
  sw2: number;
  dipsw1: boolean;
  dipsw2: boolean;
  dipsw3: boolean;
  dipsw4: boolean;
  dipsw5: boolean;
  dipsw6: boolean;
  dipsw7: boolean;
  dipsw8: boolean;
}

export interface GfxConfig {
  enable: boolean;
  windowed: boolean;
  framed: boolean;
  monitor: number;
  dpiAware: boolean;
}

export interface HwmonConfig { enable: boolean; }

export interface JvsConfig {
  enable: boolean;
  foreground: boolean;
}

export interface Io4Config {
  enable: boolean;
  foreground: boolean;
  test: number;
  service: number;
  coin: number;
}

export interface KeychipConfig {
  enable: boolean;
  id: string;
  gameId: string;
  platformId: string;
  region: number;
  billingCa: string;
  billingPub: string;
  billingType: number;
  systemFlag: number;
  subnet: string;
}

export interface NetenvConfig {
  enable: boolean;
  addrSuffix: number;
  routerSuffix: number;
  macAddr: string;
}

export interface PcbidConfig {
  enable: boolean;
  serialNo: string;
}

export interface SramConfig {
  enable: boolean;
  path: string;
}

export interface VfsConfig {
  enable: boolean;
  amfs: string;
  appdata: string;
  option: string;
}

export interface EpayConfig {
  enable: boolean;
  hook: boolean;
}

export interface OpensslConfig {
  enable: boolean;
  override: boolean;
}
