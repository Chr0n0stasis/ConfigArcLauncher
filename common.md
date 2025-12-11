# Segatools common configuration settings

This file describes configuration settings for Segatools that are common to
all games.

Keyboard binding settings use
[Virtual-Key Codes](https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes).

## Config Path
The default file path for config file is `./segatools.ini`.

You can modify environment variable `SEGATOOLS_CONFIG_PATH` to another path.

For example, You can have another `launch.bat` with following code in it,
Then you can copy `segatools.ini` to `another_config.ini` but with different dns host in it
```bat
set SEGATOOLS_CONFIG_PATH=.\another_config.ini
```

## `[aimeio]`

Controls the card reader driver.

### `path`

Specify a path for a third-party card reader driver DLL. Default is empty
(use built-in emulation based on text files and keyboard input).

In previous versions of Segatools this was accomplished by replacing the
AIMEIO.DLL file that came with Segatools. Segatools no longer ships with a
separate AIMEIO.DLL file (its functionality is now built into the various hook
DLLs).

## `[aime]`

Controls emulation of the Aime card reader assembly.

### `enable`

Default: `1`

Enable Aime card reader assembly emulation. Disable to use a real SEGA Aime
reader (COM port number varies by game).

### `portNo`

Default: (game specific)

Sets the COM port to use for the aime card reader assembly.

### `highBaud`

Default: `1`

Enables the high baudrate of the Aime card reader to be 115200 (instead of 38400).
This is required for some games (e.g. Chunithm) but not others (e.g. WACCA).

### `gen`

Default: `1`

Changes the Aime card reader generation, this will also change the LED info 
provided for the game.

- `1`: TN32MSEC003S H/W Ver3.0 / TN32MSEC003S F/W Ver1.2
- `2`: 837-15286 / 94
- `3`: 837-15396 / 94

### `aimePath`

Default: `DEVICE\aime.txt`

Path to a text file containing a classic Aime IC card ID.

### `aimeGen`

Default: `1`

Whether to generate a random AiMe ID if the file at `aimePath` does not
exist.

### `felicaPath`

Default: `DEVICE\felica.txt`

Path to a text file containing a FeliCa e-cash card IDm serial number.

### `felicaGen`

Default: `0`

Whether to generate a random FeliCa ID if the file at `felicaPath` does not
exist.

### `scan`

Default: `0x0D` (`VK_RETURN`)

Virtual-key code. If this button is **held** then the emulated IC card reader
emulates an IC card in its proximity. A variety of different IC cards can be
emulated; the exact choice of card that is emulated depends on the presence or
absence of the configured card ID files.

### `proxyFlag`

Default: `2`

The "proxy flag" of the emulated Thinca authentication card. This should be 2 if no proxy is used, and 3 if it is. Invalid values will break Thinca authentication card reading. This information can be obtained by checking for the presence of "use_proxy: true" `tfps-res-pro\env.json`.

### `authdataPath`

Default: `DEVICE\authdata.bin`

Path to the binary file containing data for a Thinca authentication card (see `emoney.txt`)

## `[vfd]`

Controls emulation of the VFD GP1232A02A FUTABA assembly.

### `enable`

Default: `1`

Enable VFD emulation. Disable to use a real VFD
GP1232A02A FUTABA assembly (COM port number varies by game).

### `portNo`

Default: (game specific)

Sets the COM port to use for the VFD.

### `utfConversion`

Default: `0`

Converts the strings from the VFD from their respective encoding to UTF, so console output will display as it should on non-Japanese locales.

## `[amvideo]`

Controls the `amvideo.dll` stub built into Segatools. This is a DLL that is
normally present on the SEGA operating system image which is responsible for
changing screen resolution and orientation.

### `enable`

Default: `1`

Enable stub `amvideo.dll`. Disable to use a real `amvideo.dll` build. Note that
you must have the correct registry settings installed and you must use the
version of `amvideo.dll` that matches your GPU vendor (since these DLLs make
use of vendor-specific APIs).

## `[clock]`

Controls hooks for Windows time-of-day APIs.

### `timezone`

Default: `1`

Make the system time zone appear to be JST. SEGA games malfunction in strange
ways if the system time zone is not JST. There should not be any reason to
disable this hook other than possible implementation bugs, but the option is
provided if you need it.

