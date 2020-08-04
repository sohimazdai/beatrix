export default function getTitlesNumber(hours: number) {
  if (hours <= 6) return hours;

  if (hours > 12) return hours / 4;

  return hours / 2;
}
