import type { BiometricCheckInInput, BiometricCheckInResult, BiometricProvider } from "./biometricProvider";

/** Staff-confirmed check-in — no hardware involved. */
export const manualBiometricProvider: BiometricProvider = {
  method: "manual",
  async checkIn(_input: BiometricCheckInInput): Promise<BiometricCheckInResult> {
    return { method: "manual", confirmedAt: new Date().toISOString() };
  },
};
