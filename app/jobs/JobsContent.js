import Link from 'next/link';
import { Briefcase as BriefcaseIcon, TrendingUp, TrendingDown, Target, Info } from 'lucide-react';

import LazyPlot from '../components/LazyPlot';

export default function JobsContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <header className="container mx-auto px-4 md:px-6 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="flex items-center mb-4">
          <div className="text-[#27ae60] mr-3">
            <BriefcaseIcon className="h-8 w-8 md:h-10 md:w-10" />
          </div>
          <h1 className="text-[#333333] font-bold text-3xl md:text-5xl">Canadian Jobs Market</h1>
        </div>
        <p className="text-[#64748B] text-lg md:text-xl max-w-3xl">
          Analyzing employment trends, wage growth, and labor market dynamics across Canada.
        </p>
      </header>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-[#8e44ad] pt-8">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-4">Employment Rate Trends</h2>
          <p className="text-[#64748B] mb-6 max-w-3xl">
            Canada's employment rate has shown resilience post-pandemic, with strong recovery in most sectors but persistent challenges in others.
          </p>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
            <div className="h-80 md:h-96 w-full">
              <LazyPlot chartName="EmploymentRate" />
            </div>
            <div className="flex items-start mt-4 text-sm text-[#64748B]">
              <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>Data: Statistics Canada. Monthly employment rate for population aged 15+.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="col-span-2">
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Analysis</h3>
              <p className="text-[#64748B] mb-4">
                The Canadian jobs market has demonstrated impressive resilience, with employment rates rebounding strongly from the pandemic lows. However, underlying structural issues persist, particularly in sectors like hospitality and retail that were hit hardest by the economic shutdowns.
              </p>
              <Link href="/jobs/employment-trends" className="text-[#27ae60] font-medium hover:underline inline-flex items-center">
                Read full employment analysis →
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Key Insights</h3>
              <ul className="space-y-2 text-[#64748B]">
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 mr-2 text-[#27ae60] flex-shrink-0 mt-0.5" />
                  <span>Employment rate recovered to 62.2% (pre-pandemic: 62.1%).</span>
                </li>
                <li className="flex items-start">
                  <TrendingDown className="h-5 w-5 mr-2 text-[#c0392b] flex-shrink-0 mt-0.5" />
                  <span>Youth unemployment remains a concern at 12.8%.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-6">Wage Growth and Inflation</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Average Hourly Earnings</h3>
              <div className="h-80 w-full">
                <LazyPlot chartName="AverageHourlyEarnings" />
              </div>
              <div className="flex items-start mt-4 text-sm text-[#64748B]">
                <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>Source: Statistics Canada. Nominal earnings, seasonally adjusted.</p>
              </div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Inflation Rate vs. Wage Growth</h3>
              <div className="h-80 w-full">
                <LazyPlot chartName="InflationVsWages" />
              </div>
              <div className="flex items-start mt-4 text-sm text-[#64748B]">
                <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>Source: Statistics Canada. CPI vs. average hourly earnings.</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl text-gray-900 mb-3">Wage-Inflation Dynamics</h3>
            <p className="text-[#64748B] mb-4">
              Canadian workers have experienced significant wage growth in recent years, but inflation has outpaced these gains in many cases. This has led to a squeeze on real purchasing power, particularly for lower-income households.
            </p>
            <Link href="/jobs/wage-inflation-analysis" className="text-[#27ae60] font-medium hover:underline">
              Explore wage trends →
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-4">Labor Market Participation</h2>
          <p className="text-[#64748B] mb-6 max-w-3xl">
            Participation rates have been affected by demographic shifts and changing work preferences.
          </p>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold text-xl text-gray-900 mb-4">Labor Force Participation Rate</h3>
            <div className="h-80 md:h-96 w-full">
              <LazyPlot chartName="LaborForceParticipation" />
            </div>
            <div className="flex items-start mt-4 text-sm text-[#64748B]">
              <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>Data: Statistics Canada. Population aged 15+.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="col-span-2">
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Impact of Changing Work Patterns</h3>
              <p className="text-[#64748B] mb-4">
                The Canadian labor market has been transformed by the rise of remote work, early retirements, and changing attitudes toward work-life balance. These shifts have created both opportunities and challenges for employers and workers alike.
              </p>
              <Link href="/jobs/labor-market-shifts" className="text-[#27ae60] font-medium hover:underline inline-flex items-center">
                Detailed labor market analysis →
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Considerations</h3>
              <ul className="space-y-2 text-[#64748B]">
                <li className="flex items-start">
                  <Target className="h-5 w-5 mr-2 text-[#3498db] flex-shrink-0 mt-0.5" />
                  <span>Remote work adoption varies significantly by industry.</span>
                </li>
                <li className="flex items-start">
                  <TrendingDown className="h-5 w-5 mr-2 text-[#c0392b] flex-shrink-0 mt-0.5" />
                  <span>Early retirements have reduced the available workforce.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-6">Recent Jobs Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="border-l-2 border-[#8e44ad] pl-4">
              <h3 className="font-semibold text-xl text-gray-900 mb-2">The Remote Work Revolution</h3>
              <p className="text-[#64748B] mb-3">How the pandemic accelerated the shift to remote work and what it means for the future of employment.</p>
              <span className="text-sm text-[#64748B] mb-3 block">May 15, 2025</span>
              <Link href="/jobs/remote-work-revolution" className="text-[#27ae60] font-medium hover:underline">Read analysis →</Link>
            </article>
            <article className="border-l-2 border-[#8e44ad] pl-4">
              <h3 className="font-semibold text-xl text-gray-900 mb-2">Regional Employment Disparities</h3>
              <p className="text-[#64748B] mb-3">Examining how job growth varies across different provinces and regions in Canada.</p>
              <span className="text-sm text-[#64748B] mb-3 block">May 8, 2025</span>
              <Link href="/jobs/regional-disparities" className="text-[#27ae60] font-medium hover:underline">Read analysis →</Link>
            </article>
            <article className="border-l-2 border-[#8e44ad] pl-4">
              <h3 className="font-semibold text-xl text-gray-900 mb-2">The Gig Economy's Impact</h3>
              <p className="text-[#64748B] mb-3">How the rise of gig work is reshaping traditional employment patterns and worker protections.</p>
              <span className="text-sm text-[#64748B] mb-3 block">May 1, 2025</span>
              <Link href="/jobs/gig-economy-impact" className="text-[#27ae60] font-medium hover:underline">Read analysis →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#8e44ad] to-[#c0392b] py-12 md:py-16 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-bold text-2xl md:text-3xl mb-4">Canadian Jobs Insights</h2>
            <p className="text-white/90 mb-6">Get the latest jobs market data and analysis delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border-0 rounded-l text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#760F17]"
              />
              <button className="bg-[#3498db] text-white font-medium px-6 py-3 rounded-r hover:bg-[#2980b9] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/signala.svg" alt="Signala" className="h-16 md:h-20" />
            </div>
            <div className="flex space-x-6 text-[#64748B]">
              <Link href="/about" className="hover:text-[#27ae60]">About</Link>
              <Link href="/methodology" className="hover:text-[#27ae60]">Methodology</Link>
              <Link href="/contact" className="hover:text-[#27ae60]">Contact</Link>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-sm text-[#64748B]">
            © {new Date().getFullYear()} Signala. All data visualizations and analysis are available under a Creative Commons license.
          </div>
        </div>
      </footer>
    </div>
  );
}
