export const CabinetStatus = {
  AVAILABLE: "AVAILABLE",
  USING: "USING",
  BROKEN: "BROKEN",
  OVERDUE: "OVERDUE",
} as const;

export type CabinetStatusType =
  (typeof CabinetStatus)[keyof typeof CabinetStatus];

export const BrokenReason = {
  잠금: "잠금",
  파손: "파손",
} as const;
export type BrokenReasonType = (typeof BrokenReason)[keyof typeof BrokenReason];