### `timewarp`

Default: `0`

Experimental time-of-day warping hook that skips over the hardcoded server
maintenance period. Causes an incorrect in-game time-of-day to be reported.
Better solutions for this problem exist and this feature will probably be
removed soon.

### `writeable`

Default: `0`

Allow game to adjust system clock and time zone settings. This should normally
be left at `0`, but the option is provided if you need it.

## `[dns]`

Controls redirection of network server hostname lookups

### `default`

Default: `localhost`

Controls hostname of all of the common network services servers, unless
overriden by a specific setting below. Most users will only need to change this
setting. Also, loopback addresses are specifically checked for and rejected by
the games themselves; this needs to be a LAN or WAN IP (or a hostname that
resolves to one).

### `title`

Default: `title`

Leave it as `title` to use the title server returned by ALL.Net. Rewrites 
the title server hostname for certain games, such as crossbeats REV.

### `router`

Default: Empty string (i.e. use value from `default` setting)

Overrides the target of the `tenporouter.loc` and `bbrouter.loc` hostname
lookups.

### `startup`

Default: Empty string (i.e. use value from `default` setting)

Overrides the target of the `naominet.jp` host lookup.

### `billing`

Default: Empty string (i.e. use value from `default` setting)

Overrides the target of the `ib.naominet.jp` host lookup.

### `aimedb`

Default: Empty string (i.e. use value from `default` setting)

Overrides the target of the `aime.naominet.jp` host lookup.

### `replaceHost`

Default: `0`

Replace the HOST field in HTTP request headers with the settings above. This may help bypass network restrictions in some regions.

### `startupPort`

Default: `0` (i.e. no operation will perform)

Overrides the port of connections to the `startup` server. The current implementation affects every TCP connection to the port 80.

### `billingPort`

Default: `0` (i.e. no operation will perform)

Overrides the port of connections to the `billing` server. The current implementation affects every TCP connection to the port 8443.

### `aimedbPort`

Default: `0` (i.e. no operation will perform)

Overrides the port of connections to the `aimedb` server. The current implementation affects every TCP connection to the port 22345.

## `[ds]`

Controls emulation of the "DS (Dallas Semiconductor) EEPROM" chip on the AMEX
PCIe board. This is a small (32 byte) EEPROM that contains serial number and
region code information. It is not normally written to outside of inital
factory provisioning of a Sega Nu.

### `enable`

Default: `1`

Enable DS EEPROM emulation. Disable to use the DS EEPROM chip on a real AMEX.

### `region`

Default: `1`

AMEX Board region code. This appears to be a bit mask?

- `1`: Japan
- `2`: USA? (Dead code, not used)
- `4`: Export
- `8`: China

### `serialNo`

Default `AAVE-01A99999999`

"MAIN ID" serial number. First three characters are hardware series:

- `AAV`: Nu-series
- `AAW`: NuSX-series
- `ACA`: ALLS-series

## `[eeprom]`

Controls emulation of the bulk EEPROM on the AMEX PCIe board. This chip stores
status and configuration information.

### `enable`

Default: `1`

Enable bulk EEPROM emulation. Disable to use the bulk EEPROM chip on a real
AMEX.

### `path`

Default: `DEVICE\eeprom.bin`

Path to the storage file for EEPROM emulation. This file is automatically
created and initialized with a suitable number of zero bytes if it does not
already exist.

## `[gpio]`

Configure emulation of the AMEX PCIe GPIO (General Purpose Input Output)
controller.

### `enable`

Default: `1`

Enable GPIO emulation. Disable to use the GPIO controller on a real AMEX.

### `sw1`

Default `0x70` (`VK_F1`)

Keyboard binding for Nu chassis SW1 button (alternative Test)

### `sw2`

Default `0x71` (`VK_F2`)

Keyboard binding for Nu chassis SW2 button (alternative Service)

### `dipsw1` .. `dipsw8`

Defaults: `1`, `0`, `0`, `0`, `0`, `0`, `0`, `0`

Nu chassis DIP switch settings:

- Switch 1: Game-specific, but usually controls the "distribution server"
    setting. Exactly one arcade machine on a cabinet router must be set to the
    Server setting.
    - `0`: Client
    - `1`: Server
