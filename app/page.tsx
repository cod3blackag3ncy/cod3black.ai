'use client';

import Link from 'next/link';
import { ExternalLink, ArrowRight, Check, Zap, Users, Gauge } from 'lucide-react';
import InquiryForm from './inquiry-form';

const projects = [
  {
    name: 'Beltline Golf',
    description: 'Full booking system with payments, live leaderboard, digital waivers, and admin dashboard. Complex multi-feature app delivered in 2 months.',
    stats: ['⚡ 124 hours of work', '📅 Live in 8 weeks', '🎯 Full-stack: booking + payments + admin'],
    highlights: 'Complex booking + payments + dashboard',
    url: 'https://beltlinegolf.com',
    tags: ['Next.js', 'Payments', 'Dashboard'],
  },
  {
    name: 'TradeAlerts',
    description: 'Real-time trading alerts with push notifications and mobile-first PWA. 5 critical fixes shipped same-day.',
    stats: ['⚡ 13 hours of work', '📅 Live in 1 week', '🎯 PWA + Real-time + TypeScript strict'],
    highlights: 'Real-time alerts + PWA + Mobile',
    url: 'https://ktradealerts.vercel.app',
    tags: ['React Native', 'PWA', 'TypeScript'],
  },
  {
    name: 'Taste of Gratitude',
    description: 'E-commerce food ordering with cart, checkout, delivery zones, and secure transactions. Production-grade quality.',
    stats: ['⚡ 80 hours of work', '📅 Live in 10 weeks', '🎯 E-commerce + ACID transactions'],
    highlights: 'E-commerce + Payments + Delivery',
    url: 'https://tasteofgratitude.shop',
    tags: ['Next.js', 'Payments', 'Security'],
  },
  {
    name: 'Image-to-SVG',
    description: 'Drag-and-drop image converter with live preview and instant downloads. Simple tool, shipped fast.',
    stats: ['⚡ 26 hours of work', '📅 Live in 2 weeks', '🎯 API + React UI + Processing'],
    highlights: 'Automation + Processing Tool',
    url: 'https://img-to-svg.vercel.app',
    tags: ['Next.js', 'API', 'Tool'],
  },
];

const services = [
  {
    icon: '🎨',
    title: 'Websites & Online Stores',
    description: 'Business websites, portfolios, online stores, and custom web applications that look great on any device.',
  },
  {
    icon: '📱',
    title: 'Mobile Apps',
    description: 'iPhone and Android apps that your customers can download and use on the go.',
  },
  {
    icon: '🤖',
    title: 'AI & Automation',
    description: 'Smart tools that save you time. Automate repetitive tasks, process documents, and get work done faster.',
  },
  {
    icon: '⚙️',
    title: 'Connect Your Tools',
    description: 'Link your website to payments, email, scheduling, and other business software so everything works together.',
  },
  {
    icon: '📊',
    title: 'Dashboards & Reports',
    description: 'See your business data in one place. Track sales, customers, and performance with easy-to-read dashboards.',
  },
  {
    icon: '🚀',
    title: 'Quick Prototypes & Refreshes',
    description: 'Get your idea off the ground fast, or refresh your existing website to work better on phones and load faster.',
  },
];

