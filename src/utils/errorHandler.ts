// ─────────────────────────────────────────────────────────────
// SafeSpace AI — Centralized Error Handling Utility
//
// Provides a single, consistent way to extract a human-readable
// error message from an unknown catch value.
// ─────────────────────────────────────────────────────────────

/**
 * Extracts a human-readable message from an unknown catch value.
 *
 * @param error   - The caught value (may be Error, string, or anything)
 * @param fallback - Message to return when error is not an Error instance
 * @returns       A string suitable for display in the UI
 *
 * @example
 * try { ... } catch (err) {
 *   setError(getErrorMessage(err))
 * }
 */
export function getErrorMessage(
  error: unknown,
  fallback = 'An unexpected error occurred.'
): string {
  return error instanceof Error ? error.message : fallback
}
