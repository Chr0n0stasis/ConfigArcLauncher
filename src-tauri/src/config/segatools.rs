use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SegatoolsConfig {
  pub aimeio: AimeioConfig,
  pub aime: AimeConfig,
  pub vfd: VfdConfig,
  pub amvideo: AmvideoConfig,
  pub clock: ClockConfig,
  pub dns: DnsConfig,
  pub ds: DsConfig,
  pub eeprom: EepromConfig,
  pub gpio: GpioConfig,
  pub gfx: GfxConfig,
  pub hwmon: HwmonConfig,
  pub jvs: JvsConfig,
  pub io4: Io4Config,
  pub keychip: KeychipConfig,
  pub netenv: NetenvConfig,
  pub pcbid: PcbidConfig,
  pub sram: SramConfig,
  pub vfs: VfsConfig,
  pub epay: EpayConfig,
  pub openssl: OpensslConfig,
}

impl Default for SegatoolsConfig {
  fn default() -> Self {
    SegatoolsConfig {
      aimeio: AimeioConfig::default(),
      aime: AimeConfig::default(),
      vfd: VfdConfig::default(),
      amvideo: AmvideoConfig::default(),
      clock: ClockConfig::default(),
      dns: DnsConfig::default(),
      ds: DsConfig::default(),
      eeprom: EepromConfig::default(),
      gpio: GpioConfig::default(),
      gfx: GfxConfig::default(),
      hwmon: HwmonConfig::default(),
      jvs: JvsConfig::default(),
      io4: Io4Config::default(),
      keychip: KeychipConfig::default(),
      netenv: NetenvConfig::default(),
      pcbid: PcbidConfig::default(),
      sram: SramConfig::default(),
      vfs: VfsConfig::default(),
      epay: EpayConfig::default(),
      openssl: OpensslConfig::default(),
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AimeioConfig {
  /// Path to third-party AIME IO driver. Empty uses built-in emulation.
  pub path: String,
}

impl Default for AimeioConfig {
  fn default() -> Self {
    Self { path: String::new() }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AimeConfig {
  /// Enable Aime reader emulation (default on).
  pub enable: bool,
  /// COM port number; 0 leaves game default.
  pub portNo: u32,
  /// Use high baud rate (115200).
  pub highBaud: bool,
  /// Emulated hardware generation.
  pub gen: u32,
  /// Path to classic Aime card ID text file.
  pub aimePath: String,
  /// Generate Aime ID if file missing.
  pub aimeGen: bool,
  /// Path to FeliCa ID file.
  pub felicaPath: String,
  /// Generate FeliCa ID if missing.
  pub felicaGen: bool,
  /// Virtual-key code for scan trigger.
  pub scan: u32,
  /// Proxy flag for Thinca auth card.
  pub proxyFlag: u32,
  /// Path to Thinca authdata binary.
  pub authdataPath: String,
}

impl Default for AimeConfig {
  fn default() -> Self {
    Self {
      enable: true,
      portNo: 0,
      highBaud: true,
      gen: 1,
      aimePath: "DEVICE\\aime.txt".to_string(),
      aimeGen: true,
      felicaPath: "DEVICE\\felica.txt".to_string(),
      felicaGen: false,
      scan: 0x0D,
      proxyFlag: 2,
      authdataPath: "DEVICE\\authdata.bin".to_string(),
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct VfdConfig {
  /// Enable VFD emulation.
  pub enable: bool,
  /// COM port number for VFD; 0 means unset.
  pub portNo: u32,
  /// Convert VFD text to UTF for consoles.
  pub utfConversion: bool,
}

impl Default for VfdConfig {
  fn default() -> Self {
    Self {
      enable: true,
      portNo: 0,
      utfConversion: false,
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AmvideoConfig {
  /// Enable amvideo stub instead of real DLL.
  pub enable: bool,
}

impl Default for AmvideoConfig {
  fn default() -> Self {
    Self { enable: true }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ClockConfig {
  /// Force JST timezone for games.
  pub timezone: bool,
  /// Skip maintenance window time-warp.
  pub timewarp: bool,
  /// Allow game to change system clock.
  pub writeable: bool,
}

impl Default for ClockConfig {
  fn default() -> Self {
    Self {
      timezone: true,
      timewarp: false,
      writeable: false,
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DnsConfig {
  /// Default host for common servers.
  #[serde(rename = "default")]
  pub default: String,
  /// Title server override.
  pub title: String,
  /// Router host override.
  pub router: String,
  /// Startup host override.
  pub startup: String,
  /// Billing host override.
  pub billing: String,
  /// Aime DB host override.
  pub aimedb: String,
  /// Replace HTTP HOST headers.
  pub replaceHost: bool,
  /// Startup port override.
  pub startupPort: u32,
  /// Billing port override.
  pub billingPort: u32,
  /// Aime DB port override.
  pub aimedbPort: u32,
}

impl Default for DnsConfig {
  fn default() -> Self {
    Self {
      default: "localhost".to_string(),
      title: "title".to_string(),
      router: String::new(),
      startup: String::new(),
      billing: String::new(),
      aimedb: String::new(),
      replaceHost: false,
      startupPort: 0,
      billingPort: 0,
      aimedbPort: 0,
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DsConfig {
  /// Enable DS EEPROM emulation.
  pub enable: bool,
  /// Region bitmask for AMEX board.
  pub region: u32,
  /// Main ID serial number.
  pub serialNo: String,
}

impl Default for DsConfig {
  fn default() -> Self {
    Self {
      enable: true,
      region: 1,
      serialNo: "AAVE-01A99999999".to_string(),
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EepromConfig {
  /// Enable bulk EEPROM emulation.
  pub enable: bool,
  /// Storage path for EEPROM data.
  pub path: String,
}

impl Default for EepromConfig {
  fn default() -> Self {
    Self {
      enable: true,
      path: "DEVICE\\eeprom.bin".to_string(),
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GpioConfig {
  /// Enable GPIO emulation.
  pub enable: bool,
  /// Virtual-key for SW1 (test).
  pub sw1: u32,
  /// Virtual-key for SW2 (service).
  pub sw2: u32,
  /// DIP switches.
  pub dipsw1: bool,
  pub dipsw2: bool,
  pub dipsw3: bool,
  pub dipsw4: bool,
  pub dipsw5: bool,
  pub dipsw6: bool,
  pub dipsw7: bool,
  pub dipsw8: bool,
}

impl Default for GpioConfig {
  fn default() -> Self {
    Self {
      enable: true,
      sw1: 0x70,
      sw2: 0x71,
      dipsw1: true,
      dipsw2: false,
      dipsw3: false,
      dipsw4: false,
      dipsw5: false,
      dipsw6: false,
      dipsw7: false,
      dipsw8: false,
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GfxConfig {
  /// Enable graphics hooks.
  pub enable: bool,
  /// Force windowed mode.
  pub windowed: bool,
  /// Add frame to windowed mode.
  pub framed: bool,
  /// Monitor index for fullscreen.
  pub monitor: u32,
  /// Make process DPI aware.
  pub dpiAware: bool,
}

impl Default for GfxConfig {
  fn default() -> Self {
    Self {
      enable: true,
      windowed: false,
      framed: false,
      monitor: 0,
      dpiAware: true,
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct HwmonConfig {
  /// Enable hardware monitor stub.
  pub enable: bool,
}

impl Default for HwmonConfig {
  fn default() -> Self {
    Self { enable: true }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct JvsConfig {
  /// Enable JVS controller emulation.
  pub enable: bool,
  /// Only read input while focused.
  pub foreground: bool,
}

impl Default for JvsConfig {
  fn default() -> Self {
    Self {
      enable: true,
      foreground: false,
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Io4Config {
  /// Enable IO4/IO3 emulation.
  pub enable: bool,
  /// Only active when focused.
  pub foreground: bool,
  /// Test button keycode.
  pub test: u32,
  /// Service button keycode.
  pub service: u32,
  /// Coin increment keycode.
  pub coin: u32,
}

impl Default for Io4Config {
  fn default() -> Self {
    Self {
      enable: true,
      foreground: false,
      test: 0x31,
      service: 0x32,
      coin: 0x33,
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct KeychipConfig {
  /// Enable keychip emulation.
  pub enable: bool,
  /// Keychip serial number.
  pub id: String,
  /// Override model code.
  pub gameId: String,
  /// Override platform code.
  pub platformId: String,
  /// Region mask.
  pub region: u32,
  /// Billing certificate path.
  pub billingCa: String,
  /// Billing RSA public key path.
  pub billingPub: String,
  /// Billing type flag.
  pub billingType: u32,
  /// System flag bitfield.
  pub systemFlag: u32,
  /// LAN subnet.
  pub subnet: String,
}

impl Default for KeychipConfig {
  fn default() -> Self {
    Self {
      enable: true,
      id: "A69E-01A88888888".to_string(),
      gameId: String::new(),
      platformId: String::new(),
      region: 1,
      billingCa: "DEVICE\\ca.crt".to_string(),
      billingPub: "DEVICE\\billing.pub".to_string(),
      billingType: 1,
      systemFlag: 0x64,
      subnet: "192.168.100.0".to_string(),
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NetenvConfig {
  /// Enable network virtualization.
  pub enable: bool,
  /// Host IP suffix.
  pub addrSuffix: u32,
  /// Gateway IP suffix.
  pub routerSuffix: u32,
  /// Virtual MAC address.
  pub macAddr: String,
}

impl Default for NetenvConfig {
  fn default() -> Self {
    Self {
      enable: true,
      addrSuffix: 11,
      routerSuffix: 1,
      macAddr: "01:02:03:04:05:06".to_string(),
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PcbidConfig {
  /// Enable hostname virtualization.
  pub enable: bool,
  /// Virtual MAIN ID hostname.
  pub serialNo: String,
}

impl Default for PcbidConfig {
  fn default() -> Self {
    Self {
      enable: true,
      serialNo: "ACAE01A99999999".to_string(),
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SramConfig {
  /// Enable SRAM emulation.
  pub enable: bool,
  /// SRAM storage path.
  pub path: String,
}

impl Default for SramConfig {
  fn default() -> Self {
    Self {
      enable: true,
      path: "DEVICE\\sram.bin".to_string(),
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct VfsConfig {
  /// Enable path redirection hooks.
  pub enable: bool,
  /// AMFS path.
  pub amfs: String,
  /// APPDATA path.
  pub appdata: String,
  /// Option data path.
  pub option: String,
}

impl Default for VfsConfig {
  fn default() -> Self {
    Self {
      enable: true,
      amfs: String::new(),
      appdata: String::new(),
      option: String::new(),
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EpayConfig {
  /// Enable Thinca payment emulation.
  pub enable: bool,
  /// Hook Thinca DLL calls.
  pub hook: bool,
}

impl Default for EpayConfig {
  fn default() -> Self {
    Self {
      enable: true,
      hook: true,
    }
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OpensslConfig {
  /// Enable OpenSSL SHA hook.
  pub enable: bool,
  /// Force hook even when auto-detect would skip.
  #[serde(rename = "override")]
  pub override_flag: bool,
}

impl Default for OpensslConfig {
  fn default() -> Self {
    Self {
      enable: true,
      override_flag: false,
    }
  }
}
