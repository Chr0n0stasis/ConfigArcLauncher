import SectionAccordion from './SectionAccordion';
import OptionField from './OptionField';
import { SegatoolsConfig } from '../../types/config';

type FieldSpec = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'checkbox';
  helper?: string;
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
  { key: 'aimeio', title: 'aimeio', fields: [{ name: 'path', label: 'Driver path', type: 'text' }] },
  {
    key: 'aime',
    title: 'aime',
    fields: [
      { name: 'enable', label: 'Enable Aime emulation', type: 'checkbox' },
      { name: 'portNo', label: 'COM port', type: 'number' },
      { name: 'highBaud', label: 'High baud (115200)', type: 'checkbox' },
      { name: 'gen', label: 'Generation', type: 'number' },
      { name: 'aimePath', label: 'Aime card file', type: 'text' },
      { name: 'aimeGen', label: 'Generate Aime ID', type: 'checkbox' },
      { name: 'felicaPath', label: 'FeliCa file', type: 'text' },
      { name: 'felicaGen', label: 'Generate FeliCa ID', type: 'checkbox' },
      { name: 'scan', label: 'Scan key (VK code)', type: 'number' },
      { name: 'proxyFlag', label: 'Proxy flag', type: 'number' },
      { name: 'authdataPath', label: 'Auth data path', type: 'text' }
    ]
  },
  {
    key: 'vfd',
    title: 'vfd',
    fields: [
      { name: 'enable', label: 'Enable VFD emulation', type: 'checkbox' },
      { name: 'portNo', label: 'COM port', type: 'number' },
      { name: 'utfConversion', label: 'Convert to UTF', type: 'checkbox' }
    ]
  },
  { key: 'amvideo', title: 'amvideo', fields: [{ name: 'enable', label: 'Enable amvideo stub', type: 'checkbox' }] },
  {
    key: 'clock',
    title: 'clock',
    fields: [
      { name: 'timezone', label: 'Force JST timezone', type: 'checkbox' },
      { name: 'timewarp', label: 'Time warp', type: 'checkbox' },
      { name: 'writeable', label: 'Allow clock writes', type: 'checkbox' }
    ]
  },
  {
    key: 'dns',
    title: 'dns',
    fields: [
      { name: 'default', label: 'Default host', type: 'text' },
      { name: 'title', label: 'Title server', type: 'text' },
      { name: 'router', label: 'Router override', type: 'text' },
      { name: 'startup', label: 'Startup host', type: 'text' },
      { name: 'billing', label: 'Billing host', type: 'text' },
      { name: 'aimedb', label: 'AimeDB host', type: 'text' },
      { name: 'replaceHost', label: 'Replace HTTP Host header', type: 'checkbox' },
      { name: 'startupPort', label: 'Startup port', type: 'number' },
      { name: 'billingPort', label: 'Billing port', type: 'number' },
      { name: 'aimedbPort', label: 'AimeDB port', type: 'number' }
    ]
  },
  {
    key: 'ds',
    title: 'ds',
    fields: [
      { name: 'enable', label: 'Enable DS EEPROM', type: 'checkbox' },
      { name: 'region', label: 'Region mask', type: 'number' },
      { name: 'serialNo', label: 'MAIN ID', type: 'text' }
    ]
  },
  {
    key: 'eeprom',
    title: 'eeprom',
    fields: [
      { name: 'enable', label: 'Enable EEPROM', type: 'checkbox' },
      { name: 'path', label: 'EEPROM path', type: 'text' }
    ]
  },
  {
    key: 'gpio',
    title: 'gpio',
    fields: [
      { name: 'enable', label: 'Enable GPIO', type: 'checkbox' },
      { name: 'sw1', label: 'SW1 key', type: 'number' },
      { name: 'sw2', label: 'SW2 key', type: 'number' },
      { name: 'dipsw1', label: 'DIP 1', type: 'checkbox' },
      { name: 'dipsw2', label: 'DIP 2', type: 'checkbox' },
      { name: 'dipsw3', label: 'DIP 3', type: 'checkbox' },
      { name: 'dipsw4', label: 'DIP 4', type: 'checkbox' },
      { name: 'dipsw5', label: 'DIP 5', type: 'checkbox' },
      { name: 'dipsw6', label: 'DIP 6', type: 'checkbox' },
      { name: 'dipsw7', label: 'DIP 7', type: 'checkbox' },
      { name: 'dipsw8', label: 'DIP 8', type: 'checkbox' }
    ]
  },
  {
    key: 'gfx',
    title: 'gfx',
    fields: [
      { name: 'enable', label: 'Enable graphics hooks', type: 'checkbox' },
      { name: 'windowed', label: 'Force windowed', type: 'checkbox' },
      { name: 'framed', label: 'Add frame in windowed', type: 'checkbox' },
      { name: 'monitor', label: 'Monitor index', type: 'number' },
      { name: 'dpiAware', label: 'DPI aware', type: 'checkbox' }
    ]
  },
  { key: 'hwmon', title: 'hwmon', fields: [{ name: 'enable', label: 'Enable hardware monitor', type: 'checkbox' }] },
  {
    key: 'jvs',
    title: 'jvs',
    fields: [
      { name: 'enable', label: 'Enable JVS', type: 'checkbox' },
      { name: 'foreground', label: 'Input only when focused', type: 'checkbox' }
    ]
  },
  {
    key: 'io4',
    title: 'io4',
    fields: [
      { name: 'enable', label: 'Enable IO4', type: 'checkbox' },
      { name: 'foreground', label: 'Input only when focused', type: 'checkbox' },
      { name: 'test', label: 'Test key', type: 'number' },
      { name: 'service', label: 'Service key', type: 'number' },
      { name: 'coin', label: 'Coin key', type: 'number' }
    ]
  },
  {
    key: 'keychip',
    title: 'keychip',
    fields: [
      { name: 'enable', label: 'Enable keychip emulation', type: 'checkbox' },
      { name: 'id', label: 'Keychip ID', type: 'text' },
      { name: 'gameId', label: 'Game ID', type: 'text' },
      { name: 'platformId', label: 'Platform ID', type: 'text' },
      { name: 'region', label: 'Region mask', type: 'number' },
      { name: 'billingCa', label: 'Billing CA path', type: 'text' },
      { name: 'billingPub', label: 'Billing public key path', type: 'text' },
      { name: 'billingType', label: 'Billing type', type: 'number' },
      { name: 'systemFlag', label: 'System flag', type: 'number' },
      { name: 'subnet', label: 'Subnet', type: 'text' }
    ]
  },
  {
    key: 'netenv',
    title: 'netenv',
    fields: [
      { name: 'enable', label: 'Enable network virtualization', type: 'checkbox' },
      { name: 'addrSuffix', label: 'Address suffix', type: 'number' },
      { name: 'routerSuffix', label: 'Gateway suffix', type: 'number' },
      { name: 'macAddr', label: 'MAC address', type: 'text' }
    ]
  },
  {
    key: 'pcbid',
    title: 'pcbid',
    fields: [
      { name: 'enable', label: 'Enable hostname virtualization', type: 'checkbox' },
      { name: 'serialNo', label: 'Serial number', type: 'text' }
    ]
  },
  {
    key: 'sram',
    title: 'sram',
    fields: [
      { name: 'enable', label: 'Enable SRAM emulation', type: 'checkbox' },
      { name: 'path', label: 'SRAM path', type: 'text' }
    ]
  },
  {
    key: 'vfs',
    title: 'vfs',
    fields: [
      { name: 'enable', label: 'Enable path redirection', type: 'checkbox' },
      { name: 'amfs', label: 'AMFS path', type: 'text' },
      { name: 'appdata', label: 'APPDATA path', type: 'text' },
      { name: 'option', label: 'Option path', type: 'text' }
    ]
  },
  {
    key: 'epay',
    title: 'epay',
    fields: [
      { name: 'enable', label: 'Enable E-pay', type: 'checkbox' },
      { name: 'hook', label: 'Enable hook', type: 'checkbox' }
    ]
  },
  {
    key: 'openssl',
    title: 'openssl',
    fields: [
      { name: 'enable', label: 'Enable OpenSSL hook', type: 'checkbox' },
      { name: 'override', label: 'Force override', type: 'checkbox' }
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
          <div style={{ display: 'grid', gap: 8 }}>
            {section.fields.map((field) => (
              <OptionField
                key={`${section.key}-${field.name}`}
                label={field.label}
                type={field.type}
                value={(config as any)[section.key][field.name]}
                helper={field.helper}
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
