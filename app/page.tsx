'use client';

import Link from 'next/link';
import { ExternalLink, ArrowRight, Check, Zap, Clock, Shield, Eye, Calendar, Phone } from 'lucide-react';
import InquiryForm from './inquiry-form';

const projects = [
  {
    name: 'Beltline Golf',
    problem: 'Needed online booking, payments, waivers, and a leaderboard for golf simulators.',
    solution: 'Full booking system with Stripe, admin dashboard, and digital waivers.',
    hours: 124,
    timeline: '8 weeks',
    result: 'Now processing bookings 24/7 with zero manual work.',
    url: 'https://beltlinegolf.com',
    tags: ['Booking', 'Payments', 'Dashboard'],
  },
  {
    name: 'TradeAlerts',
    problem: 'Trading app had 5 critical production bugs breaking the mobile experience.',
    solution: 'Fixed TypeScript errors, Firebase security, PWA compliance, and performance.',
    hours: 13,
    timeline: '1 week',
    result: 'Zero errors, <500ms load time, fully PWA compliant.',
    url: 'https://ktradealerts.vercel.app',
    tags: ['PWA', 'Real-time', 'Mobile'],
  },
  {
    name: 'Taste of Gratitude',
    problem: 'Food business needed online ordering with delivery zones and secure payments.',
    solution: 'E-commerce platform with cart, Stripe checkout, and order management.',
    hours: 80,
    timeline: '10 weeks',
    result: 'Taking orders online with automated delivery zone validation.',
    url: 'https://tasteofgratitude.shop',
    tags: ['E-commerce', 'Payments', 'Orders'],
  },
  {
    name: 'Image-to-SVG',
    problem: 'Designers needed a fast way to convert batches of images to vector graphics.',
    solution: 'Drag-and-drop converter with live preview and instant downloads.',
    hours: 26,
    timeline: '2 weeks',
    result: '100+ conversions per week, <1 second per image.',
    url: 'https://img-to-svg.vercel.app',
    tags: ['Tool', 'API', 'Automation'],
  },
];

const weeklyDeliverables = [
  { icon: Eye, title: 'Live Preview', desc: 'See your app as it\'s built' },
  { icon: Clock, title: 'Hours Report', desc: 'Know exactly where time goes' },
  { icon: Check, title: 'Progress List', desc: 'What\'s done, what\'s next' },
  { icon: Calendar, title: 'Launch Plan', desc: 'Clear path to go-live' },
];

