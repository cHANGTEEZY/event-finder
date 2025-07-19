export function formatDateToDayMonthAbbr(dateStr: string): string {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Handles dates like "21 September, 2025"
  const parts = dateStr.split(" ");
  if (parts.length < 2) return "";

  const day = parseInt(parts[0], 10);
  const monthName = parts[1].replace(",", "");

  const monthIndex = new Date(Date.parse(monthName + " 1, 2000")).getMonth();

  if (isNaN(day) || monthIndex === -1) return "";

  const monthAbbr = months[monthIndex];

  return `${day} ${monthAbbr}`;
}
