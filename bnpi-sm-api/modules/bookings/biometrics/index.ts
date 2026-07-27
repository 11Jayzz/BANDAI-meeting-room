import { env } from "../../../config/env";
import type { BiometricProvider } from "./biometricProvider";
import { manualBiometricProvider } from "./manualBiometricProvider";

export * from "./biometricProvider";

/** Env-driven selector — the entire extension seam for real hardware later. */
export function getBiometricProvider(): BiometricProvider {
  switch (env.BIOMETRICS_PROVIDER) {
    case "manual":
      return manualBiometricProvider;
    default:
      throw new Error(`Unsupported BIOMETRICS_PROVIDER: ${env.BIOMETRICS_PROVIDER}`);
  }
}
