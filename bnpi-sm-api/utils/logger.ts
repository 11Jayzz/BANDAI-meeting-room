const REDACTED = "[REDACTED]";
const MAX_DEPTH = 5;
const MAX_STRING_LENGTH = 1500;
const SENSITIVE_KEY_PATTERN =
  /(authorization|cookie|token|secret|api[_-]?key|password|passwd|set-cookie)/i;

function sanitizeString(value: string): string {
  if (value.length <= MAX_STRING_LENGTH) return value;
  return `${value.slice(0, MAX_STRING_LENGTH)}...[truncated]`;
}

function sanitizeValue(value: unknown, depth = 0): unknown {
  if (depth > MAX_DEPTH) return "[MaxDepth]";

  if (value === null || value === undefined) return value;
  if (typeof value === "string") return sanitizeString(value);
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (value instanceof Date) return value.toISOString();

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, depth + 1));
  }

  if (value instanceof Error) {
    return {
      name: value.name,
      message: sanitizeString(value.message),
      stack: sanitizeString(value.stack || ""),
    };
  }

  if (typeof value === "object") {
    const input = value as Record<string, unknown>;
    const output: Record<string, unknown> = {};

    for (const [key, item] of Object.entries(input)) {
      if (SENSITIVE_KEY_PATTERN.test(key)) {
        output[key] = REDACTED;
      } else {
        output[key] = sanitizeValue(item, depth + 1);
      }
    }

    return output;
  }

  return String(value);
}

function print(level: "info" | "error", event: string, data?: unknown): void {
  const payload =
    data === undefined
      ? { event, ts: new Date().toISOString() }
      : { event, ts: new Date().toISOString(), data: sanitizeValue(data) };

  if (level === "error") {
    console.error(payload);
    return;
  }

  console.log(payload);
}

export function logInfo(event: string, data?: unknown): void {
  print("info", event, data);
}

export function logError(event: string, data?: unknown): void {
  print("error", event, data);
}
