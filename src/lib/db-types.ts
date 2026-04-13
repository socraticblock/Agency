/**
 * Shared type definitions for the D1 database layer.
 * Import this instead of duplicating types across files.
 */

/** Env shape for Next.js 15 App Router route handlers using D1 */
export interface Env {
  CARDS_DB?: D1Database;
  ADMIN_PASSWORD?: string;
}
