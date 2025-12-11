export const VK_MAP: Record<number, string> = {
  0x08: 'Backspace',
  0x09: 'Tab',
  0x0D: 'Enter',
  0x10: 'Shift',
  0x11: 'Ctrl',
  0x12: 'Alt',
  0x13: 'Pause',
  0x14: 'CapsLock',
  0x1B: 'Esc',
  0x20: 'Space',
  0x21: 'PageUp',
  0x22: 'PageDown',
  0x23: 'End',
  0x24: 'Home',
  0x25: 'Left',
  0x26: 'Up',
  0x27: 'Right',
  0x28: 'Down',
  0x2D: 'Insert',
  0x2E: 'Delete',
  0x30: '0',
  0x31: '1',
  0x32: '2',
  0x33: '3',
  0x34: '4',
  0x35: '5',
  0x36: '6',
  0x37: '7',
  0x38: '8',
  0x39: '9',
  0x41: 'A',
  0x42: 'B',
  0x43: 'C',
  0x44: 'D',
  0x45: 'E',
  0x46: 'F',
  0x47: 'G',
  0x48: 'H',
  0x49: 'I',
  0x4A: 'J',
  0x4B: 'K',
  0x4C: 'L',
  0x4D: 'M',
  0x4E: 'N',
  0x4F: 'O',
  0x50: 'P',
  0x51: 'Q',
  0x52: 'R',
  0x53: 'S',
  0x54: 'T',
  0x55: 'U',
  0x56: 'V',
  0x57: 'W',
  0x58: 'X',
  0x59: 'Y',
  0x5A: 'Z',
  0x5B: 'LWin',
  0x5C: 'RWin',
  0x60: 'Num 0',
  0x61: 'Num 1',
  0x62: 'Num 2',
  0x63: 'Num 3',
  0x64: 'Num 4',
  0x65: 'Num 5',
  0x66: 'Num 6',
  0x67: 'Num 7',
  0x68: 'Num 8',
  0x69: 'Num 9',
  0x6A: 'Multiply',
  0x6B: 'Add',
  0x6C: 'Separator',
  0x6D: 'Subtract',
  0x6E: 'Decimal',
  0x6F: 'Divide',
  0x70: 'F1',
  0x71: 'F2',
  0x72: 'F3',
  0x73: 'F4',
  0x74: 'F5',
  0x75: 'F6',
  0x76: 'F7',
  0x77: 'F8',
  0x78: 'F9',
  0x79: 'F10',
  0x7A: 'F11',
  0x7B: 'F12',
  0x90: 'NumLock',
  0x91: 'ScrollLock',
  0xA0: 'LShift',
  0xA1: 'RShift',
  0xA2: 'LCtrl',
  0xA3: 'RCtrl',
  0xA4: 'LAlt',
  0xA5: 'RAlt',
  0xBA: ';',
  0xBB: '=',
  0xBC: ',',
  0xBD: '-',
  0xBE: '.',
  0xBF: '/',
  0xC0: '`',
  0xDB: '[',
  0xDC: '\\',
  0xDD: ']',
  0xDE: "'",
};

export const mapKeyToVK = (e: React.KeyboardEvent): number | null => {
  // This is a best-effort mapping from JS KeyboardEvent to Windows VK codes
  const code = e.code;
  const key = e.key;
  const location = e.location; // 1=Left, 2=Right, 3=Numpad

  // Function keys
  if (code.match(/^F[1-9][0-2]?$/)) {
    const num = parseInt(code.substring(1));
    return 0x70 + (num - 1);
  }

  // Digits
  if (code.match(/^Digit[0-9]$/)) {
    return 0x30 + parseInt(code.substring(5));
  }

  // Letters
  if (code.match(/^Key[A-Z]$/)) {
    return 0x41 + (code.charCodeAt(3) - 'A'.charCodeAt(0));
  }

  // Numpad
  if (location === 3) {
    if (code.match(/^Numpad[0-9]$/)) return 0x60 + parseInt(code.substring(6));
    if (code === 'NumpadMultiply') return 0x6A;
    if (code === 'NumpadAdd') return 0x6B;
    if (code === 'NumpadSubtract') return 0x6D;
    if (code === 'NumpadDecimal') return 0x6E;
    if (code === 'NumpadDivide') return 0x6F;
  }

  // Special keys
  switch (code) {
    case 'Backspace': return 0x08;
    case 'Tab': return 0x09;
    case 'Enter': return 0x0D;
    case 'ShiftLeft': return 0xA0;
    case 'ShiftRight': return 0xA1;
    case 'ControlLeft': return 0xA2;
    case 'ControlRight': return 0xA3;
    case 'AltLeft': return 0xA4;
    case 'AltRight': return 0xA5;
    case 'Pause': return 0x13;
    case 'CapsLock': return 0x14;
    case 'Escape': return 0x1B;
    case 'Space': return 0x20;
    case 'PageUp': return 0x21;
    case 'PageDown': return 0x22;
    case 'End': return 0x23;
    case 'Home': return 0x24;
    case 'ArrowLeft': return 0x25;
    case 'ArrowUp': return 0x26;
    case 'ArrowRight': return 0x27;
    case 'ArrowDown': return 0x28;
    case 'Insert': return 0x2D;
    case 'Delete': return 0x2E;
    case 'NumLock': return 0x90;
    case 'ScrollLock': return 0x91;
    case 'Semicolon': return 0xBA;
    case 'Equal': return 0xBB;
    case 'Comma': return 0xBC;
    case 'Minus': return 0xBD;
    case 'Period': return 0xBE;
    case 'Slash': return 0xBF;
    case 'Backquote': return 0xC0;
    case 'BracketLeft': return 0xDB;
    case 'Backslash': return 0xDC;
    case 'BracketRight': return 0xDD;
    case 'Quote': return 0xDE;
  }

  return null;
};
