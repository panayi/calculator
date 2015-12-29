const toHex = number => {
  const hex = number.toString(16)
  return hex.length < 2 ? '0' + hex : hex
}

function rgbToHex(rr, gg, bb) {
  return '#' + toHex(rr) + toHex(gg) + toHex(bb)
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export {
  rgbToHex,
  hexToRgb
}
