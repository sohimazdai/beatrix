export function numberizeAndFix(num: number | string) {
  return Number(Number(num || 0).toFixed(1));
}
