// Shared HTTP client for services

export class HttpError extends Error {
  status?: number;
  details?: unknown;
  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.details = details;
  }
}

const BASE_URL = process.env["NEXT_PUBLIC_API_URL"];

/**
 * jsonFetch: base JSON fetch wrapper
 * - prefixes requests with NEXT_PUBLIC_API_URL
 * - throws HttpError on non-2xx responses with parsed body attached
 */
export async function http<T>(input: string, init?: RequestInit): Promise<T> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(`${BASE_URL}${input}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  let body: any = null;
  try {
    body = await res.json();
  } catch {
    // response may be empty or non-JSON; handled below
  }

  if (!res.ok) {
    const message =
      body?.message || body?.error || res.statusText || "Request failed";
    throw new HttpError(message, res.status, body);
  }

  return body as T;
}
