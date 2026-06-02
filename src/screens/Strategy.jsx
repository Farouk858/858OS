import { useState } from 'react'

const TABS = [
  { key: 'studio858', label: 'Studio858', color: '#00FF41' },
  { key: 'artclub', label: 'Art Club', color: '#5aabf5' },
  { key: 'f8', label: 'F8', color: '#EF9F27' },
  { key: 'brand', label: 'Brand Rules', color: '#a88bfa' },
]

function Section({ title, color = '#888', children }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color }}>{title}</span>
        <div className="flex-1 h-px" style={{ backgroundColor: color + '30' }} />
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Row({ label, value, valueColor }) {
  return (
    <div className="flex items-start gap-3 py-1.5 border-b border-border last:border-0">
      <span className="text-xs font-medium tracking-wider uppercase text-grey flex-shrink-0 w-32 pt-0.5">{label}</span>
      <span className="text-sm leading-relaxed flex-1" style={{ color: valueColor || '#ffffff' }}>{value}</span>
    </div>
  )
}

function Block({ children }) {
  return (
    <div className="bg-card1 border border-border rounded p-4 mb-3">{children}</div>
  )
}

function Bullet({ color = '#00FF41', children }) {
  return (
    <div className="flex items-start gap-3 py-1">
      <span className="text-xs mt-1 flex-shrink-0" style={{ color }}>▸</span>
      <span className="text-sm leading-relaxed text-white">{children}</span>
    </div>
  )
}

function No({ children }) {
  return (
    <div className="flex items-start gap-3 py-1">
      <span className="text-xs mt-1 flex-shrink-0 text-red-400">✕</span>
      <span className="text-sm leading-relaxed text-red-300">{children}</span>
    </div>
  )
}

function Quote({ children }) {
  return (
    <div className="border-l-2 border-green/40 pl-4 py-1 my-2">
      <p className="text-base font-semibold text-white leading-snug italic">"{children}"</p>
    </div>
  )
}

// ─── STUDIO858 ───────────────────────────────────────────────────────────────

