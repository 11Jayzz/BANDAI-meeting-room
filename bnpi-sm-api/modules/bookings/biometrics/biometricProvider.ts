/**
 * Extension seam for real biometric hardware (fingerprint/face scanners).
 * Today only ManualBiometricProvider exists (staff-confirmed check-in).
 * A future hardware provider implements this same interface and is added
 * as a new case in getBiometricProvider() (./index.ts) — no controller,
 * route, or service change required.
 */
export interface BiometricCheckInInput {
  bookingId: number;
  performedByUserId: number;
}

export interface BiometricCheckInResult {
  /** Widen this union when a real hardware provider is added. */
  method: "manual";
  confirmedAt: string;
}

export interface BiometricProvider {
  readonly method: BiometricCheckInResult["method"];
  checkIn(input: BiometricCheckInInput): Promise<BiometricCheckInResult>;
}
