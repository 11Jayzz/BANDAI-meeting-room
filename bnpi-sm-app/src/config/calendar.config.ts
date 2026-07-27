/**
 * Non-copy constants for the room-status calendar grid.
 * Business-hours window is a Phase 1 default — confirm with stakeholder if
 * rooms are bookable outside these hours (NEEDS_CONFIRMATION).
 */
export const CALENDAR_CONFIG = {
  slotMinutes: 30,
  dayStartHour: 7,
  dayEndHour: 19,
} as const;