function Studio858Tab() {
  return (
    <div>
      <Block>
        <Quote>We don't make ads. We make things people choose to be part of.</Quote>
        <p className="text-xs font-medium tracking-widest text-grey uppercase mt-3">Tagline</p>
        <p className="text-sm text-white mt-1">Simple Thinking. Creative Creative.</p>
      </Block>

      <Block>
        <Section title="What We Are" color="#00FF41">
          <Bullet>A creative studio that builds cultural moments, not marketing material.</Bullet>
          <Bullet>We work at the intersection of brand, community, and experience.</Bullet>
          <Bullet>We make work that earns attention — not work that buys it.</Bullet>
          <Bullet>Clients come to us when they want to mean something, not just sell something.</Bullet>
        </Section>
      </Block>

      <Block>
        <Section title="What We Are Not" color="#ef4444">
          <No>A full-service creative agency</No>
          <No>A production house that executes other people's ideas</No>
          <No>Cheap, fast, or available to everyone</No>
          <No>Interested in safe, forgettable work</No>
        </Section>
      </Block>

      <Block>
        <Section title="Target Client" color="#00FF41">
          <Bullet>Brands with a story that hasn't been told right yet.</Bullet>
          <Bullet>Founders who have taste and want a partner, not a supplier.</Bullet>
          <Bullet>Companies ready to invest in culture, not just content.</Bullet>
          <Bullet>Businesses that understand long-term brand equity over short-term impressions.</Bullet>
        </Section>
      </Block>

      <Block>
        <Section title="Service Packages" color="#00FF41">
          <Row label="EXPERIENTIAL" value="£10,000+ — Full cultural moment. Concept, production, amplification. Built around a specific cultural tension or community moment." />
          <Row label="SPARK" value="£6,000 — Single activation or campaign. One strong idea, executed properly. 3–4 week turnaround." />
          <Row label="IGNITE" value="£11,000 — Brand foundation sprint. Positioning, visual identity, tone of voice, launch strategy. For new brands or rebrands." />
          <Row label="RETAINER" value="£2,500–4,000/mo — Ongoing creative partnership. Monthly deliverables agreed upfront. 3-month minimum. Target: £9k/mo by month 9." />
        </Section>
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green flex-shrink-0" />
            <span className="text-sm font-semibold text-green">50% upfront on every project. Always. Non-negotiable.</span>
          </div>
          <p className="text-xs text-grey mt-1.5 ml-4">This is not a policy. It is a statement about the kind of client relationship we have. If they won't pay 50% upfront, they're not the right client.</p>
        </div>
      </Block>

      <Block>
        <Section title="How to Pitch" color="#00FF41">
          <Bullet>Arrive with one direction. Not three options. One clear, confident direction.</Bullet>
          <Bullet>Lead with the cultural moment — what's happening in the world right now that makes this necessary?</Bullet>
          <Bullet>The pitch itself should feel like the experience. If we're pitching an immersive event, the pitch should be immersive.</Bullet>
          <Bullet>Show work that proves we understand their audience better than they do.</Bullet>
          <Bullet>Price last. Value first. Never apologise for the number.</Bullet>
          <Bullet>Leave with a clear next step. Not "we'll be in touch."</Bullet>
        </Section>
      </Block>

      <Block>
        <Section title="Objection Handling" color="#888">
          <Row label={`"IT'S TOO EXPENSIVE"`} value="Then it's not the right fit right now. Don't negotiate the price — negotiate the scope. Or walk." />
          <Row label={`"CAN YOU DO IT CHEAPER?"`} value="We can do a smaller version of this. Here's what that looks like. But we won't do the full thing for less." />
          <Row label={`"WE NEED TO THINK ABOUT IT"`} value="What specifically are you unsure about? If there's no specific objection, it's a soft no. Move on." />
          <Row label={`"WE HAVE AN INTERNAL TEAM"`} value="Great — we make internal teams better. We're not here to replace them, we're here to push them." />
        </Section>
      </Block>

      <Block>
        <Section title="Language Rules" color="#ef4444">
          <No>"I hope this finds you well" — never open an email this way</No>
          <No>"Please find attached" — just send it, no preamble</No>
          <No>"Full service creative agency" — we are not that</No>
          <No>"Whatever you need" — we lead, we don't follow</No>
          <No>"Does that make sense?" — confidence, always</No>
          <No>Exclamation marks in business communication — unprofessional</No>
        </Section>
      </Block>

      <Block>
        <Section title="Growth Path" color="#00FF41">
          <Row label="MONTH 1–3" value="2 project clients + 1 retainer. Proof of concept. Build case studies." />
          <Row label="MONTH 4–6" value="3 retainers at £2.5k each. Selective project work only." />
          <Row label="MONTH 7–9" value="Retainers scaling to £3–4k. Referral pipeline established." />
          <Row label="MONTH 9+" value="£9k/mo retainer target hit. Team of 2–3. Selective experiential only." />
        </Section>
      </Block>
    </div>
  )
}

// ─── ART CLUB ────────────────────────────────────────────────────────────────

