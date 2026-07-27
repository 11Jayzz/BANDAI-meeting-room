import { INVALID_CREDENTIALS_MESSAGE } from "../../config/constants";
import { findUserByEmail, findUserById } from "../../db/repositories/users.repository";
import { signAuthToken } from "../../lib/jwt";
import { verifyPassword } from "../../lib/password";
import type { LoginRequest } from "../../schema/auth";

export interface AuthUserProfile {
  id: number;
  email: string;
  displayName: string;
  role: "admin" | "front_desk";
  isActive: boolean;
}

function toProfile(row: {
  id: number;
  email: string;
  displayName: string;
  role: "admin" | "front_desk";
  isActive: boolean;
}): AuthUserProfile {
  return {
    id: row.id,
    email: row.email,
    displayName: row.displayName,
    role: row.role,
    isActive: row.isActive,
  };
}

/** Never leaks whether the email exists — same error for unknown email vs wrong password. */
export async function login(
  input: LoginRequest
): Promise<{ token: string; user: AuthUserProfile }> {
  const invalidCredentialsError = Object.assign(
    new Error(INVALID_CREDENTIALS_MESSAGE),
    { status: 401 }
  );

  const row = await findUserByEmail(input.email);
  if (!row || !row.isActive) {
    throw invalidCredentialsError;
  }

  const passwordOk = await verifyPassword(input.password, row.passwordHash);
  if (!passwordOk) {
    throw invalidCredentialsError;
  }

  const token = signAuthToken({ sub: row.id, email: row.email, role: row.role });
  return { token, user: toProfile(row) };
}

export async function getCurrentUser(userId: number): Promise<AuthUserProfile> {
  const row = await findUserById(userId);
  if (!row) {
    throw Object.assign(new Error("User not found."), { status: 404 });
  }
  return toProfile(row);
}
