export const CabinetStatus = {
  AVAILABLE: "AVAILABLE",
  USING: "USING",
  BROKEN: "BROKEN",
  OVERDUE: "OVERDUE",
} as const;

export type CabinetStatusType =
  (typeof CabinetStatus)[keyof typeof CabinetStatus];
