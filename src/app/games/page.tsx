import type { Metadata } from "next";

/**
 * genezisi.com/games — the game's landing page.
 *
 * WHY IT LIVES HERE rather than in the game's own repository. The game deploys as a static bundle
 * whose root IS the game: `/` serves the playable canvas. A landing page therefore cannot take the
 * root without renaming the game page to play.html, which rewrites the game's URL in 77 places —
 * including the smoke gate, 25 browser-driven evidence scripts, and three tests plus the structural
 * review that read `index.html` *as the game's HTML*. Pointing any of those at the wrong file makes
 * a gate silently start reviewing this page instead of the game. So the front door sits here, on the
 * brand domain, and the game stays untouched behind it.
 *
 * The page is a server component with inline styles: no client JavaScript, nothing to hydrate, and
 * no coupling to the marketing site's theme tokens. It is deliberately self-contained.
 *
 * GAME_NAME is the working title. The official name is not chosen yet, so it is declared once here
 * and nowhere else on this page.
 */
const GAME_NAME = "The Broken Chapel";
const GAME_URL = "https://broken-chapel-prototype.vercel.app";

const INK = "#07101d";
const INK_SOFT = "#0b1626";
const LINE = "#1c2a3d";
const TEXT = "#dbe6f2";
const MUTED = "#8fa3ba";
const ACCENT = "#dff8ff";

export const metadata: Metadata = {
  title: `${GAME_NAME} — a dungeon run in your browser`,
  description:
    "A low-poly dark-fantasy dungeon run built for a phone held upright. Descend the broken chapel, "
    + "fight what is inside, and build your kit. Plays in the browser — no install, no account.",
  keywords: [GAME_NAME, "dungeon crawler", "browser game", "mobile game", "low-poly"],
  robots: { index: true, follow: true },
  openGraph: {
    title: `${GAME_NAME} — a dungeon run in your browser`,
    description:
      "A low-poly dark-fantasy dungeon run built for a phone held upright. Plays in the browser — "
      + "no install, no account.",
    type: "website",
  },
};

const HOW_TO_PLAY = [
  {
    step: "Move",
    body: "Hold and drag anywhere on the screen. There is no virtual stick to find and no button to hold.",
  },
  {
    step: "Strike",
    body: "Your weapon swings on its own the moment you stand still. Stopping is the attack.",
  },
  {
    step: "Survive",
    body: "Ice Nova and Blink sit on the bottom of the screen. Blink is your evade — it is the one that keeps you alive.",
  },
];

const FAQ = [
  {
    q: "What does it cost?",
    a: "Nothing. There is no shop, no currency and nothing to buy.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no sign-up, no email and no password. Your progress is saved in your own browser.",
  },
  {
    q: "Will it run on my phone?",
    a: "It is built for a phone held upright, and it runs in the browser you already have. A desktop browser works too, but the game is designed for a thumb.",
  },
  {
    q: "Is anything tracking me?",
    a: "No analytics and no third-party trackers. The game makes no network calls beyond fetching its own files, and your save never leaves your device.",
  },
];

export default function GamesPage() {
  return (
    <main style={{ background: INK, color: TEXT, minHeight: "100vh" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 20px 72px" }}>
        {/* Hero — a phone screen is about 30 characters wide at this size, so nothing here is long. */}
        <p
          style={{
            margin: 0,
            fontSize: 11,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          A dungeon run in your browser
        </p>
        <h1
          style={{
            margin: "14px 0 0",
            fontSize: 34,
            lineHeight: 1.1,
            letterSpacing: "-.01em",
            color: ACCENT,
          }}
        >
          {GAME_NAME}
        </h1>
        <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.55, color: TEXT }}>
          A low-poly dark-fantasy descent. Walk into a ruined chapel, kill what is already living in it,
          and carry what you find back out.
        </p>

        <a
          href={GAME_URL}
          style={{
            display: "block",
            marginTop: 26,
            padding: "17px 20px",
            background: ACCENT,
            color: INK,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            textAlign: "center",
            textDecoration: "none",
            borderRadius: 8,
          }}
        >
          Play now
        </a>
        <p style={{ margin: "10px 0 0", fontSize: 13, color: MUTED, textAlign: "center" }}>
          No install. No account. Runs in the browser you already have.
        </p>

        {/* How to play — the three things a stranger cannot guess. */}
        <h2
          style={{
            margin: "52px 0 0",
            fontSize: 12,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          The first thirty seconds
        </h2>
        <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
          {HOW_TO_PLAY.map((item) => (
            <div
              key={item.step}
              style={{
                background: INK_SOFT,
                border: `1px solid ${LINE}`,
                borderLeft: `2px solid ${ACCENT}`,
                borderRadius: 6,
                padding: "13px 15px",
              }}
            >
              <strong style={{ display: "block", fontSize: 15, color: ACCENT }}>{item.step}</strong>
              <span style={{ fontSize: 14.5, lineHeight: 1.5, color: MUTED }}>{item.body}</span>
            </div>
          ))}
        </div>

        {/* What is in it. These figures come from the build's own content census, not from marketing. */}
        <h2
          style={{
            margin: "52px 0 0",
            fontSize: 12,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          What is down there
        </h2>
        <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.6, color: TEXT }}>
          Three adventures behind a hub, ten authored rooms, forty-four items and a forge to craft with.
          Gear changes how you fight — a mace cleaves, a charm bends your nova — so what you carry out
          decides what the next run looks like.
        </p>

        {/* Device support, stated plainly rather than as a compatibility matrix. */}
        <h2
          style={{
            margin: "52px 0 0",
            fontSize: 12,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Where it runs
        </h2>
        <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.6, color: TEXT }}>
          Portrait, one thumb, five minutes at a time. It is sized for a phone — an enemy is smaller than
          your thumbprint on screen — and it uses the browser rather than asking you to install anything.
          A recent Android or iOS browser is the target; it will also open on a desktop, where the
          controls still work but the framing does not.
        </p>

        {/* FAQ. */}
        <h2
          style={{
            margin: "52px 0 0",
            fontSize: 12,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Questions
        </h2>
        <div style={{ marginTop: 14 }}>
          {FAQ.map((item) => (
            <div key={item.q} style={{ borderTop: `1px solid ${LINE}`, padding: "15px 0" }}>
              <strong style={{ display: "block", fontSize: 15.5, color: TEXT }}>{item.q}</strong>
              <p style={{ margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.55, color: MUTED }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>

        <p style={{ margin: "44px 0 0", fontSize: 13, lineHeight: 1.6, color: MUTED }}>
          Third-party assets and the licence each is used under are listed in the game&rsquo;s own{" "}
          <a href={`${GAME_URL}/credits.html`} style={{ color: ACCENT }}>
            assets &amp; licences
          </a>{" "}
          page.
        </p>
        <p style={{ margin: "18px 0 0", fontSize: 12.5, color: "#71869d" }}>
          A prototype build. Expect it to change.
        </p>
      </div>
    </main>
  );
}
