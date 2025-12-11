use crate::error::ConfigError;
use configparser::ini::Ini;
use std::fs;
use std::path::Path;

pub mod paths;
pub mod profiles;
pub mod segatools;

pub use segatools::SegatoolsConfig;

fn parse_bool(val: &str) -> Option<bool> {
  match val.trim().to_lowercase().as_str() {
    "1" | "true" | "yes" => Some(true),
    "0" | "false" | "no" => Some(false),
    _ => None,
  }
}

fn parse_u32(val: &str) -> Option<u32> {
  let trimmed = val.trim();
  if let Some(hex) = trimmed.strip_prefix("0x") {
    u32::from_str_radix(hex, 16).ok()
  } else {
    trimmed.parse::<u32>().ok()
  }
}

fn read_bool(parser: &Ini, section: &str, key: &str, default: bool) -> bool {
  parser
    .get(section, key)
    .and_then(|v| parse_bool(&v))
    .unwrap_or(default)
}

fn read_u32(parser: &Ini, section: &str, key: &str, default: u32) -> u32 {
  parser
    .get(section, key)
    .and_then(|v| parse_u32(&v))
    .unwrap_or(default)
}

fn read_string(parser: &Ini, section: &str, key: &str, default: &str) -> String {
  parser
    .get(section, key)
    .unwrap_or_else(|| default.to_string())
}

fn bool_to_string(val: bool) -> String {
  if val { "1".to_string() } else { "0".to_string() }
}

fn save_section(parser: &mut Ini, name: &str, data: Vec<(&str, String)>) {
  for (k, v) in data {
    parser.set(name, k, Some(v));
  }
}