function ArtClubTab() {
  return (
    <div>
      <Block>
        <Quote>The door was closed. We built a new one.</Quote>
        <div className="mt-3 border-l-2 pl-4 py-1" style={{ borderColor: '#5aabf5' + '60' }}>
          <p className="text-sm text-white leading-relaxed italic">"We make spaces for artists to thrive. Then we get out of the way."</p>
        </div>
      </Block>

      <Block>
        <Section title="What We Are" color="#5aabf5">
          <Bullet color="#5aabf5">A community-led creative space that removes the gatekeepers.</Bullet>
          <Bullet color="#5aabf5">We run events that teach, connect, and celebrate artists at every level.</Bullet>
          <Bullet color="#5aabf5">We don't curate who gets to be an artist. We create space for everyone who wants to be.</Bullet>
          <Bullet color="#5aabf5">The 858 share funds the mission. The artist share respects their work.</Bullet>
        </Section>
      </Block>

      <Block>
        <Section title="Revenue Splits (858 Share)" color="#5aabf5">
          <Row label="BOOTCAMP" value="60% to 858 / 40% to facilitator" />
          <Row label="SIP & PAINT" value="70% to 858 / 30% to artist host" />
          <Row label="pARTy" value="75% to 858 / 25% to artist(s)" />
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5aabf5' }} />
              <span className="text-xs text-grey leading-relaxed">Free Monday open sessions — never charge for this, ever. This is the community foundation. It is what earns us the right to charge for everything else.</span>
            </div>
          </div>
        </Section>
      </Block>

      <Block>
        <Section title="DJ Bootcamp" color="#5aabf5">
          <Row label="FORMAT" value="6-week progressive programme. Fundamentals → mixing → performance. Max 8 participants per run." />
          <Row label="RUN 1 PRICE" value="£15 — deliberately low. Build trust, fill rooms, generate social proof." />
          <Row label="RUN 2 PRICE" value="£35 — enough proof to justify the increase. Alumni become advocates." />
          <Row label="RUN 3 PRICE" value="£50 — established product. Waitlist should exist before Run 3 launches." />
          <Row label="FACILITATOR" value="DJ with genuine community credibility. Not just skill — cultural standing." />
          <Row label="OUTCOMES" value="Participant showcase at pArty. Content for socials. Repeat bookings." />
        </Section>
      </Block>

      <Block>
        <Section title="Sip & Paint" color="#5aabf5">
          <Row label="FORMAT" value="2–3 hour guided painting session. Licensed venue or 858 space. BYOB or bar deal." />
          <Row label="TICKET PRICE" value="£30–40 per head" />
          <Row label="TARGET CAPACITY" value="18–20 people per session" />
          <Row label="NET REVENUE" value="~£494 per session (858 share after costs)" />
          <Row label="ARTIST HOST" value="Local artist who teaches and creates alongside participants. Paid from 30% split." />
          <Row label="UPSELL" value="Prints, original work, future event tickets. Artist sells their own work on the night." />
          <Row label="FREQUENCY" value="2x per month minimum once established. Same night, same venue — build ritual." />
        </Section>
      </Block>

      <Block>
        <Section title="pARTy" color="#5aabf5">
          <Row label="FORMAT" value="Art-meets-nightlife event. Performances, installations, music, drink. 3–4 hours." />
          <Row label="TICKET PRICE" value="£8–15 tiered / stacked pricing" />
          <Row label="NET REVENUE" value="~£1,274 per event (858 share)" />
          <Row label="CAPACITY" value="80–120 people. Intimate enough to feel exclusive, big enough to be financially viable." />
          <Row label="PROGRAMME" value="Live art, DJ set, interactive installations, artist spotlights. No dead moments." />
          <Row label="F8 INTEGRATION" value="pArty is the first drop point for F8 releases. Community gets first access." />
          <Row label="FREQUENCY" value="Monthly. Consistent date (e.g. last Friday). Build anticipation through calendar fixture." />
        </Section>
      </Block>

      <Block>
        <Section title="Annual Revenue Target" color="#5aabf5">
          <Row label="Q1" value="£2,500" />
          <Row label="Q2" value="£6,000" />
          <Row label="Q3" value="£9,000" />
          <Row label="Q4" value="£10,500" />
          <Row label="ANNUAL TOTAL" value="£28,000+ (858 share only)" valueColor="#5aabf5" />
        </Section>
      </Block>

      <Block>
        <Section title="Community Strategy" color="#5aabf5">
          <Bullet color="#5aabf5">Free Monday sessions are non-negotiable — they are the trust-builder for everything else.</Bullet>
          <Bullet color="#5aabf5">Every paid event should feel like you're getting something you can't find elsewhere.</Bullet>
          <Bullet color="#5aabf5">Document everything. Every session, every piece, every face. Content is always being created.</Bullet>
          <Bullet color="#5aabf5">Alumni become facilitators. Growth comes from within the community.</Bullet>
          <Bullet color="#5aabf5">Partner with local venues, not just for cost — for their audience crossover.</Bullet>
        </Section>
      </Block>
    </div>
  )
}

// ─── F8 ──────────────────────────────────────────────────────────────────────