- Switch 2,3: Game-specific.
    - Used by Mario&Sonic to configure cabinet ID, possibly other games.
- Switch 4: Screen orientation. Only used by the Nu system startup program.
    - `0`: YOKO/Horizontal
    - `1`: TATE/Vertical
- Switch 5,6,7: Screen resolution. Only used by the Nu system startup program.
    - `000`: No change
    - `100`: 640x480
    - `010`: 1024x600
    - `110`: 1024x768
    - `001`: 1280x720
    - `101`: 1280x1024
    - `110`: 1360x768
    - `111`: 1920x1080
- Switch 8: Game-specific. Not used in any shipping game.

## `[gfx]`

### `enable`

Default: `1`

Enables graphic hooks.

### `windowed`

Default: `0`

Force the game to run windowed.

### `framed`

Default: `0`

Add a frame to the game window if running windowed.

### `monitor`

Default: `0`

Select the monitor to run the game on. (Fullscreen only, 0 = primary screen)

### `dpiAware`

Default: `1`

Sets the game to be DPI-aware. This prevents Windows automatically scaling the game window by your desktop's scaling factor, which may cause blurry graphics.

## `[hwmon]`

Configure stub implementation of the platform hardware monitor driver. The
real implementation of this driver monitors CPU temperatures by reading from
Intel Model Specific Registers, which is an action that is only permitted from
kernel mode.

### `enable`

Default `1`

Enable hwmon emulation. Disable to use the real hwmon driver.

## `[jvs]`

Configure emulation of the AMEX PCIe JVS *controller* (not IO board!)

### `enable`

Default `1`

Enable JVS port emulation. Disable to use the JVS port on a real AMEX.

### `foreground`

Default `0`

Only enables input when the game's main window is focused. This does not work for all games.

## `[io4]`

Configure emulation of the IO4 board. Same settings also apply to `[io3]`.

### `enable`

Default `1`

Enable IO4 port emulation. Disable to use the IO4 port on a real ALLS.


### `foreground`

Default `0`

Only enables input when the game's main window is focused. This does not work for all games, notably APMv3, due to the game switching involved.

### `test`
Default `0x31`

Test button virtual-key code. Default is the 1 key.

### `service`

Default `0x32`

Service button virtual-key code. Default is the 2 key.

### `coin`

Default `0x33`

Keyboard button to increment coin counter. Default is the 3 key.

## `[keychip]`

Configure keychip emulation.

### `enable`

Enable keychip emulation. Disable to use a real keychip.

### `id`

Default: `A69E-01A88888888`

Keychip serial number. Keychip serials observed in the wild follow this
pattern: `A\d{2}(E|X)-(01|20)[ABCDU]\d{8}`.

### `gameId`

Default: (Varies depending on game)

Override the game's four-character model code. Changing this from the game's
expected value will probably just cause a system error.

### `platformId`

Default: (Varies depending on game)

Override the game's four-character platform code (e.g. `AAV2` for Nu 2). This
is actually supposed to be a separate three-character `platformId` and
integer `modelType` setting, but they are combined here for convenience.

`platformId` is one of the following:
- `AAV`: Nu 1/1.1/2
- `AAW`: NuSX 1/1.1
- `ACA`: ALLS UX/HX/MX

`modelType` is one of the following:
- `1`: Server (SV) 
- `2`: Satalite (ST) 
- `3`: Live (LV) 
- `4`: Terminal (TN)

It's safe to assume that every game you'll be playing with these tools will be a Satalite.
Some games care, others don't. Some even change how they run based on this value (Wonderland Wars
will boot into terminal mode if `modelType` is 4).

### `region`

Default: `1`

Override the keychip's region code. Most games seem to pay attention to the
DS EEPROM region code and not the keychip region code, and this seems to be
a bit mask that controls which Nu PCB region codes this keychip is authorized
for. So it probably only affects the system software and not the game software.
Bit values are:

- 1: JPN: Japan
- 2: USA (unused)
- 3: EXP: Export (for Asian markets)
- 4: CHS: China (Simplified Chinese?)

### `billingCa`

Default: `DEVICE\\ca.crt`

Set the billing certificate path. This has to match the one used for the 
SSL billing server. The DER certificate must fit in 1024 bytes so it must be
small.

### `billingPub`