export default function Home() {
  // Combined deployment: cod3black-ai (production AI) + c3bai (SaaS agency)
  // Updated: 2026-02-04 - unified positioning
  return (
    <>
      {/* Skip Navigation Link */}
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
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition">Services</a>
            <a href="#projects" className="text-gray-700 hover:text-blue-600 transition">Projects</a>
            <a href="#inquiry" className="text-gray-700 hover:text-blue-600 transition">Get Started</a>
            <a href="mailto:hello@c3bai.com" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main id="main" className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white pt-20 pb-32 px-4 sm:px-6">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-500 bg-opacity-30 border border-blue-300 rounded-full text-sm font-semibold">
              ⚡ Professional Web Design & Apps
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-100 font-extrabold drop-shadow-lg">Websites, Apps & Software</span>
            </h1>
            
            <p className="text-lg sm:text-xl mb-4 text-blue-100 max-w-3xl mx-auto leading-relaxed font-semibold">
              No templates. No cookie-cutter solutions. We create custom digital products that actually work for your business.
            </p>
            
            <p className="text-lg sm:text-lg mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Custom websites, mobile apps, online stores, and business software. Simple pricing at $125/hour. You know exactly what you&apos;re paying for.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <a href="#inquiry" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg inline-flex items-center justify-center gap-2">
                Start Your Project <ArrowRight size={20} aria-hidden="true" />
              </a>
              <a href="#projects" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-blue-500 transition inline-flex items-center justify-center gap-2">
                See Our Work <ExternalLink size={20} aria-hidden="true" />
              </a>
            </div>
            
            {/* Pricing cards - based on actual project history */}
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
                <div className="text-4xl font-bold mb-2">$500–$1,500</div>
                <div className="text-sm text-blue-100 mb-3">Quick Fixes</div>
                <div className="text-xs text-blue-200">4-12 hours • 1-3 days</div>
                <div className="text-xs text-blue-300 mt-2">Bug fixes, small updates, single features</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition ring-2 ring-yellow-400 ring-opacity-50">
                <div className="text-4xl font-bold mb-2">$2K–$5K</div>
                <div className="text-sm text-blue-100 mb-3">Small Projects</div>
                <div className="text-xs text-blue-200">16-40 hours • 1-2 weeks</div>
                <div className="text-xs text-blue-300 mt-2">Landing pages, PWAs, simple web apps</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
                <div className="text-4xl font-bold mb-2">$5K–$15K</div>
                <div className="text-sm text-blue-100 mb-3">Full Apps</div>
                <div className="text-xs text-blue-200">40-120 hours • 2-6 weeks</div>
                <div className="text-xs text-blue-300 mt-2">E-commerce, booking systems, dashboards</div>
              </div>
            </div>
            
            <p className="text-blue-100 text-sm mt-8">
              💰 <span className="font-semibold">Friends & Family Rate:</span> $65/hour for referrals and repeat customers (normally $125/hour)
            </p>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">What We Build</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From simple landing pages to full business apps. Most projects take 2-8 weeks.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition border border-gray-200">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">How We Work</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We focus on what actually matters for your business.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border-l-4 border-blue-600 rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap size={24} className="text-yellow-600" aria-hidden="true" /> Smart AI Tools
                </h3>
                <p className="text-sm text-gray-500 mb-3">Automation that works</p>
                <p className="text-gray-600">We use the latest AI to help automate your workflows without overcomplicating things.</p>
              </div>
              
              <div className="bg-white border-l-4 border-blue-600 rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Gauge size={24} className="text-blue-600" aria-hidden="true" /> Built to Last
                </h3>
                <p className="text-sm text-gray-500 mb-3">Reliable, tested solutions</p>
                <p className="text-gray-600">We build things that work consistently. No random crashes or downtime.</p>
              </div>
              
              <div className="bg-white border-l-4 border-blue-600 rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Check size={24} className="text-green-600" aria-hidden="true" /> Clean & Organized
                </h3>
                <p className="text-sm text-gray-500 mb-3">Everything in its place</p>
                <p className="text-gray-600">Your data stays organized and secure. We catch problems before they reach your customers.</p>
              </div>
              
              <div className="bg-white border-l-4 border-blue-600 rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Users size={24} className="text-purple-600" aria-hidden="true" /> Honest Pricing
                </h3>
                <p className="text-sm text-gray-500 mb-3">No surprises</p>
                <p className="text-gray-600">Pay $125/hour. That&apos;s it. We track every hour so you know where your money goes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different Section */}
        <section className="py-24 px-4 sm:px-6 bg-white border-y border-gray-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">What Makes Us Different</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900">We&apos;re upfront about everything</h4>
                    <p className="text-gray-600 text-sm">No hidden fees, no surprise charges. What we quote is what you pay.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-2xl">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900">We respect your budget</h4>
                    <p className="text-gray-600 text-sm">We pick the right tools for your project so you don&apos;t overpay for things you don&apos;t need.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Consistent quality</h4>
                    <p className="text-gray-600 text-sm">Your website or app will work the same way every time, for every customer.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-2xl">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900">We plan for problems</h4>
                    <p className="text-gray-600 text-sm">Things go wrong sometimes. We build in safety nets so your business keeps running.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 sm:px-6 bg-white">
           <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Real Projects. Real Speed.</h2>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                 Production-quality apps shipped fast. TradeAlerts: 13 hours. Image-to-SVG: 26 hours. Click to see them live.
               </p>
               <p className="text-md text-blue-600 font-semibold mt-3">
                 ⚡ From idea to production in 1-10 weeks depending on complexity
               </p>
             </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {projects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-600 hover:shadow-xl transition cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition">{project.name}</h3>
                    <ExternalLink size={20} className="text-gray-400 group-hover:text-blue-600 transition" aria-hidden="true" />
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-2">{project.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {project.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check size={16} className="text-green-600 flex-shrink-0" aria-hidden="true" />
                        <span className="font-medium">{stat}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition">
                    View Live <ExternalLink size={16} aria-hidden="true" />
                  </div>
                </a>
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/docs/projects" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-lg">
                Read Full Case Studies <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Inquiry Form Section */}
        <section id="inquiry" className="py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Tell Us About Your Project</h2>
              <p className="text-lg text-gray-600">
                Let&apos;s understand your needs and give you an accurate estimate. Takes about 10 minutes.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
              <InquiryForm />
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Learn More</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                In-depth guides and best practices for building successful digital products.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/docs/web-design" className="group bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 hover:border-blue-600 hover:shadow-lg transition">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">Web Design Guide</h3>
                <p className="text-gray-600 mb-4">Complete guide to designing and building effective websites that convert visitors into customers.</p>
                <div className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition">
                  Read Guide <ArrowRight size={18} aria-hidden="true" />
                </div>
              </Link>
              
              <Link href="/docs/mobile-apps" className="group bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-8 hover:border-purple-600 hover:shadow-lg transition">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition">Mobile Apps Guide</h3>
                <p className="text-gray-600 mb-4">How to build, launch, and monetize mobile applications for iOS and Android platforms.</p>
                <div className="text-purple-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition">
                  Read Guide <ArrowRight size={18} aria-hidden="true" />
                </div>
              </Link>
              
              <Link href="/docs/projects" className="group bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-8 hover:border-green-600 hover:shadow-lg transition">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition">Case Studies</h3>
                <p className="text-gray-600 mb-4">Real projects with detailed breakdowns of problems, solutions, and the actual results achieved.</p>
                <div className="text-green-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition">
                  Read Cases <ArrowRight size={18} aria-hidden="true" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Something Great?</h2>
            <p className="text-lg mb-8 text-blue-100">
              Tell us about your project and get a free estimate. No pressure, no obligations.
            </p>
            <a href="#inquiry" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg">
              Get Your Estimate Now
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-blue-400" aria-hidden="true" />
                  Cod3Black
                </h4>
                <p className="text-sm text-gray-400">
                  Custom web design, apps, and software. $125/hour transparent pricing.
                </p>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-4">Quick Links</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="#services" className="text-gray-400 hover:text-white transition">Services</a></li>
                  <li><a href="#projects" className="text-gray-400 hover:text-white transition">Projects</a></li>
                  <li><a href="#inquiry" className="text-gray-400 hover:text-white transition">Inquiry</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-4">Resources</h5>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/docs/web-design" className="text-gray-400 hover:text-white transition">Web Design</Link></li>
                  <li><Link href="/docs/mobile-apps" className="text-gray-400 hover:text-white transition">Mobile Apps</Link></li>
                  <li><Link href="/docs/projects" className="text-gray-400 hover:text-white transition">Case Studies</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-4">Contact</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="mailto:hello@c3bai.com" className="text-blue-400 hover:text-blue-300 transition">hello@c3bai.com</a></li>
                  <li className="text-gray-400">Available for inquiries</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
               <p>© 2026 Cod3Black Agency. Custom websites, apps, and software. Built right, priced fair.</p>
               <p className="mt-2 text-xs">$125/hour transparent pricing. No hidden fees.</p>
             </div>
          </div>
        </footer>
      </main>
    </>
  );
}
