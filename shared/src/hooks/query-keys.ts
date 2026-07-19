/** Centralized React Query keys so consumers invalidate consistently. */
export const queryKeys = {
  countries: {
    all: ["countries"] as const,
    detail: (code: string) => ["countries", code] as const,
  },
};