const faqs = [
  {
    q: 'What if you get sick or unavailable?',
    a: 'Your code is always in a working state with documentation. If needed, any developer can pick up where I left off. I also provide 48-hour notice for any schedule changes.',
  },
  {
    q: 'Do I own everything when we\'re done?',
    a: 'Yes. You own 100% of the code, accounts, and infrastructure. I hand over all credentials and documentation. No lock-in, no dependencies on me.',
  },
  {
    q: 'Who maintains the app after launch?',
    a: 'I offer ongoing maintenance at $125/hr (or $65/hr for existing clients). Or you can hire anyone—the code is clean and documented.',
  },
  {
    q: 'What\'s the minimum engagement?',
    a: 'Start with a 1-2 week build sprint (~20-40 hours). If you love the direction, we continue. If not, you keep everything built so far.',
  },
];

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only fixed top-0 left-0 z-50 px-4 py-2 bg-blue-600 text-white rounded-br">
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2" aria-label="Cod3Black home">
            <Zap size={28} className="text-blue-600" aria-hidden="true" />
            Cod3Black
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium items-center">
            <a href="#proof" className="text-gray-700 hover:text-blue-600 transition">Speed Proof</a>
            <a href="#projects" className="text-gray-700 hover:text-blue-600 transition">Live Apps</a>
            <a href="#how" className="text-gray-700 hover:text-blue-600 transition">How It Works</a>
            <a href="tel:+14047899960" className="text-gray-700 hover:text-blue-600 transition flex items-center gap-1">
              <Phone size={16} /> (404) 789-9960
            </a>
            <a href="#inquiry" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Get Estimate
            </a>
          </div>
        </div>
      </nav>

      <main id="main" className="min-h-screen">
        
        {/* HERO: Outcome + Speed Proof */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white pt-16 pb-24 px-4 sm:px-6">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Scarcity badge */}
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-yellow-500/20 border border-yellow-400/50 rounded-full text-yellow-300 text-sm font-bold">
                🔥 Currently booking: 1 new project slot for February
              </span>
            </div>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Stop Waiting 3-6 Months to Launch.
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-4">
                I&apos;m a solo developer who ships production apps at startup speed—without agency overhead.
              </p>
              <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                Websites, mobile apps, booking systems, e-commerce. <strong className="text-white">Weeks, not months.</strong>
              </p>
            </div>

            {/* SPEED PROOF CARDS - The Killer Differentiator */}
            <div id="proof" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5 text-center hover:bg-white/15 transition">
                <div className="text-4xl sm:text-5xl font-black text-green-400 mb-1">13</div>
                <div className="text-sm text-blue-200 font-semibold">hours</div>
                <div className="text-xs text-blue-300 mt-2">TradeAlerts PWA</div>
                <div className="text-xs text-green-400 mt-1">5 critical fixes → live</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5 text-center hover:bg-white/15 transition">
                <div className="text-4xl sm:text-5xl font-black text-green-400 mb-1">26</div>
                <div className="text-sm text-blue-200 font-semibold">hours</div>
                <div className="text-xs text-blue-300 mt-2">Image-to-SVG Tool</div>
                <div className="text-xs text-green-400 mt-1">Full app → 2 weeks</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5 text-center hover:bg-white/15 transition">
                <div className="text-4xl sm:text-5xl font-black text-green-400 mb-1">80</div>
                <div className="text-sm text-blue-200 font-semibold">hours</div>
                <div className="text-xs text-blue-300 mt-2">E-commerce + Payments</div>
                <div className="text-xs text-green-400 mt-1">Production quality</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5 text-center hover:bg-white/15 transition">
                <div className="text-4xl sm:text-5xl font-black text-green-400 mb-1">124</div>
                <div className="text-sm text-blue-200 font-semibold">hours</div>
                <div className="text-xs text-blue-300 mt-2">Full Booking System</div>
                <div className="text-xs text-green-400 mt-1">Payments + Admin + Waivers</div>
              </div>
            </div>

            <p className="text-center text-sm text-blue-300 mb-8">
              ☝️ <strong className="text-white">Real hours tracked.</strong> Real apps shipped. Click any project below to see it live.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a href="#inquiry" className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg inline-flex items-center justify-center gap-2 text-lg">
                Get a 2-Week Build Plan <ArrowRight size={20} aria-hidden="true" />
              </a>
              <a href="#projects" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition inline-flex items-center justify-center gap-2">
                See Live Apps <ExternalLink size={20} aria-hidden="true" />
              </a>
            </div>

            <div className="text-center text-sm text-blue-200">
              <span className="inline-flex items-center gap-2">
                <Phone size={16} /> <a href="tel:+14047899960" className="underline hover:text-white">(404) 789-9960</a>
                <span className="mx-2">•</span>
                Reply within 1 business day
              </span>
            </div>
          </div>
        </section>

        {/* COMPARISON TIMELINE: Agency vs Solo */}
        <section className="py-16 px-4 sm:px-6 bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Same Outcome. Different Timeline.</h2>
              <p className="text-gray-600">It&apos;s not that agencies are bad—their operating system is built for teams. Mine is built for shipping.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Agency Model */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Typical Agency</div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400">→</span>
                    <span>Multiple roles, multiple handoffs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400">→</span>
                    <span>Weekly status meetings</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400">→</span>
                    <span>Longer queues, bigger minimums</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400">→</span>
                    <span>12-24 weeks typical timeline</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="text-3xl font-bold text-gray-400">3-6 months</div>
                  <div className="text-sm text-gray-500">Average project timeline</div>
                </div>
              </div>

              {/* Solo Model */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 ring-2 ring-blue-400/50">
                <div className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-4">Solo Build Partner (Me)</div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>One decision-maker, one builder</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Live preview updates (no meetings needed)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Short feedback loops, fast iteration</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Start small, scale if it works</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-blue-200">
                  <div className="text-3xl font-bold text-blue-600">2-8 weeks</div>
                  <div className="text-sm text-blue-600">Most projects launch</div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              &ldquo;Most teams move at meeting-speed. I move at build-speed.&rdquo;
            </p>
          </div>
        </section>

        {/* WEEKLY DELIVERABLES: What You Get */}
        <section id="how" className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What You Get Every Week</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                No black box. You see progress in real-time with clear deliverables.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {weeklyDeliverables.map((item, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUALITY SAFEGUARDS: Risk Reversal */}
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Fast Doesn&apos;t Mean Sloppy</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Production-ready means: monitored, secure, backed up, and ready for your customers.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Secure by Default</h4>
                  <p className="text-sm text-gray-600">Auth, encryption, and input validation built in. No shortcuts.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Staging First</h4>
                  <p className="text-sm text-gray-600">Every feature tested on a preview link before touching production.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Rollback Ready</h4>
                  <p className="text-sm text-gray-600">Something breaks? One click to restore the last working version.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap size={20} className="text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Monitoring & Alerts</h4>
                  <p className="text-sm text-gray-600">I know when something&apos;s wrong before your customers do.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">You Own Everything</h4>
                  <p className="text-sm text-gray-600">Code, accounts, infrastructure. Full handoff, no lock-in.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar size={20} className="text-teal-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Launch Checklist</h4>
                  <p className="text-sm text-gray-600">Documented go-live process. Nothing gets missed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS: Case Proof Format */}
        <section id="projects" className="py-20 px-4 sm:px-6 bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Real Projects. Live Right Now.</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Click any card to see the actual app. These aren&apos;t mockups—they&apos;re production systems handling real users.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {projects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition"
                >
                  {/* Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">{project.name}</h3>
                      <div className="flex gap-2 mt-1">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ExternalLink size={20} className="text-gray-400 group-hover:text-blue-600 transition" aria-hidden="true" />
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">The Problem</div>
                      <p className="text-gray-700 text-sm">{project.problem}</p>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">What I Built</div>
                      <p className="text-gray-700 text-sm">{project.solution}</p>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">Result</div>
                      <p className="text-gray-900 text-sm font-medium">{project.result}</p>
                    </div>
                  </div>

                  {/* Footer Stats */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                    <div className="flex gap-6">
                      <div>
                        <div className="text-2xl font-black text-blue-600">{project.hours}</div>
                        <div className="text-xs text-gray-600">hours</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">{project.timeline}</div>
                        <div className="text-xs text-gray-600">to launch</div>
                      </div>
                    </div>
                    <div className="text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition text-sm">
                      View Live <ExternalLink size={14} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING: Simple & Clear */}
        <section className="py-16 px-4 sm:px-6 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple Pricing. No Surprises.</h2>
              <p className="text-gray-400">
                $125/hour. Every hour tracked. Weekly summary sent. That&apos;s it.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/10">
                <div className="text-3xl font-bold mb-2">$500–$1.5K</div>
                <div className="text-blue-300 font-semibold mb-2">Quick Fixes</div>
                <div className="text-sm text-gray-400">4-12 hours • Days</div>
                <div className="text-xs text-gray-500 mt-2">Bug fixes, small updates</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-yellow-500/50 ring-2 ring-yellow-500/30">
                <div className="text-xs text-yellow-400 font-bold mb-2">MOST POPULAR</div>
                <div className="text-3xl font-bold mb-2">$2K–$5K</div>
                <div className="text-blue-300 font-semibold mb-2">Small Projects</div>
                <div className="text-sm text-gray-400">16-40 hours • 1-2 weeks</div>
                <div className="text-xs text-gray-500 mt-2">Landing pages, tools, PWAs</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/10">
                <div className="text-3xl font-bold mb-2">$5K–$15K</div>
                <div className="text-blue-300 font-semibold mb-2">Full Apps</div>
                <div className="text-sm text-gray-400">40-120 hours • 2-8 weeks</div>
                <div className="text-xs text-gray-500 mt-2">E-commerce, dashboards, booking</div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-green-400 font-semibold mb-2">
                🎁 Friends & Family Rate: $65/hour
              </p>
              <p className="text-gray-500 text-sm">For referrals and repeat customers (48% off standard rate)</p>
            </div>
          </div>
        </section>

        {/* FAQ: Solo Concerns */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Questions You Might Have</h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INQUIRY FORM */}
        <section id="inquiry" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Let&apos;s Talk About Your Project</h2>
              <p className="text-gray-600 mb-2">
                Fill out this form and I&apos;ll reply within 1 business day with a 2-week build plan and estimate.
              </p>
              <p className="text-sm text-gray-500">
                Not sure? Just answer a few questions—no commitment required.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 sm:p-12">
              <InquiryForm />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Launch Sooner. Learn Sooner. Earn Sooner.</h2>
            <p className="text-lg mb-8 text-blue-100">
              Every week you wait is missed leads, missed bookings, missed revenue. Let&apos;s build.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#inquiry" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg inline-flex items-center justify-center gap-2">
                Get Your Build Plan <ArrowRight size={20} />
              </a>
              <a href="tel:+14047899960" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition inline-flex items-center justify-center gap-2">
                <Phone size={20} /> Call (404) 789-9960
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-blue-400" />
                  Cod3Black
                </h4>
                <p className="text-sm text-gray-400">
                  Solo developer shipping production apps at startup speed. $125/hour transparent pricing.
                </p>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-4">Quick Links</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="#proof" className="text-gray-400 hover:text-white transition">Speed Proof</a></li>
                  <li><a href="#projects" className="text-gray-400 hover:text-white transition">Live Projects</a></li>
                  <li><a href="#inquiry" className="text-gray-400 hover:text-white transition">Get Estimate</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-4">Resources</h5>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/docs/web-design" className="text-gray-400 hover:text-white transition">Web Design Guide</Link></li>
                  <li><Link href="/docs/mobile-apps" className="text-gray-400 hover:text-white transition">Mobile Apps Guide</Link></li>
                  <li><Link href="/docs/projects" className="text-gray-400 hover:text-white transition">Case Studies</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-4">Contact</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="tel:+14047899960" className="text-blue-400 hover:text-blue-300 transition">(404) 789-9960</a></li>
                  <li><a href="mailto:cod3blackagency@gmail.com" className="text-blue-400 hover:text-blue-300 transition">cod3blackagency@gmail.com</a></li>
                  <li className="text-gray-400">Reply within 1 business day</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
              <p>© 2026 Cod3Black Agency. Production apps shipped fast. No agency overhead.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
