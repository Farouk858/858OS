import { useState } from 'react'
import { StrategySection, StrategyItem, StrategyRule } from '../components/StrategyTab'

const TABS = [
  { key: 'studio858', label: 'Studio858', color: '#00FF41' },
  { key: 'artclub', label: 'Art Club', color: '#5aabf5' },
  { key: 'f8', label: 'F8', color: '#EF9F27' },
  { key: 'brand', label: 'Brand Rules', color: '#a88bfa' },
]

function Studio858Tab() {
  return (
    <div className="space-y-3">
      <StrategySection title="Identity">
        <StrategyItem label="USP" value="We don't make ads. We make things people choose to be part of." />
        <StrategyItem label="TAGLINE" value="Simple Thinking. Creative Creative." />
      </StrategySection>

      <StrategySection title="Pricing">
        <StrategyItem label="EXPERIENTIAL" value="£10k+" />
        <StrategyItem label="SPARK" value="£6k" />
        <StrategyItem label="IGNITE" value="£11k" />
        <StrategyItem label="RETAINER" value="£2.5–4k/mo" />
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green flex-shrink-0" />
            <span className="font-dm text-sm text-white">50% upfront always ~ non-negotiable</span>
          </div>
        </div>
      </StrategySection>

      <StrategySection title="How to Pitch">
        <div className="space-y-2">
          {[
            'One strong direction only ~ never present options',
            'Lead with cultural moment, not credentials',
            'The pitch IS the experience ~ make it unforgettable',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-green text-xs mt-0.5">→</span>
              <span className="font-dm text-sm text-white leading-relaxed">{rule}</span>
            </div>
          ))}
        </div>
      </StrategySection>

      <StrategySection title="Never Say">
        <div className="space-y-2">
          {[
            '"full service creative agency"',
            '"I hope this finds you well"',
            '"please find attached"',
          ].map((phrase, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-red-400 text-xs mt-0.5">✕</span>
              <span className="font-mono-space text-xs text-red-300">{phrase}</span>
            </div>
          ))}
        </div>
      </StrategySection>
    </div>
  )
}

function ArtClubTab() {
  return (
    <div className="space-y-3">
      <StrategySection title="Identity">
        <StrategyItem label="USP 1" value="The door was closed. We built a new one." />
        <StrategyItem label="USP 2" value="We make spaces for artists to thrive. Then we get out of the way." />
      </StrategySection>

      <StrategySection title="Revenue Splits (858 Share)">
        <StrategyItem label="BOOTCAMP" value="60/40" />
        <StrategyItem label="SIP & PAINT" value="70/30" />
        <StrategyItem label="pARTy" value="75/25" />
      </StrategySection>

      <StrategySection title="Pricing">
        <div className="space-y-3">
          <div>
            <p className="font-mono-space text-xs text-grey mb-1.5">DJ BOOTCAMP</p>
            <div className="space-y-1">
              <StrategyItem label="Run 1" value="£15" />
              <StrategyItem label="Run 2" value="£35" />
              <StrategyItem label="Run 3" value="£50" />
            </div>
          </div>
          <div>
            <p className="font-mono-space text-xs text-grey mb-1.5">SIP & PAINT</p>
            <StrategyItem label="TICKET" value="£30–40 / ~£494 net" />
          </div>
          <div>
            <p className="font-mono-space text-xs text-grey mb-1.5">pARTy</p>
            <StrategyItem label="TICKET" value="£8–15 stacked / ~£1,274" />
          </div>
        </div>
      </StrategySection>

      <StrategySection title="Annual Target">
        <StrategyItem label="858 SHARE" value="£28k+" />
      </StrategySection>

      <StrategySection title="Rule">
        <div className="flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-blue flex-shrink-0 mt-1.5" style={{ backgroundColor: '#5aabf5' }} />
          <span className="font-dm text-sm text-white">Free Monday sessions ~ never charge for this ~ ever</span>
        </div>
      </StrategySection>
    </div>
  )
}

function F8Tab() {
  return (
    <div className="space-y-3">
      <StrategySection title="Identity">
        <StrategyItem label="USP 1" value="Not for everyone. Made by someone." />
        <StrategyItem label="USP 2" value="For the ones who get it." />
      </StrategySection>

      <StrategySection title="Pricing">
        <StrategyItem label="TEE" value="£45–65" />
        <StrategyItem label="TRACKSUIT" value="£120–180" />
      </StrategySection>

      <StrategySection title="Drop Model">
        <div className="space-y-2">
          {[
            'A drop is an event ~ not a product release',
            'Drop 1: bold graphic tee ~ 50+ units',
            'pArty first ~ then online 48hrs later',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-amber text-xs mt-0.5" style={{ color: '#EF9F27' }}>→</span>
              <span className="font-dm text-sm text-white leading-relaxed">{rule}</span>
            </div>
          ))}
        </div>
      </StrategySection>

      <StrategySection title="Rules">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-red-400 text-xs mt-0.5">✕</span>
            <span className="font-dm text-sm text-white">Never discount</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber text-xs mt-0.5" style={{ color: '#EF9F27' }}>→</span>
            <span className="font-dm text-sm text-white">Unsold pieces gifted or held</span>
          </div>
        </div>
      </StrategySection>
    </div>
  )
}

function BrandRulesTab() {
  const rules = [
    'Never sound like everyone else',
    'Lead with culture not credentials',
    'Protect the work even when uncomfortable',
    'Community always first',
    'Document everything in real time',
    'Confidence is the tone ~ never desperation',
    'moreArt. moreNoise. ~ the test for every decision',
  ]

  return (
    <div className="space-y-6">
      <div className="pt-2">
        <h2 className="font-bebas leading-none" style={{ fontSize: '32px', color: '#ffffff' }}>
          moreArt. moreNoise.
        </h2>
        <p className="font-mono-space text-xs text-grey mt-2 tracking-wider">THE STANDARD EVERY DECISION IS MEASURED AGAINST</p>
      </div>

      <div className="bg-card1 border border-dashed rounded p-4 space-y-4" style={{ borderColor: 'rgba(168,139,250,0.3)' }}>
        {rules.map((rule, i) => (
          <StrategyRule key={i} number={i + 1} text={rule} />
        ))}
      </div>

      <div className="bg-card2 border border-border rounded p-4">
        <p className="font-mono-space text-xs text-grey tracking-widest mb-2">THE TEST</p>
        <p className="font-dm text-sm text-white leading-relaxed">
          Before every decision, post, campaign, or collaboration — ask: does this add more art? Does this add more noise? If not, it doesn't belong.
        </p>
      </div>
    </div>
  )
}

export default function Strategy() {
  const [activeTab, setActiveTab] = useState('studio858')

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-4">
        <h1 className="font-bebas text-4xl text-white tracking-wider">Strategy</h1>
        <p className="font-mono-space text-xs text-grey mt-1">Read only reference</p>
      </div>

      <div className="px-4 flex gap-2 overflow-x-auto pb-3 scrollbar-none flex-shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-shrink-0 font-mono-space text-xs px-4 py-2 rounded border transition-all duration-150"
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