pub fn load_segatoools_config(path: &Path) -> Result<SegatoolsConfig, ConfigError> {
  let mut parser = Ini::new();
  if path.exists() {
    parser
      .load(path.to_string_lossy().as_ref())
      .map_err(|e| ConfigError::Parse(e))?;
  }

  let mut cfg = SegatoolsConfig::default();

  // Populate present_sections
  if let Some(map) = parser.get_map() {
    cfg.present_sections = map.keys().map(|k| k.to_lowercase()).collect();
  }

  cfg.aimeio.path = read_string(&parser, "aimeio", "path", &cfg.aimeio.path);

  cfg.aime.enable = read_bool(&parser, "aime", "enable", cfg.aime.enable);
  cfg.aime.port_no = read_u32(&parser, "aime", "portNo", cfg.aime.port_no);
  cfg.aime.high_baud = read_bool(&parser, "aime", "highBaud", cfg.aime.high_baud);
  cfg.aime.gen = read_u32(&parser, "aime", "gen", cfg.aime.gen);
  cfg.aime.aime_path = read_string(&parser, "aime", "aimePath", &cfg.aime.aime_path);
  cfg.aime.aime_gen = read_bool(&parser, "aime", "aimeGen", cfg.aime.aime_gen);
  cfg.aime.felica_path = read_string(&parser, "aime", "felicaPath", &cfg.aime.felica_path);
  cfg.aime.felica_gen = read_bool(&parser, "aime", "felicaGen", cfg.aime.felica_gen);
  cfg.aime.scan = read_u32(&parser, "aime", "scan", cfg.aime.scan);
  cfg.aime.proxy_flag = read_u32(&parser, "aime", "proxyFlag", cfg.aime.proxy_flag);
  cfg.aime.authdata_path = read_string(&parser, "aime", "authdataPath", &cfg.aime.authdata_path);

  cfg.vfd.enable = read_bool(&parser, "vfd", "enable", cfg.vfd.enable);
  cfg.vfd.port_no = read_u32(&parser, "vfd", "portNo", cfg.vfd.port_no);
  cfg.vfd.utf_conversion = read_bool(&parser, "vfd", "utfConversion", cfg.vfd.utf_conversion);

  cfg.amvideo.enable = read_bool(&parser, "amvideo", "enable", cfg.amvideo.enable);

  cfg.clock.timezone = read_bool(&parser, "clock", "timezone", cfg.clock.timezone);
  cfg.clock.timewarp = read_bool(&parser, "clock", "timewarp", cfg.clock.timewarp);
  cfg.clock.writeable = read_bool(&parser, "clock", "writeable", cfg.clock.writeable);

  cfg.dns.default = read_string(&parser, "dns", "default", &cfg.dns.default);
  cfg.dns.title = read_string(&parser, "dns", "title", &cfg.dns.title);
  cfg.dns.router = read_string(&parser, "dns", "router", &cfg.dns.router);
  cfg.dns.startup = read_string(&parser, "dns", "startup", &cfg.dns.startup);
  cfg.dns.billing = read_string(&parser, "dns", "billing", &cfg.dns.billing);
  cfg.dns.aimedb = read_string(&parser, "dns", "aimedb", &cfg.dns.aimedb);
  cfg.dns.replace_host = read_bool(&parser, "dns", "replaceHost", cfg.dns.replace_host);
  cfg.dns.startup_port = read_u32(&parser, "dns", "startupPort", cfg.dns.startup_port);
  cfg.dns.billing_port = read_u32(&parser, "dns", "billingPort", cfg.dns.billing_port);
  cfg.dns.aimedb_port = read_u32(&parser, "dns", "aimedbPort", cfg.dns.aimedb_port);

  cfg.ds.enable = read_bool(&parser, "ds", "enable", cfg.ds.enable);
  cfg.ds.region = read_u32(&parser, "ds", "region", cfg.ds.region);
  cfg.ds.serial_no = read_string(&parser, "ds", "serialNo", &cfg.ds.serial_no);

  cfg.eeprom.enable = read_bool(&parser, "eeprom", "enable", cfg.eeprom.enable);
  cfg.eeprom.path = read_string(&parser, "eeprom", "path", &cfg.eeprom.path);

  cfg.gpio.enable = read_bool(&parser, "gpio", "enable", cfg.gpio.enable);
  cfg.gpio.sw1 = read_u32(&parser, "gpio", "sw1", cfg.gpio.sw1);
  cfg.gpio.sw2 = read_u32(&parser, "gpio", "sw2", cfg.gpio.sw2);
  cfg.gpio.dipsw1 = read_bool(&parser, "gpio", "dipsw1", cfg.gpio.dipsw1);
  cfg.gpio.dipsw2 = read_bool(&parser, "gpio", "dipsw2", cfg.gpio.dipsw2);
  cfg.gpio.dipsw3 = read_bool(&parser, "gpio", "dipsw3", cfg.gpio.dipsw3);
  cfg.gpio.dipsw4 = read_bool(&parser, "gpio", "dipsw4", cfg.gpio.dipsw4);
  cfg.gpio.dipsw5 = read_bool(&parser, "gpio", "dipsw5", cfg.gpio.dipsw5);
  cfg.gpio.dipsw6 = read_bool(&parser, "gpio", "dipsw6", cfg.gpio.dipsw6);
  cfg.gpio.dipsw7 = read_bool(&parser, "gpio", "dipsw7", cfg.gpio.dipsw7);
  cfg.gpio.dipsw8 = read_bool(&parser, "gpio", "dipsw8", cfg.gpio.dipsw8);

  cfg.gfx.enable = read_bool(&parser, "gfx", "enable", cfg.gfx.enable);
  cfg.gfx.windowed = read_bool(&parser, "gfx", "windowed", cfg.gfx.windowed);
  cfg.gfx.framed = read_bool(&parser, "gfx", "framed", cfg.gfx.framed);
  cfg.gfx.monitor = read_u32(&parser, "gfx", "monitor", cfg.gfx.monitor);
  cfg.gfx.dpi_aware = read_bool(&parser, "gfx", "dpiAware", cfg.gfx.dpi_aware);

  cfg.hwmon.enable = read_bool(&parser, "hwmon", "enable", cfg.hwmon.enable);

  cfg.jvs.enable = read_bool(&parser, "jvs", "enable", cfg.jvs.enable);
  cfg.jvs.foreground = read_bool(&parser, "jvs", "foreground", cfg.jvs.foreground);

  cfg.io4.enable = read_bool(&parser, "io4", "enable", cfg.io4.enable);
  cfg.io4.foreground = read_bool(&parser, "io4", "foreground", cfg.io4.foreground);
  cfg.io4.test = read_u32(&parser, "io4", "test", cfg.io4.test);
  cfg.io4.service = read_u32(&parser, "io4", "service", cfg.io4.service);
  cfg.io4.coin = read_u32(&parser, "io4", "coin", cfg.io4.coin);

  cfg.keychip.enable = read_bool(&parser, "keychip", "enable", cfg.keychip.enable);
  cfg.keychip.id = read_string(&parser, "keychip", "id", &cfg.keychip.id);
  cfg.keychip.game_id = read_string(&parser, "keychip", "gameId", &cfg.keychip.game_id);
  cfg.keychip.platform_id = read_string(&parser, "keychip", "platformId", &cfg.keychip.platform_id);
  cfg.keychip.region = read_u32(&parser, "keychip", "region", cfg.keychip.region);
  cfg.keychip.billing_ca = read_string(&parser, "keychip", "billingCa", &cfg.keychip.billing_ca);
  cfg.keychip.billing_pub = read_string(&parser, "keychip", "billingPub", &cfg.keychip.billing_pub);
  cfg.keychip.billing_type = read_u32(&parser, "keychip", "billingType", cfg.keychip.billing_type);
  cfg.keychip.system_flag = read_u32(&parser, "keychip", "systemFlag", cfg.keychip.system_flag);
  cfg.keychip.subnet = read_string(&parser, "keychip", "subnet", &cfg.keychip.subnet);

  cfg.netenv.enable = read_bool(&parser, "netenv", "enable", cfg.netenv.enable);
  cfg.netenv.addr_suffix = read_u32(&parser, "netenv", "addrSuffix", cfg.netenv.addr_suffix);
  cfg.netenv.router_suffix = read_u32(&parser, "netenv", "routerSuffix", cfg.netenv.router_suffix);
  cfg.netenv.mac_addr = read_string(&parser, "netenv", "macAddr", &cfg.netenv.mac_addr);

  cfg.pcbid.enable = read_bool(&parser, "pcbid", "enable", cfg.pcbid.enable);
  cfg.pcbid.serial_no = read_string(&parser, "pcbid", "serialNo", &cfg.pcbid.serial_no);

  cfg.sram.enable = read_bool(&parser, "sram", "enable", cfg.sram.enable);
  cfg.sram.path = read_string(&parser, "sram", "path", &cfg.sram.path);

  cfg.vfs.enable = read_bool(&parser, "vfs", "enable", cfg.vfs.enable);
  cfg.vfs.amfs = read_string(&parser, "vfs", "amfs", &cfg.vfs.amfs);
  cfg.vfs.appdata = read_string(&parser, "vfs", "appdata", &cfg.vfs.appdata);
  cfg.vfs.option = read_string(&parser, "vfs", "option", &cfg.vfs.option);

  cfg.epay.enable = read_bool(&parser, "epay", "enable", cfg.epay.enable);
  cfg.epay.hook = read_bool(&parser, "epay", "hook", cfg.epay.hook);

  cfg.openssl.enable = read_bool(&parser, "openssl", "enable", cfg.openssl.enable);
  cfg.openssl.override_flag = read_bool(&parser, "openssl", "override", cfg.openssl.override_flag);

  cfg.system.enable = read_bool(&parser, "system", "enable", cfg.system.enable);
  cfg.system.freeplay = read_bool(&parser, "system", "freeplay", cfg.system.freeplay);
  cfg.system.dipsw1 = read_bool(&parser, "system", "dipsw1", cfg.system.dipsw1);
  cfg.system.dipsw2 = read_bool(&parser, "system", "dipsw2", cfg.system.dipsw2);
  cfg.system.dipsw3 = read_bool(&parser, "system", "dipsw3", cfg.system.dipsw3);

  cfg.led15070.enable = read_bool(&parser, "led15070", "enable", cfg.led15070.enable);

  cfg.unity.enable = read_bool(&parser, "unity", "enable", cfg.unity.enable);
  cfg.unity.target_assembly = read_string(&parser, "unity", "targetAssembly", &cfg.unity.target_assembly);

  cfg.mai2io.path = read_string(&parser, "mai2io", "path", &cfg.mai2io.path);

  cfg.button.enable = read_bool(&parser, "button", "enable", cfg.button.enable);
  cfg.button.p1_btn1 = read_u32(&parser, "button", "p1Btn1", cfg.button.p1_btn1);
  cfg.button.p1_btn2 = read_u32(&parser, "button", "p1Btn2", cfg.button.p1_btn2);
  cfg.button.p1_btn3 = read_u32(&parser, "button", "p1Btn3", cfg.button.p1_btn3);
  cfg.button.p1_btn4 = read_u32(&parser, "button", "p1Btn4", cfg.button.p1_btn4);
  cfg.button.p1_btn5 = read_u32(&parser, "button", "p1Btn5", cfg.button.p1_btn5);
  cfg.button.p1_btn6 = read_u32(&parser, "button", "p1Btn6", cfg.button.p1_btn6);
  cfg.button.p1_btn7 = read_u32(&parser, "button", "p1Btn7", cfg.button.p1_btn7);
  cfg.button.p1_btn8 = read_u32(&parser, "button", "p1Btn8", cfg.button.p1_btn8);
  cfg.button.p1_select = read_u32(&parser, "button", "p1Select", cfg.button.p1_select);
  cfg.button.p2_btn1 = read_u32(&parser, "button", "p2Btn1", cfg.button.p2_btn1);
  cfg.button.p2_btn2 = read_u32(&parser, "button", "p2Btn2", cfg.button.p2_btn2);
  cfg.button.p2_btn3 = read_u32(&parser, "button", "p2Btn3", cfg.button.p2_btn3);
  cfg.button.p2_btn4 = read_u32(&parser, "button", "p2Btn4", cfg.button.p2_btn4);
  cfg.button.p2_btn5 = read_u32(&parser, "button", "p2Btn5", cfg.button.p2_btn5);
  cfg.button.p2_btn6 = read_u32(&parser, "button", "p2Btn6", cfg.button.p2_btn6);
  cfg.button.p2_btn7 = read_u32(&parser, "button", "p2Btn7", cfg.button.p2_btn7);
  cfg.button.p2_btn8 = read_u32(&parser, "button", "p2Btn8", cfg.button.p2_btn8);
  cfg.button.p2_select = read_u32(&parser, "button", "p2Select", cfg.button.p2_select);

  cfg.touch.p1_enable = read_bool(&parser, "touch", "p1Enable", cfg.touch.p1_enable);
  cfg.touch.p2_enable = read_bool(&parser, "touch", "p2Enable", cfg.touch.p2_enable);

  Ok(cfg)
}

