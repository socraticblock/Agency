/** Resolve a user-pasted watch URL to an iframe embed src, or null. */
export function videoUrlToEmbedSrc(raw: string): string | null {
  const u = raw.trim();
  if (!u) return null;

  const yt = u.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;

  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;

  return null;
}
