export const Colors = {
  reset: '\x1b[0m',
  fgRed: '\x1b[31m',
  fgBlue: '\x1b[34m',
}

/**
 * @param {string} str
 * @param {string} color
 * @returns {string} colored string
 */
export const colorStr = (str, color = Colors.reset) =>
  `${color}${str}${Colors.reset}`;
