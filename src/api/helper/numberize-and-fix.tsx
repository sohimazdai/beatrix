export function numberizeAndFix(num: number | string, fix?: number) {
  return Number(Number(num || 0).toFixed(fix || 1));
}
