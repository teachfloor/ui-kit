import { useMemo } from 'react'

import { useTeachfloorTheme } from '../../'

const useHexColors = () => {
  const theme = useTeachfloorTheme()

  const generateHexColor = (index, shade = 6) => {
    const colors = [
      'blue',
      'teal',
      'violet',
      'orange',
      'indigo',
      'green',
      'pink',
    ]

    if (theme.colors.brand) {
      colors[0] = 'brand'
    }

    if (colors[index]) {
      return theme.colors[colors[index]][shade]
    }

    const startingHue = 215; // Hue for #1c7ed6
    const saturation = 60; // Saturation for #1c7ed6
    const lightness = 54; // Lightness for #1c7ed6

    const goldenAngle = 137.508; // Golden angle in degrees
    const hue = (startingHue + index * goldenAngle) % 360;

    const simulatedShade = {
      0: 0.1,
      1: 0.2,
      2: 0.3,
      3: 0.4,
      4: 0.6,
      5: 0.8,
      6: 1,
    }

    return simulatedShade[shade]
      ? theme.fn.rgba(hslToHex(hue, saturation, lightness), shade)
      : hslToHex(hue, saturation, lightness)
  };

  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
  };

  return useMemo(() => generateHexColor, []);
};

export default useHexColors;