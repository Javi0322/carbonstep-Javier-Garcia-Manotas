export function calcularCO2(cantidad, factor) {
  const n = Number(cantidad)
  if (isNaN(n) || n < 0) return 0
  return n * factor
}

export function redondear(num) {
  return Math.round(num * 100) / 100
}