pub fn save_segatoools_config(path: &Path, cfg: &SegatoolsConfig) -> Result<(), ConfigError> {
  if let Some(dir) = path.parent() {
    fs::create_dir_all(dir)?;
  }
  let mut ini = Ini::new();

  let should_save = |name: &str| -> bool {
    if cfg.present_sections.is_empty() {
      return true;
    }
    cfg.present_sections.contains(&name.to_lowercase())
  };

  if should_save("aimeio") {
    save_section(
      &mut ini,
      "aimeio",
      vec![("path", cfg.aimeio.path.clone())],
    );
  }

  if should_save("aime") {
    save_section(
      &mut ini,
      "aime",
      vec![
        ("enable", bool_to_string(cfg.aime.enable)),
        ("portNo", cfg.aime.port_no.to_string()),
        ("highBaud", bool_to_string(cfg.aime.high_baud)),
        ("gen", cfg.aime.gen.to_string()),
        ("aimePath", cfg.aime.aime_path.clone()),
        ("aimeGen", bool_to_string(cfg.aime.aime_gen)),
        ("felicaPath", cfg.aime.felica_path.clone()),
        ("felicaGen", bool_to_string(cfg.aime.felica_gen)),
        ("scan", cfg.aime.scan.to_string()),
        ("proxyFlag", cfg.aime.proxy_flag.to_string()),
        ("authdataPath", cfg.aime.authdata_path.clone()),
      ],
    );
  }

  if should_save("vfd") {
    save_section(
      &mut ini,
      "vfd",
      vec![
        ("enable", bool_to_string(cfg.vfd.enable)),
        ("portNo", cfg.vfd.port_no.to_string()),
        ("utfConversion", bool_to_string(cfg.vfd.utf_conversion)),
      ],
    );
  }

  if should_save("amvideo") {
    save_section(&mut ini, "amvideo", vec![("enable", bool_to_string(cfg.amvideo.enable))]);
  }

  if should_save("clock") {
    save_section(
      &mut ini,
      "clock",
      vec![
        ("timezone", bool_to_string(cfg.clock.timezone)),
        ("timewarp", bool_to_string(cfg.clock.timewarp)),
        ("writeable", bool_to_string(cfg.clock.writeable)),
      ],
    );
  }

  if should_save("dns") {
    save_section(
      &mut ini,
      "dns",
      vec![
        ("default", cfg.dns.default.clone()),
        ("title", cfg.dns.title.clone()),
        ("router", cfg.dns.router.clone()),
        ("startup", cfg.dns.startup.clone()),
        ("billing", cfg.dns.billing.clone()),
        ("aimedb", cfg.dns.aimedb.clone()),
        ("replaceHost", bool_to_string(cfg.dns.replace_host)),
        ("startupPort", cfg.dns.startup_port.to_string()),
        ("billingPort", cfg.dns.billing_port.to_string()),
        ("aimedbPort", cfg.dns.aimedb_port.to_string()),
      ],
    );
  }

  if should_save("ds") {
    save_section(
      &mut ini,
      "ds",
      vec![
        ("enable", bool_to_string(cfg.ds.enable)),
        ("region", cfg.ds.region.to_string()),
        ("serialNo", cfg.ds.serial_no.clone()),
      ],
    );
  }

  if should_save("eeprom") {
    save_section(
      &mut ini,
      "eeprom",
      vec![
        ("enable", bool_to_string(cfg.eeprom.enable)),
        ("path", cfg.eeprom.path.clone()),
      ],
    );
  }

  if should_save("gpio") {
    save_section(
      &mut ini,
      "gpio",
      vec![
        ("enable", bool_to_string(cfg.gpio.enable)),
        ("sw1", cfg.gpio.sw1.to_string()),
        ("sw2", cfg.gpio.sw2.to_string()),
        ("dipsw1", bool_to_string(cfg.gpio.dipsw1)),
        ("dipsw2", bool_to_string(cfg.gpio.dipsw2)),
        ("dipsw3", bool_to_string(cfg.gpio.dipsw3)),
        ("dipsw4", bool_to_string(cfg.gpio.dipsw4)),
        ("dipsw5", bool_to_string(cfg.gpio.dipsw5)),
        ("dipsw6", bool_to_string(cfg.gpio.dipsw6)),
        ("dipsw7", bool_to_string(cfg.gpio.dipsw7)),
        ("dipsw8", bool_to_string(cfg.gpio.dipsw8)),
      ],
    );
  }

  if should_save("gfx") {
    save_section(
      &mut ini,
      "gfx",
      vec![
        ("enable", bool_to_string(cfg.gfx.enable)),
        ("windowed", bool_to_string(cfg.gfx.windowed)),
        ("framed", bool_to_string(cfg.gfx.framed)),
        ("monitor", cfg.gfx.monitor.to_string()),
        ("dpiAware", bool_to_string(cfg.gfx.dpi_aware)),
      ],
    );
  }

  if should_save("hwmon") {
    save_section(&mut ini, "hwmon", vec![("enable", bool_to_string(cfg.hwmon.enable))]);
  }

  if should_save("jvs") {
    save_section(
      &mut ini,
      "jvs",
      vec![
        ("enable", bool_to_string(cfg.jvs.enable)),
        ("foreground", bool_to_string(cfg.jvs.foreground)),
      ],
    );
  }

  if should_save("io4") {
    save_section(
      &mut ini,
      "io4",
      vec![
        ("enable", bool_to_string(cfg.io4.enable)),
        ("foreground", bool_to_string(cfg.io4.foreground)),
        ("test", cfg.io4.test.to_string()),
        ("service", cfg.io4.service.to_string()),
        ("coin", cfg.io4.coin.to_string()),
      ],
    );
  }

  if should_save("keychip") {
    save_section(
      &mut ini,
      "keychip",
      vec![
        ("enable", bool_to_string(cfg.keychip.enable)),
        ("id", cfg.keychip.id.clone()),
        ("gameId", cfg.keychip.game_id.clone()),
        ("platformId", cfg.keychip.platform_id.clone()),
        ("region", cfg.keychip.region.to_string()),
        ("billingCa", cfg.keychip.billing_ca.clone()),
        ("billingPub", cfg.keychip.billing_pub.clone()),
        ("billingType", cfg.keychip.billing_type.to_string()),
        ("systemFlag", cfg.keychip.system_flag.to_string()),
        ("subnet", cfg.keychip.subnet.clone()),
      ],
    );
  }

  if should_save("netenv") {
    save_section(
      &mut ini,
      "netenv",
      vec![
        ("enable", bool_to_string(cfg.netenv.enable)),
        ("addrSuffix", cfg.netenv.addr_suffix.to_string()),
        ("routerSuffix", cfg.netenv.router_suffix.to_string()),
        ("macAddr", cfg.netenv.mac_addr.clone()),
      ],
    );
  }

  if should_save("pcbid") {
    save_section(
      &mut ini,
      "pcbid",
      vec![
        ("enable", bool_to_string(cfg.pcbid.enable)),
        ("serialNo", cfg.pcbid.serial_no.clone()),
      ],
    );
  }

  if should_save("sram") {
    save_section(
      &mut ini,
      "sram",
      vec![
        ("enable", bool_to_string(cfg.sram.enable)),
        ("path", cfg.sram.path.clone()),
      ],
    );
  }

  if should_save("vfs") {
    save_section(
      &mut ini,
      "vfs",
      vec![
        ("enable", bool_to_string(cfg.vfs.enable)),
        ("amfs", cfg.vfs.amfs.clone()),
        ("appdata", cfg.vfs.appdata.clone()),
        ("option", cfg.vfs.option.clone()),
      ],
    );
  }

  if should_save("epay") {
    save_section(
      &mut ini,
      "epay",
      vec![
        ("enable", bool_to_string(cfg.epay.enable)),
        ("hook", bool_to_string(cfg.epay.hook)),
      ],
    );
  }

  if should_save("openssl") {
    save_section(
      &mut ini,
      "openssl",
      vec![
        ("enable", bool_to_string(cfg.openssl.enable)),
        ("override", bool_to_string(cfg.openssl.override_flag)),
      ],
    );
  }

  if should_save("system") {
    save_section(
      &mut ini,
      "system",
      vec![
        ("enable", bool_to_string(cfg.system.enable)),
        ("freeplay", bool_to_string(cfg.system.freeplay)),
        ("dipsw1", bool_to_string(cfg.system.dipsw1)),
        ("dipsw2", bool_to_string(cfg.system.dipsw2)),
        ("dipsw3", bool_to_string(cfg.system.dipsw3)),
      ],
    );
  }

  if should_save("led15070") {
    save_section(
      &mut ini,
      "led15070",
      vec![("enable", bool_to_string(cfg.led15070.enable))],
    );
  }

  if should_save("unity") {
    save_section(
      &mut ini,
      "unity",
      vec![
        ("enable", bool_to_string(cfg.unity.enable)),
        ("targetAssembly", cfg.unity.target_assembly.clone()),
      ],
    );
  }

  if should_save("mai2io") {
    save_section(
      &mut ini,
      "mai2io",
      vec![("path", cfg.mai2io.path.clone())],
    );
  }

  if should_save("button") {
    save_section(
      &mut ini,
      "button",
      vec![
        ("enable", bool_to_string(cfg.button.enable)),
        ("p1Btn1", cfg.button.p1_btn1.to_string()),
        ("p1Btn2", cfg.button.p1_btn2.to_string()),
        ("p1Btn3", cfg.button.p1_btn3.to_string()),
        ("p1Btn4", cfg.button.p1_btn4.to_string()),
        ("p1Btn5", cfg.button.p1_btn5.to_string()),
        ("p1Btn6", cfg.button.p1_btn6.to_string()),
        ("p1Btn7", cfg.button.p1_btn7.to_string()),
        ("p1Btn8", cfg.button.p1_btn8.to_string()),
        ("p1Select", cfg.button.p1_select.to_string()),
        ("p2Btn1", cfg.button.p2_btn1.to_string()),
        ("p2Btn2", cfg.button.p2_btn2.to_string()),
        ("p2Btn3", cfg.button.p2_btn3.to_string()),
        ("p2Btn4", cfg.button.p2_btn4.to_string()),
        ("p2Btn5", cfg.button.p2_btn5.to_string()),
        ("p2Btn6", cfg.button.p2_btn6.to_string()),
        ("p2Btn7", cfg.button.p2_btn7.to_string()),
        ("p2Btn8", cfg.button.p2_btn8.to_string()),
        ("p2Select", cfg.button.p2_select.to_string()),
      ],
    );
  }

  if should_save("touch") {
    save_section(
      &mut ini,
      "touch",
      vec![
        ("p1Enable", bool_to_string(cfg.touch.p1_enable)),
        ("p2Enable", bool_to_string(cfg.touch.p2_enable)),
      ],
    );
  }

  ini
    .write(path.to_string_lossy().as_ref())
    .map_err(ConfigError::Io)?;
  Ok(())
}

pub fn default_segatoools_config() -> SegatoolsConfig {
  SegatoolsConfig::default()
}
