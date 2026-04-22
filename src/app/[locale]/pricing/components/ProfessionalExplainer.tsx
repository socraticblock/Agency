import { WHATSAPP_INTAKE } from "@/constants/content";
import Link from "next/link";

export function ProfessionalExplainer() {
  const waText = encodeURIComponent(
    "Hi Genezisi! I'm interested in the Professional package. Can we discuss next steps?"
  );
  const waLink = `https://wa.me/${WHATSAPP_INTAKE}?text=${waText}`;

  return (
    <section id="professional-explainer" className="mx-auto mt-24 max-w-4xl">
      <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6 sm:p-12">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-black text-white sm:text-5xl">Professional — ₾999</h2>
          <p className="mt-4 text-lg font-medium text-slate-300">
            One-page custom landing website. Built in 7–10 days.
          </p>
        </header>

        <div className="prose prose-invert prose-emerald max-w-none prose-p:text-slate-300 prose-li:text-slate-300 prose-headings:text-white">
          <hr className="border-white/10" />

          <h3>What You Get</h3>

          <h4>100% Custom Design — No Templates</h4>
          <p>
            Your website is designed from scratch for your brand and your goals. No pre-made templates, no template colours or layouts. Every pixel is built for you. This means your site will look and feel like you — not like every other business using the same template.
          </p>

          <hr className="border-white/10" />

          <h4>6 Pre-Built Sections — Pick Any 4</h4>
          <p>Your landing page is built from our section library. You choose any 4 of the following:</p>
          <ul>
            <li><strong>Services</strong> — What you offer. Ideal for lawyers listing practice areas, real estate agents listing property types, consultants listing service packages.</li>
            <li><strong>About</strong> — Your story, background, credentials. Builds trust with new potential clients.</li>
            <li><strong>Testimonials</strong> — Reviews from past clients. Social proof that converts visitors into leads.</li>
            <li><strong>Gallery</strong> — Show off your work. Perfect for photographers, restaurants, interior designers, artisans.</li>
            <li><strong>Video</strong> — Embed a YouTube or Vimeo intro video. Introduces you or your product before the client even contacts you.</li>
            <li><strong>Booking</strong> — A direct booking button linking to your calendar. Clients can schedule immediately without leaving your page.</li>
          </ul>
          <p>
            During onboarding, tell us which 4 sections you want and in what order. We recommend Services + About + Testimonials + Gallery as a starting point for most professionals.
          </p>
          <p>
            Think something else would work better for your specific business? No problem. This is a custom build — tell us what you have in mind and our architect will work with you.
          </p>

          <hr className="border-white/10" />

          <h4>Mobile-First Responsive</h4>
          <p>
            Over 70% of your Georgian clients will visit your website from their phone. We design mobile-first — your site looks and works perfectly on phones first, then scales up to desktop. No pinching, no horizontal scrolling, no broken layouts.
          </p>

          <hr className="border-white/10" />

          <h4>Conversion-Optimised Layout Architecture</h4>
          <p>
            Your page isn't just beautiful — it's built to turn visitors into leads. Every section, every button, every blank space is placed strategically to guide your visitor toward taking action: filling out your form, booking a call, or messaging you on WhatsApp.
          </p>

          <hr className="border-white/10" />

          <h4>Subtle Scroll Animations</h4>
          <p>
            Your page includes gentle animations as visitors scroll — text fading in, images floating up, buttons glowing. We call this micro-animation. It's subtle and premium, not distracting — Apple-style polish, not a carnival.
          </p>

          <hr className="border-white/10" />

          <h4>Advanced Contact Form</h4>
          <p>The contact form on your page goes beyond &quot;Name, Email, Message.&quot; You can add:</p>
          <ul>
            <li>Dropdown fields (e.g., &quot;How can we help?&quot; with your custom options)</li>
            <li>File upload (e.g., &quot;Upload your brief&quot; for consultants, &quot;Attach your property documents&quot; for real estate agents)</li>
            <li>Date/time picker for booking enquiries</li>
            <li>Any custom fields you need</li>
          </ul>
          <p>
            Examples: A lawyer can have a &quot;Type of legal matter&quot; dropdown. A real estate agent can have a &quot;Property type&quot; field. A trainer can have a &quot;Goal&quot; selector.
          </p>
          <p>
            All form submissions go directly to your WhatsApp — no email to check, no lost messages.
          </p>

          <hr className="border-white/10" />

          <h4>Full SEO Suite Included</h4>
          <ul>
            <li>Google Analytics 4 + event tracking — see exactly how visitors find and use your site</li>
            <li>Schema markup — helps your site appear richer in Google search results</li>
            <li>Open Graph tags — your link looks professional when shared on Facebook/LinkedIn</li>
            <li>XML sitemap — helps Google index your site</li>
          </ul>

          <hr className="border-white/10" />

          <h4>Performance Optimised</h4>
          <p>
            Your site is built for speed — target load time under 2.5 seconds. Fast sites rank higher on Google and keep mobile visitors from bouncing.
          </p>

          <hr className="border-white/10" />

          <h4>Source Code Ownership</h4>
          <p>
            When we're done, you own your website's code. We hand it over. No lock-in, no monthly platform fees. Your website is your asset.
          </p>

          <hr className="border-white/10" />

          <h4>45-Day Comprehensive Warranty</h4>
          <p>
            If anything breaks within 45 days of launch — a button stops working, a form stops submitting, a page goes down — we fix it at no cost. You're protected.
          </p>

          <hr className="border-white/10" />

          <h4>2 Revision Rounds Included</h4>
          <p>
            We build your site based on our onboarding brief. You get two full rounds of revisions to request changes. After that, additional revisions are billed at ₾150/hour.
          </p>

          <hr className="border-white/10" />

          <h4>What's Not Included (Important)</h4>
          <ul>
            <li>
              <strong>Additional pages are not available on Professional.</strong> This is a single landing page. If you need Home + About + Services + Contact as separate pages, you need Command Center (₾1,999). → <a href="#pricing-comparison" onClick={(e) => { e.preventDefault(); document.getElementById('pricing-comparison')?.scrollIntoView({ behavior: 'smooth' }); }}>Link to Command Center section</a>
            </li>
            <li>
              <strong>CMS / Dashboard</strong> — You cannot update content yourself on Professional. Content changes require a request to us. If you want to update your own content, see Command Center.
            </li>
            <li>
              <strong>Multi-language</strong> — Professional is one language (English or Georgian). Professional translation is available as an add-on — cost depends on content volume, billed separately. Or translate it yourself.
            </li>
            <li>
              <strong>Blog / News section</strong> — Not available on Professional. See Command Center.
            </li>
          </ul>

          <hr className="border-white/10" />

          <h4>Available Add-Ons</h4>
          <p>Tell us during the onboarding brief if you'd like any of these.</p>
          <ul>
            <li>
              <strong>Additional Sections — ₾50 each</strong><br />
              Need more than 4 sections? You can add any of the remaining sections from our library to your landing page at a flat rate.
            </li>
            <li>
              <strong>Lead Capture Exit Pop-ups — ₾300</strong><br />
              When a visitor is about to leave your page, a small pop-up appears with a special offer or a reminder to book a call. Increases conversions by capturing visitors who would otherwise bounce.
            </li>
            <li>
              <strong>Professional Copywriting — ₾600</strong><br />
              We write your page copy using AIDA framework (Attention, Interest, Desire, Action). If you'd rather not write your own content, we handle it.
            </li>
            <li>
              <strong>Professional Translation — Price on request</strong><br />
              We use a professional translator. Cost depends on how much content you have. Alternatively, you can translate it yourself and we implement both versions.
            </li>
            <li>
              <strong>Anything else? Just ask</strong> — if you have something specific in mind that's not on this list, tell us. We'll scope it for you.
            </li>
          </ul>

          <hr className="border-white/10" />

          <h4>Domain, Hosting &amp; Security</h4>
          <p>
            We buy your .ge domain for you. The domain is yours — always. If you decide to stop working with us, we transfer the domain to your name at no cost.
          </p>
          <p>
            If you'd like an additional domain (e.g., .com in addition to .ge), that costs extra — tell us what you need and we'll include it in the quote.
          </p>
          <p>
            Your site is hosted on our server with SSL (secure padlock in browser) included via your Shield plan.
          </p>

          <hr className="border-white/10" />

          <h4>Shield — Annual Hosting, Security &amp; Warranty</h4>
          <p>
            Shield is required for all websites. It includes domain, hosting, security monitoring, and extends your warranty.
          </p>
          <h5>For Professional, we recommend:</h5>
          <p>
            <strong>Reputation Scout — ₾120/yr</strong>
          </p>
          <ul>
            <li>SSL monitoring — prevents &quot;Not Secure&quot; browser warnings</li>
            <li>Blacklist monitoring — daily checks to keep your domain out of spam lists</li>
            <li>Backed up with every change we make — your site is safe whenever we work on it</li>
            <li>Domain included (.ge or equivalent — you purchase, we manage)</li>
            <li>Extends warranty from 45 days to full year</li>
          </ul>
          <p>
            <strong>Micro Shield — ₾500/yr (Recommended)</strong>
          </p>
          <ul>
            <li>Everything in Reputation Scout, plus:</li>
            <li>Global content delivery for instant loading anywhere in Georgia</li>
            <li>60-second uptime checks — we know within a minute if your site goes down</li>
            <li>Daily backups — roll back any change within 30 days</li>
            <li>Database optimisation — keeps your site fast over time</li>
          </ul>
          <p>
            <a href="#shield-callout" onClick={(e) => { e.preventDefault(); document.getElementById('shield-callout')?.scrollIntoView({ behavior: 'smooth' }); }}>[View full Shield comparison →]</a>
          </p>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10 text-center">
          <p className="text-xl font-bold text-white mb-6">Ready to start? Let's talk.</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[56px] items-center justify-center rounded-xl bg-emerald-500 px-8 text-center text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            [Chat with us on WhatsApp →]
          </a>
        </div>
      </div>
    </section>
  );
}
