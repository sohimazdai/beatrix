export default function calculateActiveInsulinTime(lastNoteDate: number) {
  const now = Date.now();
  const diff = (lastNoteDate + 1000 * 60 * 60 * 4) - now;

  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor(diff / 1000 / 60 / 60 % 24);

  return { minutes, hours };
}
