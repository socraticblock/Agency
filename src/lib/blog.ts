/** Editorial registry for the Genezisi journal.
 * International English-language articles are the primary acquisition focus.
 * Original Georgian-market URLs are retained for user value and search continuity.
 * New claims must be sourced or verifiable before publication.
 */
export interface BlogArticle {
  slug: string;
  title: string;
  metaDescription: string;
  readingTime: string;
  lastUpdated: string;
  primaryKeyword: string;
  tags: string[];
  audience: "international" | "georgia";
  publishedAt: string;
  sections: BlogSection[];
}
export interface BlogSection { heading: string; blocks: BlogBlock[]; }
export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "source"; label: string; href: string };

const articles: BlogArticle[] = [
  {
    "slug": "custom-website-vs-website-builder",
    "title": "Custom Website vs Website Builder: A Decision Framework for Businesses",
    "metaDescription": "Should you use a website builder or commission a custom website? Compare ownership, integrations, accessibility, maintenance and lifetime cost before choosing.",
    "readingTime": "6 min read",
    "lastUpdated": "November 2026",
    "primaryKeyword": "custom website vs website builder",
    "tags": [
      "Websites",
      "Buying decisions",
      "International"
    ],
    "audience": "international",
    "publishedAt": "2026-11-04",
    "sections": [
      {
        "heading": "Start with the job the website must do",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The right platform follows the business requirement, not the other way around. A basic brochure site, a booking workflow, a regulated-client intake portal and an integrated product dashboard have very different requirements. A builder can be the rational choice when speed and low operational overhead matter more than customization."
          },
          {
            "type": "paragraph",
            "text": "Define the visitor action first: request a consultation, book, buy, compare, apply, or manage an account. Then identify what must happen after that action. The workflow behind a button often determines the architecture more than the appearance of the homepage."
          }
        ]
      },
      {
        "heading": "Where a website builder is a strong option",
        "blocks": [
          {
            "type": "list",
            "items": [
              "You need a small, relatively standard site and can adapt the design to a proven template.",
              "You want nontechnical staff to make routine content changes without developer help.",
              "You can accept the platform's supported integrations, subscription model and export limitations.",
              "You prefer predictable platform maintenance over maintaining application infrastructure."
            ]
          },
          {
            "type": "paragraph",
            "text": "These are real advantages. Choosing a builder is not a compromise when it meets your requirements. The critical question is whether the future workflow stays inside the platform's capabilities."
          }
        ]
      },
      {
        "heading": "When custom development earns its cost",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Your site needs substantial integrations with internal tools, role-based access, or a custom workflow.",
              "The experience depends on domain-specific interactions rather than standard landing-page blocks.",
              "You need more control over performance-sensitive content, security boundaries or data handling.",
              "The website is the front end of a larger business system rather than a standalone brochure."
            ]
          },
          {
            "type": "paragraph",
            "text": "Custom code also creates continuing responsibilities: monitoring, dependency upgrades, backups, security review, accessibility testing and hosting decisions. Ask who owns these responsibilities after launch."
          }
        ]
      },
      {
        "heading": "Compare total ownership, not only launch price",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A useful comparison covers discovery, design, development, content migration, accessibility work, integrations, hosting, subscriptions, maintenance, analytics, support and the cost of future changes. A cheaper initial quote can be expensive if basic integrations require recurring plugins; conversely, a custom build is wasteful if a modest template would suffice."
          },
          {
            "type": "list",
            "items": [
              "Ask what files, content, source code and domains you can export if you leave.",
              "Ask who controls the analytics property, search account, DNS and deployment credentials.",
              "Ask for a clear change process and a maintenance budget instead of a vague support promise.",
              "List features that are necessary on day one separately from ideas that can wait."
            ]
          }
        ]
      },
      {
        "heading": "A simple decision exercise",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Write down your five highest-value customer journeys. Rate each as standard or highly tailored, and note every outside system involved. If nearly everything is standard and supported by a builder, test a builder first. If the central journeys require custom logic and multiple integrations, commission discovery before choosing a stack."
          },
          {
            "type": "callout",
            "text": "A bespoke proposal should explain why each custom feature is necessary. More code is not automatically more value."
          }
        ]
      },
      {
        "heading": "Sources for further reading",
        "blocks": [
          {
            "type": "source",
            "label": "Google Search Central — helpful, people-first content",
            "href": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
          },
          {
            "type": "source",
            "label": "web.dev — Core Web Vitals explained",
            "href": "https://web.dev/articles/vitals"
          }
        ]
      }
    ]
  },
  {
    "slug": "ai-automation-small-business-where-to-start",
    "title": "AI Automation for Small Businesses: Where to Start Without Creating Risk",
    "metaDescription": "A practical approach to choosing your first AI automation: select a repeatable workflow, define approvals, measure errors and begin with a limited pilot.",
    "readingTime": "6 min read",
    "lastUpdated": "November 2026",
    "primaryKeyword": "AI automation for small business",
    "tags": [
      "AI",
      "Automation",
      "Operations",
      "International"
    ],
    "audience": "international",
    "publishedAt": "2026-11-04",
    "sections": [
      {
        "heading": "Choose a workflow, not an AI product",
        "blocks": [
          {
            "type": "paragraph",
            "text": "An effective first automation has a clear trigger, repeatable steps and an observable outcome. Examples include sorting incoming enquiries, preparing a draft reply, extracting structured fields from supplier documents, or creating a follow-up task in a CRM. Start with one workflow where people already understand what a correct result looks like."
          },
          {
            "type": "paragraph",
            "text": "A chatbot that can discuss everything is usually harder to assess than a tool that handles one bounded task. The latter can be compared with current work, tested against real examples and stopped safely when it cannot determine the next action."
          }
        ]
      },
      {
        "heading": "Map the current process before adding a model",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Trigger: what starts the work, and where does the input arrive?",
              "Inputs: which documents, records or tools provide the required facts?",
              "Rules: what decisions are deterministic and should be regular code?",
              "Exceptions: which cases need human judgment, consent or legal review?",
              "Output: what artifact, update or action marks completion?",
              "Evidence: what audit log allows someone to explain what happened?"
            ]
          },
          {
            "type": "paragraph",
            "text": "This map exposes opportunities for ordinary automation as well. A scheduling rule, form validation or API connection may solve part of the problem without any generative AI."
          }
        ]
      },
      {
        "heading": "Start with reversible, human-reviewed actions",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In a safe first pilot, the system can classify a request, assemble relevant context and produce a draft; a person approves sending, charging, deleting or changing a customer record. Separate reading from writing permissions. Limit which folders, accounts and records an automation can access, and make every material action traceable."
          },
          {
            "type": "paragraph",
            "text": "Do not enter confidential client information into a third-party tool without checking the service's contractual terms, retention controls and permitted uses. Data handling requirements vary by business and location."
          }
        ]
      },
      {
        "heading": "Define success before testing",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Time saved per completed task, including human review time.",
              "Accuracy on a representative test set and frequency of unhandled exceptions.",
              "False positives or incorrect actions, especially when the costs differ from false negatives.",
              "Time to recover from a failure, ability to undo a change and quality of logs.",
              "Maintenance cost and what happens when an external API or model changes."
            ]
          },
          {
            "type": "paragraph",
            "text": "Run a time-limited pilot with held-back examples. Compare the new process with the baseline and record failures instead of only showing the most convincing demonstration."
          }
        ]
      },
      {
        "heading": "An example: incoming website enquiries",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A bounded workflow might receive an enquiry, check whether contact details are present, classify the request as website, AI system or automation, attach relevant background information, and draft a suggested reply. An owner then confirms scope, availability and next steps. If the request concerns sensitive or unfamiliar matters, it goes to a person without an automated commitment."
          },
          {
            "type": "callout",
            "text": "Treat every AI-generated recommendation as a suggestion until the necessary validation and authority checks are complete."
          }
        ]
      },
      {
        "heading": "Questions to ask a developer",
        "blocks": [
          {
            "type": "list",
            "items": [
              "What exactly does the system do when it is uncertain?",
              "Which actions can happen automatically, and which require approval?",
              "Where are credentials stored, and who can revoke them?",
              "How are errors reported and changes rolled back?",
              "Who maintains prompts, integrations, models and quality checks after delivery?"
            ]
          }
        ]
      },
      {
        "heading": "Reference",
        "blocks": [
          {
            "type": "source",
            "label": "Google Search Central — explaining who, how and why content is produced",
            "href": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
          }
        ]
      }
    ]
  },
  {
    "slug": "website-redesign-checklist-before-hiring",
    "title": "Website Redesign Checklist: What to Prepare Before Hiring a Developer",
    "metaDescription": "A practical redesign brief covering goals, content, user journeys, analytics, integrations, SEO preservation, ownership and launch checks.",
    "readingTime": "6 min read",
    "lastUpdated": "November 2026",
    "primaryKeyword": "website redesign checklist",
    "tags": [
      "Websites",
      "Briefing",
      "International"
    ],
    "audience": "international",
    "publishedAt": "2026-11-04",
    "sections": [
      {
        "heading": "Define the business problem",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A redesign should solve a specific problem: customers cannot find the right service, the mobile site is difficult to use, staff cannot update content, or new operations require integrations. Write down the problem and what improvement would count as success. Better-looking is a preference; clearer bookings or fewer support enquiries are outcomes that can be examined."
          }
        ]
      },
      {
        "heading": "Collect the essentials in one brief",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Current domain and pages, plus any sites or applications that depend on them.",
              "Primary audiences and their top three tasks.",
              "The core offer, supporting evidence and content owner for each page.",
              "A list of required integrations, forms, payment methods, booking flows and CRM connections.",
              "Existing brand assets, imagery, legal notices and accessibility requirements.",
              "Budget range, key dates, decision maker and how approvals will happen."
            ]
          },
          {
            "type": "paragraph",
            "text": "Separate 'must have at launch' from 'possible later'. This makes a phased delivery easier to scope and prevents the design from becoming a substitute for prioritization."
          }
        ]
      },
      {
        "heading": "Do not lose working search traffic",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Before changing URLs, export the current page inventory and identify which pages have visitors, rankings or valuable incoming links. Match old URLs to equivalent replacement pages, maintain accurate canonical tags, and update internal links and XML sitemaps. Do not redirect unrelated content to the homepage just to hide it. If a genuinely retired page has no successor, decide whether to return an appropriate 404 or 410."
          },
          {
            "type": "paragraph",
            "text": "A redesign is also a chance to check titles, headings, crawlability and language alternatives. If you serve multiple languages, only annotate pages that really provide equivalent translated content."
          },
          {
            "type": "source",
            "label": "Google Search Central — site moves with URL changes",
            "href": "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes"
          }
        ]
      },
      {
        "heading": "Make quality observable",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Check real mobile behavior with touch, keyboard and screen readers where possible.",
              "Measure load performance using the actual page and device context rather than an unverified speed promise.",
              "Verify every important form, email route, payment step and analytics event.",
              "Test empty states, errors, loading states, privacy consent and reduced-motion preferences.",
              "Check whether staff can actually edit the content they are expected to maintain."
            ]
          },
          {
            "type": "paragraph",
            "text": "An approved mockup is not an accepted release. Keep a staging environment and a written acceptance checklist that describes functional outcomes."
          }
        ]
      },
      {
        "heading": "Plan ownership and the first month after launch",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Document who controls the domain, hosting account, source repository, analytics, search console, backups and third-party services. Decide who monitors forms and error logs, handles dependency updates, restores backups and responds when something stops working."
          },
          {
            "type": "paragraph",
            "text": "The most useful handoff is not a PDF full of screenshots; it is a tested, recoverable system with clear ownership and a short operating guide."
          }
        ]
      },
      {
        "heading": "Further references",
        "blocks": [
          {
            "type": "source",
            "label": "web.dev — Web Vitals",
            "href": "https://web.dev/articles/vitals"
          },
          {
            "type": "source",
            "label": "Google Search Central — sitemap guidance",
            "href": "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap"
          }
        ]
      }
    ]
  },
  {
    "slug": "website-cost-georgia-2026",
    "title": "Website Costs in Georgia in 2026: How to Compare Quotes Fairly",
    "metaDescription": "How to evaluate website development quotes in Georgia without relying on misleading universal price lists. Scope, ownership, content, integrations and support explained.",
    "readingTime": "6 min read",
    "lastUpdated": "November 2026",
    "primaryKeyword": "website cost Georgia 2026",
    "tags": [
      "Georgia",
      "Websites",
      "Budgeting"
    ],
    "audience": "georgia",
    "publishedAt": "2026-04-17",
    "sections": [
      {
        "heading": "Why a single market price is misleading",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Two website quotations can describe very different work. A template landing page with client-supplied copy is not equivalent to a multilingual site with custom design, booking, content migration, analytics and business integrations. In Georgia, as elsewhere, ask for comparable scope before comparing final amounts."
          },
          {
            "type": "paragraph",
            "text": "This updated guide intentionally does not present unsourced agency price ranges as verified market facts. Supplier prices and project terms change. Obtain dated, written quotations for the same requirements before making a budget decision."
          }
        ]
      },
      {
        "heading": "What should appear in a quote",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Discovery: meetings, page inventory, requirements and content responsibilities.",
              "Design: templates versus original layouts, number of revisions and mobile treatment.",
              "Build: forms, CMS, payment, booking or CRM connections and any ongoing licenses.",
              "Search: redirects, metadata, structured data when appropriate, sitemap and analytics setup.",
              "Handover: domain ownership, source files, account access, training, warranties and support.",
              "Operation: annual hosting, maintenance and realistic future-change costs."
            ]
          }
        ]
      },
      {
        "heading": "Compare three comparable proposals",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Give each provider the same brief, then ask them to mark inclusions, exclusions, assumptions and delivery responsibilities. Check which fees are recurring. If a quote includes unusually fast delivery, ask what is already designed and what testing is included. Request examples with similar complexity rather than unrelated visual showpieces."
          },
          {
            "type": "paragraph",
            "text": "A developer using a website builder may be the most economical choice for a straightforward page. Custom engineering becomes valuable when business logic and integrations create requirements a builder cannot reasonably satisfy."
          }
        ]
      },
      {
        "heading": "Genezisi's approach",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Genezisi no longer advertises predefined website prices. Projects are scoped individually: we first establish the business need, then define an appropriate implementation, deliverables and support responsibilities. We can discuss websites independently of AI or automation work."
          },
          {
            "type": "callout",
            "text": "Budgeting takeaway: compare the same scope, verify ongoing costs, and insist on ownership and maintenance terms in writing."
          }
        ]
      },
      {
        "heading": "Related reading",
        "blocks": [
          {
            "type": "source",
            "label": "How to choose between a website builder and custom development",
            "href": "/en/blog/custom-website-vs-website-builder"
          }
        ]
      }
    ]
  },
  {
    "slug": "digital-business-card-vs-paper",
    "title": "Digital Business Cards vs Paper Cards: Practical Trade-offs",
    "metaDescription": "Compare physical and digital business cards for networking, accessibility, cost, privacy and long-term maintenance. No product sales pitch.",
    "readingTime": "6 min read",
    "lastUpdated": "November 2026",
    "primaryKeyword": "digital business card vs paper",
    "tags": [
      "Networking",
      "Digital identity",
      "Georgia"
    ],
    "audience": "georgia",
    "publishedAt": "2026-04-17",
    "sections": [
      {
        "heading": "The two formats solve different moments",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Paper works without internet access or a smartphone, is easy to hand across a table and does not depend on a service provider keeping a URL live. Digital cards can hold richer contact information, links and updated details, and may support phone-friendly sharing through a QR code or message."
          },
          {
            "type": "paragraph",
            "text": "There is no universal winner. For formal networking or audiences with limited connectivity, paper may be reliable. For teams that change contact details often or maintain current profiles, digital distribution can simplify updates."
          }
        ]
      },
      {
        "heading": "Consider permanence and privacy",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Who owns the web address and can continue hosting the card if a vendor closes?",
              "Will a QR code still work in a year, and does it redirect through a third party?",
              "Which contact details are publicly visible or searchable?",
              "Can a recipient save the information without creating an account?",
              "Can the information be exported to a standard format if needed?"
            ]
          }
        ]
      },
      {
        "heading": "A sensible hybrid",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A small printed card can display a name, a basic contact method and a QR code pointing to a maintained web profile. The printed information remains usable if the code is unavailable. The online profile can provide supplementary information and links."
          }
        ]
      },
      {
        "heading": "About Genezisi's former product",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Genezisi previously offered digital-business-card creation. It no longer accepts new digital-card orders, but existing published customer links remain operational under their applicable arrangements. This article is a comparison guide, not a sales page."
          },
          {
            "type": "callout",
            "text": "If you already rely on a hosted digital card, confirm the renewal terms, backup plan and ownership of its address."
          }
        ]
      },
      {
        "heading": "Related reading",
        "blocks": [
          {
            "type": "source",
            "label": "How to compare website costs and contracts",
            "href": "/en/blog/website-cost-georgia-2026"
          }
        ]
      }
    ]
  },
  {
    "slug": "facebook-page-costing-customers-georgia",
    "title": "Is a Facebook Page Enough for a Georgian Business?",
    "metaDescription": "Understand when social profiles are sufficient and when a website helps with search visibility, ownership, booking and customer journeys.",
    "readingTime": "6 min read",
    "lastUpdated": "November 2026",
    "primaryKeyword": "facebook page vs website Georgia",
    "tags": [
      "Georgia",
      "Websites",
      "Social media"
    ],
    "audience": "georgia",
    "publishedAt": "2026-04-17",
    "sections": [
      {
        "heading": "Social networks and websites do different jobs",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A Facebook or Instagram page can be useful for discovery, community and direct messages. A website gives the business greater control over service descriptions, page structure, search-accessible content and integrations. Many businesses benefit from both instead of abandoning either one."
          }
        ]
      },
      {
        "heading": "When social-only can be sufficient",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Customers mainly return from existing relationships and direct referrals.",
              "You have a simple offer and a reliable messaging process.",
              "Your team can keep operating within the platform's communication and commerce limitations."
            ]
          },
          {
            "type": "paragraph",
            "text": "There is no evidence that simply launching a website guarantees additional leads. It must answer real questions and provide a clear next step."
          }
        ]
      },
      {
        "heading": "Signals you may need a website",
        "blocks": [
          {
            "type": "list",
            "items": [
              "People repeatedly ask the same questions about services, location, pricing approach or availability.",
              "Appointments or orders require information that is awkward to handle in messages.",
              "You need structured product/service pages accessible through search.",
              "You want to connect forms with calendars, CRM software, email or internal workflows.",
              "You want an independently controlled home for documentation, policies or customer support."
            ]
          }
        ]
      },
      {
        "heading": "A practical first site",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Start with the minimum useful set of pages: a clear offer, evidence of work, common questions and a dependable contact or booking route. Use the social profile to drive visitors to the relevant page. Measure which enquiries come through each channel and improve the handoff."
          }
        ]
      },
      {
        "heading": "Avoid artificial performance claims",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Do not assume a generic conversion uplift or a fixed lead multiple. Outcomes depend on demand, competition, content quality, search visibility and how enquiries are handled. Test the actual journey before investing in complex automation."
          }
        ]
      },
      {
        "heading": "Related reading",
        "blocks": [
          {
            "type": "source",
            "label": "Website redesign checklist for international teams",
            "href": "/en/blog/website-redesign-checklist-before-hiring"
          }
        ]
      }
    ]
  },
  {
    "slug": "georgian-businesses-invisible-online",
    "title": "Why Some Georgian Businesses Are Hard to Find Online",
    "metaDescription": "A useful visibility checklist for Georgian businesses: accurate details, helpful service pages, navigation, indexing and customer enquiry routes.",
    "readingTime": "6 min read",
    "lastUpdated": "November 2026",
    "primaryKeyword": "Georgian business online visibility",
    "tags": [
      "Georgia",
      "Local visibility",
      "Websites"
    ],
    "audience": "georgia",
    "publishedAt": "2026-04-17",
    "sections": [
      {
        "heading": "Discoverability is more than having an account",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A business can have an active social page yet still be hard to find when someone searches for a specific service. The issue may be unclear naming, missing service descriptions, inconsistent contact details, unindexed pages or no answer to the searcher's actual question."
          }
        ]
      },
      {
        "heading": "Start by checking the basics",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Can people find your business name and principal service without already knowing your social handle?",
              "Are your contact, location and opening details accurate wherever you publish them?",
              "Does the main website clearly describe what you offer and where you operate?",
              "Can a visitor complete the intended action on a phone without hunting through menus?",
              "Do important pages return valid HTTP responses and have descriptive titles?"
            ]
          }
        ]
      },
      {
        "heading": "Make services understandable",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Create distinct, useful explanations for materially different services. Avoid filling pages with repeated location keywords. Include what the service involves, who it is for, the normal next step, and genuine examples where possible."
          },
          {
            "type": "paragraph",
            "text": "If the business serves English-speaking visitors as well as Georgian-speaking customers, translate the important content properly. A language switch that only translates a menu does not create a complete localized service page."
          }
        ]
      },
      {
        "heading": "Measure the whole journey",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Check search visibility alongside real enquiries, bookings and sales, rather than focusing solely on rankings. Review which pages visitors reach, whether contact paths work, and what questions remain unanswered. Treat every number as a measurement to verify, not a marketing claim."
          }
        ]
      },
      {
        "heading": "Genezisi's current scope",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Genezisi works with businesses internationally on bespoke websites, AI systems and automation. These recommendations are equally useful for businesses outside Georgia; the checklist is written with the original Georgian search audience in mind."
          }
        ]
      },
      {
        "heading": "Reference",
        "blocks": [
          {
            "type": "source",
            "label": "Google Search Central — Search Essentials",
            "href": "https://developers.google.com/search/docs/essentials"
          }
        ]
      }
    ]
  }
];

export function getAllArticles(): BlogArticle[] {
  return [...articles].sort((a, b) => {
    if (a.audience !== b.audience) return a.audience === "international" ? -1 : 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find(article => article.slug === slug);
}
export function getAllSlugs(): string[] { return articles.map(article => article.slug); }
