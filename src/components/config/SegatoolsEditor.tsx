import SectionAccordion from './SectionAccordion';
import OptionField from './OptionField';
import { SegatoolsConfig } from '../../types/config';

type FieldSpec = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'checkbox';
  helper?: string;
  description?: string;
};

type SectionSpec = {
  key: keyof SegatoolsConfig;
  title: string;
  fields: FieldSpec[];
};

type Props = {
  config: SegatoolsConfig;
  onChange: (next: SegatoolsConfig) => void;
};

const sections: SectionSpec[] = [
  { 
    key: 'aimeio', 
    title: 'aimeio', 
    fields: [
      { name: 'path', label: 'Driver path', type: 'text', description: 'Specify a path for a third-party card reader driver DLL. Default is empty (use built-in emulation based on text files and keyboard input).' }
    ] 
  },
  {
    key: 'aime',
    title: 'aime',
    fields: [
      { name: 'enable', label: 'Enable Aime emulation', type: 'checkbox', description: 'Enable Aime card reader assembly emulation. Disable to use a real SEGA Aime reader.' },
      { name: 'portNo', label: 'COM port', type: 'number', description: 'Sets the COM port to use for the aime card reader assembly.' },
      { name: 'highBaud', label: 'High baud (115200)', type: 'checkbox', description: 'Enables the high baudrate of the Aime card reader to be 115200 (instead of 38400). Required for some games (e.g. Chunithm).' },
      { name: 'gen', label: 'Generation', type: 'number', description: 'Changes the Aime card reader generation (1, 2, or 3).' },
      { name: 'aimePath', label: 'Aime card file', type: 'text', description: 'Path to a text file containing a classic Aime IC card ID.' },
      { name: 'aimeGen', label: 'Generate Aime ID', type: 'checkbox', description: 'Whether to generate a random AiMe ID if the file at aimePath does not exist.' },
      { name: 'felicaPath', label: 'FeliCa file', type: 'text', description: 'Path to a text file containing a FeliCa e-cash card IDm serial number.' },
      { name: 'felicaGen', label: 'Generate FeliCa ID', type: 'checkbox', description: 'Whether to generate a random FeliCa ID if the file at felicaPath does not exist.' },
      { name: 'scan', label: 'Scan key (VK code)', type: 'number', description: 'Virtual-key code. If this button is held then the emulated IC card reader emulates an IC card in its proximity.' },
      { name: 'proxyFlag', label: 'Proxy flag', type: 'number' },
      { name: 'authdataPath', label: 'Auth data path', type: 'text' }
    ]
  },
  {
    key: 'vfd',
    title: 'vfd',
    fields: [
      { name: 'enable', label: 'Enable VFD emulation', type: 'checkbox', description: 'Enable VFD emulation. Disable to use a real VFD GP1232A02A FUTABA assembly.' },
      { name: 'portNo', label: 'COM port', type: 'number', description: 'Sets the COM port to use for the VFD.' },
      { name: 'utfConversion', label: 'Convert to UTF', type: 'checkbox', description: 'Converts the strings from the VFD from their respective encoding to UTF.' }
    ]
  },
  { key: 'amvideo', title: 'amvideo', fields: [{ name: 'enable', label: 'Enable amvideo stub', type: 'checkbox', description: 'Enable stub amvideo.dll. Disable to use a real amvideo.dll build.' }] },
  {
    key: 'clock',
    title: 'clock',
    fields: [
      { name: 'timezone', label: 'Force JST timezone', type: 'checkbox', description: 'Make the system time zone appear to be JST. SEGA games malfunction if the system time zone is not JST.' },
      { name: 'timewarp', label: 'Time warp', type: 'checkbox', description: 'Experimental time-of-day warping hook that skips over the hardcoded server maintenance period.' },
      { name: 'writeable', label: 'Allow clock writes', type: 'checkbox', description: 'Allow game to adjust system clock and time zone settings.' }
    ]
  },
  {
    key: 'dns',
    title: 'dns',
    fields: [
      { name: 'default', label: 'Default host', type: 'text', description: 'Controls hostname of all of the common network services servers.' },
      { name: 'title', label: 'Title server', type: 'text', description: 'Rewrites the title server hostname for certain games.' },
      { name: 'router', label: 'Router override', type: 'text', description: 'Overrides the target of the tenporouter.loc and bbrouter.loc hostname lookups.' },
      { name: 'startup', label: 'Startup host', type: 'text', description: 'Overrides the target of the naominet.jp host lookup.' },
      { name: 'billing', label: 'Billing host', type: 'text', description: 'Overrides the target of the ib.naominet.jp host lookup.' },
      { name: 'aimedb', label: 'AimeDB host', type: 'text', description: 'Overrides the target of the aime.naominet.jp host lookup.' },
      { name: 'replaceHost', label: 'Replace HTTP Host header', type: 'checkbox', description: 'Replace the HOST field in HTTP request headers with the settings above.' },
      { name: 'startupPort', label: 'Startup port', type: 'number', description: 'Overrides the port of connections to the startup server.' },
      { name: 'billingPort', label: 'Billing port', type: 'number', description: 'Overrides the port of connections to the billing server.' },
      { name: 'aimedbPort', label: 'AimeDB port', type: 'number', description: 'Overrides the port of connections to the aimedb server.' }
    ]
  },
  {
    key: 'ds',
    title: 'ds',
    fields: [
      { name: 'enable', label: 'Enable DS EEPROM', type: 'checkbox', description: 'Enable DS EEPROM emulation. Disable to use the DS EEPROM chip on a real AMEX.' },
      { name: 'region', label: 'Region mask', type: 'number', description: 'AMEX Board region code (1: Japan, 4: Export, 8: China).' },
      { name: 'serialNo', label: 'MAIN ID', type: 'text', description: '"MAIN ID" serial number.' }
    ]
  },
  {
    key: 'eeprom',
    title: 'eeprom',
    fields: [
      { name: 'enable', label: 'Enable EEPROM', type: 'checkbox', description: 'Enable bulk EEPROM emulation. Disable to use the bulk EEPROM chip on a real AMEX.' },
      { name: 'path', label: 'EEPROM path', type: 'text', description: 'Path to the storage file for EEPROM emulation.' }
    ]
  },
  {
    key: 'gpio',
    title: 'gpio',
    fields: [
      { name: 'enable', label: 'Enable GPIO', type: 'checkbox', description: 'Enable GPIO emulation. Disable to use the GPIO controller on a real AMEX.' },
      { name: 'sw1', label: 'SW1 key', type: 'number', description: 'Keyboard binding for Nu chassis SW1 button (alternative Test).' },
      { name: 'sw2', label: 'SW2 key', type: 'number', description: 'Keyboard binding for Nu chassis SW2 button (alternative Service).' },
      { name: 'dipsw1', label: 'DIP 1', type: 'checkbox', description: 'Nu chassis DIP switch 1.' },
      { name: 'dipsw2', label: 'DIP 2', type: 'checkbox', description: 'Nu chassis DIP switch 2.' },
      { name: 'dipsw3', label: 'DIP 3', type: 'checkbox', description: 'Nu chassis DIP switch 3.' },
      { name: 'dipsw4', label: 'DIP 4', type: 'checkbox', description: 'Nu chassis DIP switch 4.' },
      { name: 'dipsw5', label: 'DIP 5', type: 'checkbox', description: 'Nu chassis DIP switch 5.' },
      { name: 'dipsw6', label: 'DIP 6', type: 'checkbox', description: 'Nu chassis DIP switch 6.' },
      { name: 'dipsw7', label: 'DIP 7', type: 'checkbox', description: 'Nu chassis DIP switch 7.' },
      { name: 'dipsw8', label: 'DIP 8', type: 'checkbox', description: 'Nu chassis DIP switch 8.' }
    ]
  },
  {
    key: 'gfx',
    title: 'gfx',
    fields: [
      { name: 'enable', label: 'Enable graphics hooks', type: 'checkbox', description: 'Enables graphic hooks.' },
      { name: 'windowed', label: 'Force windowed', type: 'checkbox', description: 'Force the game to run windowed.' },
      { name: 'framed', label: 'Add frame in windowed', type: 'checkbox', description: 'Add a frame to the game window if running windowed.' },
      { name: 'monitor', label: 'Monitor index', type: 'number', description: 'Select the monitor to run the game on. (Fullscreen only, 0 = primary screen)' },
      { name: 'dpiAware', label: 'DPI aware', type: 'checkbox', description: 'Sets the game to be DPI-aware. Prevents Windows scaling.' }
    ]
  },
  { key: 'hwmon', title: 'hwmon', fields: [{ name: 'enable', label: 'Enable hardware monitor', type: 'checkbox', description: 'Enable hwmon emulation. Disable to use the real hwmon driver.' }] },
  {
    key: 'jvs',
    title: 'jvs',
    fields: [
      { name: 'enable', label: 'Enable JVS', type: 'checkbox', description: 'Enable JVS port emulation. Disable to use the JVS port on a real AMEX.' },
      { name: 'foreground', label: 'Input only when focused', type: 'checkbox', description: 'Only enables input when the game\'s main window is focused.' }
    ]
  },
  {
    key: 'io4',
    title: 'io4',
    fields: [
      { name: 'enable', label: 'Enable IO4', type: 'checkbox', description: 'Enable IO4 port emulation. Disable to use the IO4 port on a real ALLS.' },
      { name: 'foreground', label: 'Input only when focused', type: 'checkbox', description: 'Only enables input when the game\'s main window is focused.' },
      { name: 'test', label: 'Test key', type: 'number', description: 'Test button virtual-key code.' },
      { name: 'service', label: 'Service key', type: 'number', description: 'Service button virtual-key code.' },
      { name: 'coin', label: 'Coin key', type: 'number', description: 'Keyboard button to increment coin counter.' }
    ]
  },
  {
    key: 'keychip',
    title: 'keychip',
    fields: [
      { name: 'enable', label: 'Enable keychip emulation', type: 'checkbox', description: 'Enable keychip emulation. Disable to use a real keychip.' },
      { name: 'id', label: 'Keychip ID', type: 'text', description: 'Keychip serial number.' },
      { name: 'gameId', label: 'Game ID', type: 'text', description: 'Override the game\'s four-character model code.' },
      { name: 'platformId', label: 'Platform ID', type: 'text', description: 'Override the game\'s four-character platform code.' },
      { name: 'region', label: 'Region mask', type: 'number', description: 'Override the keychip\'s region code.' },
      { name: 'billingCa', label: 'Billing CA path', type: 'text', description: 'Set the billing certificate path.' },
      { name: 'billingPub', label: 'Billing public key path', type: 'text', description: 'Set the actual keychip RSA public key path.' },
      { name: 'billingType', label: 'Billing type', type: 'number', description: 'Sets the billing type (1 = rental, 0 = purchase).' },
      { name: 'systemFlag', label: 'System flag', type: 'number', description: 'An 8-bit bitfield of unclear meaning.' },
      { name: 'subnet', label: 'Subnet', type: 'text', description: 'The LAN IP range that the game will expect.' }
    ]
  },
  {
    key: 'netenv',
    title: 'netenv',
    fields: [
      { name: 'enable', label: 'Enable network virtualization', type: 'checkbox', description: 'Enable network environment virtualization.' },
      { name: 'addrSuffix', label: 'Address suffix', type: 'number', description: 'The final octet of the local host\'s IP address on the virtualized subnet.' },
      { name: 'routerSuffix', label: 'Gateway suffix', type: 'number', description: 'The final octet of the default gateway\'s IP address on the virtualized subnet.' },
      { name: 'macAddr', label: 'MAC address', type: 'text', description: 'The MAC address of the virtualized Ethernet adapter.' }
    ]
  },
  {
    key: 'pcbid',
    title: 'pcbid',
    fields: [
      { name: 'enable', label: 'Enable hostname virtualization', type: 'checkbox', description: 'Enable Windows host name virtualization.' },
      { name: 'serialNo', label: 'Serial number', type: 'text', description: 'Set the Windows host name. This should be an ALLS MAIN ID.' }
    ]
  },
  {
    key: 'sram',
    title: 'sram',
    fields: [
      { name: 'enable', label: 'Enable SRAM emulation', type: 'checkbox', description: 'Enable SRAM emulation. Disable to use the SRAM on a real AMEX.' },
      { name: 'path', label: 'SRAM path', type: 'text', description: 'Path to the storage file for SRAM emulation.' }
    ]
  },
  {
    key: 'vfs',
    title: 'vfs',
    fields: [
      { name: 'enable', label: 'Enable path redirection', type: 'checkbox', description: 'Enable path redirection.' },
      { name: 'amfs', label: 'AMFS path', type: 'text', description: 'Configure the location of the SEGA AMFS volume.' },
      { name: 'appdata', label: 'APPDATA path', type: 'text', description: 'Configure the location of the SEGA "APPDATA" volume.' },
      { name: 'option', label: 'Option path', type: 'text', description: 'Configure the location of the "Option" data mount point.' }
    ]
  },
  {
    key: 'epay',
    title: 'epay',
    fields: [
      { name: 'enable', label: 'Enable E-pay', type: 'checkbox', description: 'Enables the Thinca emulation.' },
      { name: 'hook', label: 'Enable hook', type: 'checkbox', description: 'Enables hooking of respective Thinca DLL functions to emulate the existence of E-Money.' }
    ]
  },
  {
    key: 'openssl',
    title: 'openssl',
    fields: [
      { name: 'enable', label: 'Enable OpenSSL hook', type: 'checkbox', description: 'Enables the OpenSSL hook to fix the SHA extension bug on Intel CPUs.' },
      { name: 'override', label: 'Force override', type: 'checkbox', description: 'Enables the override to always hook the OpenSSL env variable.' }
    ]
  }
];

function SegatoolsEditor({ config, onChange }: Props) {
  const updateValue = (section: keyof SegatoolsConfig, field: string, value: any) => {
    onChange({
      ...config,
      [section]: {
        ...(config as any)[section],
        [field]: value
      }
    });
  };

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {sections.map((section) => (
        <SectionAccordion key={section.key as string} title={section.title}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px 24px', alignItems: 'start' }}>
            {section.fields.map((field) => (
              <OptionField
                key={`${section.key}-${field.name}`}
                label={field.label}
                type={field.type}
                value={(config as any)[section.key][field.name]}
                helper={field.helper}
                description={field.description}
                onChange={(val) => updateValue(section.key, field.name, val)}
              />
            ))}
          </div>
        </SectionAccordion>
      ))}
    </div>
  );
}

export default SegatoolsEditor;
