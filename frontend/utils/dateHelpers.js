export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(); // Example: "8/7/2025, 2:00:00 PM"
}

export function formatDuration(start, end) {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const diff = Math.abs(endTime - startTime);

  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  return `${hrs}h ${remainingMins}m`;
}