Default: `DEVICE\\billing.pub`

Set the actual keychip RSA public key path. This public key has to match the
private key `billing.key` of the billing server in order to decrypt/encrypt
the billing transactions.

### `billingType`

Default: `1`

Sets the billing type, a single bit value that flags the cabinet as a rental if set to `1`, or `0` otherwise.
Certian games that were only sold officially as full purchases (that is, non-rentals) must have this value set to 0.
NOTE: Crossbeats erroniously displays Billing modes A/B1/B2, but this value comes from the `modelType` and NOT this value!

### `systemFlag`

Default: `0x64`

An 8-bit bitfield of unclear meaning. The least significant bit indicates a
developer dongle. Changing this doesn't seem to have any effect on
anything other than SEGA AM2 games.

Other values observed in the wild:

- `0x04`: SDCH, SDCA
- `0x20`: SDCA

### `subnet`

Default `192.168.100.0`

The LAN IP range that the game will expect. The prefix length is hardcoded into
the game program: for some games this is `/24`, for others it is `/20`.

## `[netenv]`

Configure network environment virtualization. This module helps bypass various
restrictions placed upon the game's LAN environment.

### `enable`

Default `1`

Enable network environment virtualization. You may need to disable this if
you want to do any head-to-head play on your LAN.

Note: The virtualized LAN IP range is taken from the emulated keychip's
`subnet` setting.

### `addrSuffix`

Default: `11`

The final octet of the local host's IP address on the virtualized subnet (so,
if the keychip subnet is `192.168.32.0` and this value is set to `11`, then the
local host's virtualized LAN IP is `192.168.32.11`).

### `routerSuffix`

Default: `1`

The final octet of the default gateway's IP address on the virtualized subnet.

### `macAddr`

Default: `01:02:03:04:05:06`

The MAC address of the virtualized Ethernet adapter. The exact value shouldn't
ever matter.

## `[pcbid]`

Configure Windows host name virtualization. The ALLS-series platform no longer
has an AMEX board, so the MAIN ID serial number is stored in the Windows
hostname.

### `enable`

Default: `1`

Enable Windows host name virtualization. This is only needed for ALLS-platform
games (since the ALLS lacks an AMEX and therefore has no DS EEPROM, so it needs
another way to store the PCB serial), but it does no harm on games that run on
earlier hardware.

### `serialNo`

Default: `ACAE01A99999999`

Set the Windows host name. This should be an ALLS MAIN ID, without the
hyphen (which is not a valid character in a Windows host name).

## `[sram]`

Configure emulation of the AMEX PCIe battery-backed SRAM. This stores
bookkeeping state and settings. This file is automatically created and
initialized with a suitable number of zero bytes if it does not already exist.

### `enable`

Default `1`

Enable SRAM emulation. Disable to use the SRAM on a real AMEX.

### `path`

Default `DEVICE\sram.bin`

Path to the storage file for SRAM emulation.

## `[vfs]`

Configure Windows path redirection hooks.

### `enable`

Default: `1`

Enable path redirection.

### `amfs`

Default: Empty string (causes a startup error)

Configure the location of the SEGA AMFS volume. Stored on the `E` partition on
real hardware.

### `appdata`

Default: Empty string (causes a startup error)

Configure the location of the SEGA "APPDATA" volume (nothing to do with the
Windows user's `%APPDATA%` directory). Stored on the `Y` partition on real
hardware.

### `option`

Default: Empty string

Configure the location of the "Option" data mount point. This mount point is
optional (hence the name, probably) and contains directories which contain
minor over-the-air content updates.

## `[epay]`

Configure Thinca Payment (E-Money) emulation and hooks.

### `enable`

Default: `1`

Enables the Thinca emulation. This will allow you to enable E-Money on compatible servers.

### `hook`

Default: `1`

Enables hooking of respective Thinca DLL functions to emulate the existence of E-Money. This cannot be used with a real E-Money server.

## `[openssl]`

Configure the OpenSSL SHA extension bug hook.

### `enable`

Default: `1`

Enables the OpenSSL hook to fix the SHA extension bug on Intel CPUs.

### `override`

Default: `0`

Enables the override to always hook the OpenSSL env variable. By default the
hook is only applied to Intel CPUs with the SHA extension present.
