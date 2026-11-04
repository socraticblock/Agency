import { notFound } from "next/navigation";

/**
 * Historical content preserved in src/lib/blog.ts; direct old-article URLs
 * now correctly return 404 rather than serving false prices or sales claims.
 * Restore individually after a sourced editorial review.
 */
export default function ArchivedArticle() {
  notFound();
}
