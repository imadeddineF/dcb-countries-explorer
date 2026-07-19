import { DEFAULT_TIMEOUT_MS } from "../constants/api";

/** Error thrown for non-2xx responses or network/timeout failures. */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

let apiKey: string | undefined;

/** Sets the RestCountries API key. Call once at app startup. */
export function configureCountriesApi(options: { apiKey: string }) {
  apiKey = options.apiKey;
}

export interface FetchJsonOptions extends RequestInit {
  /** Abort the request after this many milliseconds. */
  timeoutMs?: number;
}

export async function fetchJson<T>(
  url: string,
  { timeoutMs = DEFAULT_TIMEOUT_MS, ...init }: FetchJsonOptions = {},
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  init.signal?.addEventListener("abort", () => controller.abort());

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        ...init.headers,
      },
    });

    if (!response.ok) {
      let message = `Request failed with status ${response.status}`;
      try {
        const body = (await response.json()) as {
          errors?: { message?: string }[];
        };
        message = body.errors?.[0]?.message ?? message;
      } catch {
        // non-JSON error body — keep the status message
      }
      throw new ApiError(message, response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError(`Request to ${url} timed out or was cancelled`, 0);
    }
    throw new ApiError(
      error instanceof Error ? error.message : `Request to ${url} failed`,
      0,
    );
  } finally {
    clearTimeout(timeout);
  }
}
