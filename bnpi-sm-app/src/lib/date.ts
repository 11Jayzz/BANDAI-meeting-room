/** Local-timezone YYYY-MM-DD (not UTC) — matches the calendar grid's local business hours. */
export function toDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayDateString(): string {
  return toDateOnly(new Date());
}

/** date +/- delta days, as YYYY-MM-DD (local). */
export function addDays(date: string, delta: number): string {
  const [year, month, day] = date.split('-').map(Number);
  const d = new Date(year!, month! - 1, day!);
  d.setDate(d.getDate() + delta);
  return toDateOnly(d);
}

/** Short weekday label (e.g. "Mon") for a YYYY-MM-DD date, local timezone. */
export function shortWeekdayLabel(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year!, month! - 1, day!).toLocaleDateString(undefined, { weekday: 'short' });
}

/** Converts a native <input type="datetime-local"> value (local wall-clock, no offset) to a UTC ISO string. */
export function datetimeLocalToIso(value: string): string {
  return new Date(value).toISOString();
}

/** Converts a UTC ISO string to a local <input type="datetime-local"> value. */
export function isoToDatetimeLocal(iso: string): string {
  const d = new Date(iso);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
