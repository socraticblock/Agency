/**
 * The parent /start/layout already mounts navigation and the start shell.
 * Do not duplicate them for the historical editor route group.
 */
export default function EditorRouteGroupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