function F8Tab() {
  return (
    <div>
      <Block>
        <Quote>Not for everyone. Made by someone.</Quote>
        <div className="mt-3 border-l-2 pl-4 py-1" style={{ borderColor: '#EF9F27' + '60' }}>
          <p className="text-sm text-white leading-relaxed italic">"For the ones who get it."</p>
        </div>
      </Block>

      <Block>
        <Section title="Brand Identity" color="#EF9F27">
          <Bullet color="#EF9F27">F8 is not a clothing brand. F8 is a statement that clothing carries.</Bullet>
          <Bullet color="#EF9F27">The product is the proof. The community is the brand.</Bullet>
          <Bullet color="#EF9F27">F8 exists at the intersection of art, music, and the streets.</Bullet>
          <Bullet color="#EF9F27">Every piece is made intentionally. If it doesn't mean something, it doesn't get made.</Bullet>
          <Bullet color="#EF9F27">Scarcity is by design, not by accident. Limited runs. No restocks.</Bullet>
        </Section>
      </Block>

      <Block>
        <Section title="Target Customer" color="#EF9F27">
          <Row label="WHO" value="18–30. Creative. Community-connected. Buys into stories, not just products." />
          <Row label="WHERE" value="At events. Online after. Never in stores." />
          <Row label="MINDSET" value="They want to be part of something. F8 gives them something worth being part of." />
          <Row label="THEY SAY" value={`"Where'd you get that?" is the desired outcome of every purchase.`} />
        </Section>
      </Block>

      <Block>
        <Section title="Pricing Architecture" color="#EF9F27">
          <Row label="GRAPHIC TEE" value="£45–65 — Drop 1 anchor piece. Bold, single graphic. Heavyweight blank." />
          <Row label="TRACKSUIT" value="£120–180 — Future drop. Co-ord sets. Embroidery or screen print." />
          <Row label="ACCESSORIES" value="TBD — hats, totes, bags as drop add-ons." />
          <div className="mt-3 pt-3 border-t border-border">
            <No>Never discount. Not even at end of run.</No>
            <div className="flex items-start gap-3 py-1 mt-1">
              <span className="text-xs mt-1 flex-shrink-0" style={{ color: '#EF9F27' }}>▸</span>
              <span className="text-sm text-white">Unsold pieces are gifted to artists or held for future context. They never get cheaper.</span>
            </div>
          </div>
        </Section>
      </Block>

      <Block>
        <Section title="Drop 1 — Execution Plan" color="#EF9F27">
          <Row label="PRODUCT" value="Bold graphic tee. Single hero design. 2 colourways max." />
          <Row label="QUANTITY" value="50+ units minimum. Limited enough to sell out. Large enough to have impact." />
          <Row label="FIRST RELEASE" value="pArty event — community gets first access. In-person only. Cash and card." />
          <Row label="ONLINE RELEASE" value="48 hours after the event. Remaining stock only. No special allocation." />
          <Row label="CONTENT" value="Behind-the-scenes of the making. The event. The reactions. Not product shots." />
          <Row label="PRICING" value="£55 at event / £60 online — event price is the reward for showing up." />
        </Section>
      </Block>

      <Block>
        <Section title="Drop Model" color="#EF9F27">
          <Bullet color="#EF9F27">A drop is an event. Not a product release. The event creates the context for the product to mean something.</Bullet>
          <Bullet color="#EF9F27">Build anticipation 2–3 weeks before. Cryptic. No full reveals. Let the community speculate.</Bullet>
          <Bullet color="#EF9F27">The first 48 hours define the narrative. Document everything from the moment it drops.</Bullet>
          <Bullet color="#EF9F27">Collaborations with artists from Art Club give the work credibility and extend the audience.</Bullet>
          <Bullet color="#EF9F27">Drop frequency: no more than 3–4 per year. Scarcity of drops = scarcity of product.</Bullet>
        </Section>
      </Block>

      <Block>
        <Section title="Marketing Rules" color="#EF9F27">
          <No>No paid ads for drops — if you need to pay for attention, the drop wasn't interesting enough.</No>
          <No>No influencer gifting to people outside the community — it's inauthentic and they'll see through it.</No>
          <No>No generic product flat-lays — the work deserves better photography than that.</No>
          <Bullet color="#EF9F27">Organic only. Community-driven. The audience is the marketing.</Bullet>
          <Bullet color="#EF9F27">Art Club is the marketing machine for F8. Same community. Natural crossover.</Bullet>
          <Bullet color="#EF9F27">Document the process, not the product. People buy the story.</Bullet>
        </Section>
      </Block>

      <Block>
        <Section title="Future Drops" color="#EF9F27">
          <Row label="DROP 2" value="Tracksuit + artist collab piece. 6–9 months after Drop 1." />
          <Row label="DROP 3" value="Expanded colourways + potential pop-up. 12 months in." />
          <Row label="LONG TERM" value="F8 as a fashion event series. Drops become seasonal happenings." />
        </Section>
      </Block>
    </div>
  )
}

// ─── BRAND RULES ─────────────────────────────────────────────────────────────

function BrandRulesTab() {
  const rules = [
    {
      n: 1,
      rule: 'Never sound like everyone else.',
      detail: 'Read your copy back. If a competitor could have written it, rewrite it. Our voice is specific, direct, and culturally aware. It never defaults to corporate safe language.',
    },
    {
      n: 2,
      rule: 'Lead with culture not credentials.',
      detail: 'Don\'t open with "we\'ve been in business for X years" or "we\'ve worked with X clients." Open with what\'s happening in the world right now and how we relate to it. Credentials follow relevance.',
    },
    {
      n: 3,
      rule: 'Protect the work even when uncomfortable.',
      detail: 'When a client asks us to water something down, we explain why the original works better. We fight for the idea before we concede. If we concede without a fight, we failed the work.',
    },
    {
      n: 4,
      rule: 'Community always first.',
      detail: 'Before any commercial decision — ask how it affects the community we\'ve built. Short-term revenue that erodes community trust is never worth it. The community is the business.',
    },
    {
      n: 5,
      rule: 'Document everything in real time.',
      detail: 'Every session, event, shoot, and conversation is content. We are always making. The archive is the brand. If it wasn\'t captured, it didn\'t fully happen.',
    },
    {
      n: 6,
      rule: 'Confidence is the tone — never desperation.',
      detail: 'We don\'t chase. We don\'t beg. We don\'t say "just checking in." We make great work and people come to us. Every piece of communication should feel like it comes from a place of abundance, not need.',
    },
    {
      n: 7,
      rule: 'moreArt. moreNoise. — the test for every decision.',
      detail: 'Before every output, every post, every campaign, every collab — ask: does this add more art to the world? Does this make more meaningful noise? If the answer to both is no, it doesn\'t go out.',
    },
  ]

  return (
    <div>
      <Block>
        <h2 className="font-bold text-white leading-none mb-2" style={{ fontSize: '36px', letterSpacing: '-0.01em' }}>
          moreArt.<br />moreNoise.
        </h2>
        <p className="text-xs font-medium tracking-widest text-grey uppercase mt-3">The standard every decision is measured against</p>
      </Block>

      <div className="space-y-3 mb-4">
        {rules.map(({ n, rule, detail }) => (
          <Block key={n}>
            <div className="flex items-start gap-3">
              <span className="text-xs font-medium mt-0.5 flex-shrink-0 w-5" style={{ color: '#a88bfa' }}>{n}.</span>
              <div>
                <p className="text-sm font-semibold text-white mb-1.5">{rule}</p>
                <p className="text-sm text-grey leading-relaxed">{detail}</p>
              </div>
            </div>
          </Block>
        ))}
      </div>

      <Block>
        <p className="text-xs font-medium tracking-widest text-grey uppercase mb-3">Cross-venture principles</p>
        <div className="space-y-2">
          <Bullet color="#a88bfa">Studio858, Art Club, and F8 share one voice — distinct contexts, same values.</Bullet>
          <Bullet color="#a88bfa">We don't compartmentalise. A move in one venture strengthens the others.</Bullet>
          <Bullet color="#a88bfa">The 858 brand is the parent. Everything underneath it inherits its integrity.</Bullet>
          <Bullet color="#a88bfa">We grow through culture, not advertising. The work earns its own audience.</Bullet>
        </div>
      </Block>

      <Block>
        <p className="text-xs font-medium tracking-widest text-grey uppercase mb-3">What we never compromise</p>
        <No>The quality of the work</No>
        <No>The community's trust</No>
        <No>Our pricing (desperation pricing is brand damage)</No>
        <No>The tone of voice (even in casual contexts)</No>
        <No>Our position on what we are and aren't</No>
      </Block>
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function Strategy() {
  const [activeTab, setActiveTab] = useState('studio858')

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-4">
        <h1 className="font-bold text-4xl text-white tracking-tight">Strategy</h1>
        <p className="text-xs font-medium tracking-widest text-grey mt-1 uppercase">Read-only reference</p>
      </div>

      <div className="px-4 flex gap-2 overflow-x-auto pb-3 scrollbar-none flex-shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-shrink-0 text-xs font-medium px-4 py-2 rounded border transition-all duration-150 tracking-wider uppercase"
            style={
              activeTab === tab.key
                ? { backgroundColor: tab.color + '20', borderColor: tab.color, color: tab.color }
                : { backgroundColor: 'transparent', borderColor: '#1e1e1e', color: '#888' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {activeTab === 'studio858' && <Studio858Tab />}
        {activeTab === 'artclub' && <ArtClubTab />}
        {activeTab === 'f8' && <F8Tab />}
        {activeTab === 'brand' && <BrandRulesTab />}
      </div>
    </div>
  )
}
