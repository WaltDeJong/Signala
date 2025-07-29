import Link from 'next/link';
import { LandPlot, TrendingUp, Info } from 'lucide-react';

import LazyPlot from '../components/LazyPlot';

// Server Component for Politics page content
export default function PoliticsContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <header className="container mx-auto px-4 md:px-6 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="flex items-center mb-4">
          <div className="text-[#27ae60] mr-3">
            <LandPlot className="h-8 w-8 md:h-10 md:w-10" />
          </div>
          <h1 className="text-[#333333] font-bold text-3xl md:text-5xl">Politics</h1>
        </div>
        <p className="text-[#64748B] text-lg md:text-xl max-w-3xl">
          Nonpartisan analysis of Canadian political trends, voting patterns, and public opinion data.
        </p>
      </header>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-[#8e44ad] pt-8">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-4">Carney Approval Rating</h2>
          <p className="text-[#64748B] mb-6 max-w-3xl">
            Mark Carney's approval ratings have gradually improved over the past six months, according to polling across Canada.
          </p>
          
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
            <div className="h-80 md:h-96 w-full"> 
              <LazyPlot chartName="PresidentialApproval" />
            </div>
            <div className="flex items-start mt-4 text-sm text-[#64748B]">
              <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>Data aggregated from multiple polling sources. Margin of error ±2.5%.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="col-span-2">
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Analysis</h3>
              <p className="text-[#64748B] mb-4">
                Mark Carney's approval rating has shown a steady upward trend since January, increasing 6 percentage points over six months. This improvement coincides with several high-profile economic policy announcements and increased public visibility.
              </p>
              <p className="text-[#64748B] mb-4">
                While approval numbers remain below 50%, the narrowing gap between approval and disapproval ratings suggests growing public confidence. The most significant gains have been among urban voters and those aged 35-54.
              </p>
              <Link href="/politics/carney-approval-deep-dive" className="text-[#27ae60] font-medium hover:underline inline-flex items-center">
                Read full analysis →
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Key Insights</h3>
              <ul className="space-y-2 text-[#64748B]">
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 mr-2 text-[#27ae60] flex-shrink-0 mt-0.5" />
                  <span>6-point increase since January</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 mr-2 text-[#27ae60] flex-shrink-0 mt-0.5" />
                  <span>Strongest support among urban voters</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 mr-2 text-[#27ae60] flex-shrink-0 mt-0.5" />
                  <span>Economic policy announcements correlated with rating increases</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-4">Party Support</h2>
          <p className="text-[#64748B] mb-6 max-w-3xl">
            Current polling shows a tight race between the major federal parties, with regional differences playing a key role.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl text-gray-900 mb-4">National Party Support</h3>
              <div className="h-80 w-full"> 
                <LazyPlot chartName="PartySupport" />
              </div>
            </div>
            
             <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Regional Strongholds</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800">Atlantic Canada</span>
                    <span className="text-sm text-[#E91E63]">Liberal +8</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E91E63] rounded-full" style={{ width: '54%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800">Quebec</span>
                    <span className="text-sm text-[#4CAF50]">Bloc +5</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#4CAF50] rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800">Ontario</span>
                    <span className="text-sm text-[#2196F3]">Conservative +3</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2196F3] rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800">Prairies</span>
                    <span className="text-sm text-[#2196F3]">Conservative +22</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2196F3] rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800">British Columbia</span>
                    <span className="text-sm text-[#FF9800]">NDP +4</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF9800] rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link href="/politics/regional-voting-patterns" className="text-[#27ae60] font-medium hover:underline">
                  Explore regional voting patterns →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-4">Issues Driving Canadian Politics</h2>
          <p className="text-[#64748B] mb-6 max-w-3xl">
            Polling indicates which issues Canadians consider most important when making political decisions.
          </p>
          
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
            <h3 className="font-semibold text-xl text-gray-900 mb-4">Key Issues by Importance (%)</h3>
            <div className="h-80 w-full"> 
               <LazyPlot chartName="KeyIssues" />
            </div>
          </div>
          
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Housing Crisis Dominates</h3>
              <p className="text-[#64748B] mb-4">
                The housing affordability crisis has emerged as the top concern for Canadian voters across age groups and regions, with 78% rating it as "very important" in determining their vote.
              </p>
              <p className="text-[#64748B] mb-4">
                This represents a significant shift from previous election cycles where healthcare and the economy typically dominated voter concerns.
              </p>
              <Link href="/politics/housing-crisis-impact" className="text-[#27ae60] font-medium hover:underline">
                Read analysis →
              </Link>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Demographic Divides</h3>
              <p className="text-[#64748B] mb-4">
                While housing tops concerns overall, significant demographic variations exist. Younger voters (18-34) prioritize housing and climate action, while older voters (55+) place greater emphasis on healthcare and crime.
              </p>
              <p className="text-[#64748B]">
                Urban-rural divides are also apparent, with urban voters more concerned about housing and immigration, while rural voters emphasize healthcare access and economic development.
              </p>
              <Link href="/politics/demographic-political-divide" className="text-[#27ae60] font-medium hover:underline mt-4 inline-block">
                Explore demographic analysis →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-6">Recent Political Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="border-l-2 border-[#8e44ad] pl-4">
              <h3 className="font-semibold text-xl text-gray-900 mb-2">Evolving voting patterns in Quebec</h3>
              <p className="text-[#64748B] mb-3">How regional voting blocs have shifted over the past three federal elections, with implications for future contests.</p>
              <span className="text-sm text-[#64748B] mb-3 block">May 2, 2025</span>
              <Link href="/politics/quebec-voting-patterns" className="text-[#27ae60] font-medium hover:underline">Read analysis →</Link>
            </article>
            <article className="border-l-2 border-[#8e44ad] pl-4">
              <h3 className="font-semibold text-xl text-gray-900 mb-2">Climate policy support by demographic</h3>
              <p className="text-[#64748B] mb-3">Breaking down how age, location, and economic factors correlate with climate policy support.</p>
              <span className="text-sm text-[#64748B] mb-3 block">April 28, 2025</span>
              <Link href="/politics/climate-policy-demographics" className="text-[#27ae60] font-medium hover:underline">Read analysis →</Link>
            </article>
            <article className="border-l-2 border-[#8e44ad] pl-4">
              <h3 className="font-semibold text-xl text-gray-900 mb-2">Voter turnout trends across Canada</h3>
              <p className="text-[#64748B] mb-3">Examining declining voter participation rates and which demographics are most affected.</p>
              <span className="text-sm text-[#64748B] mb-3 block">April 15, 2025</span>
              <Link href="/politics/voter-turnout-analysis" className="text-[#27ae60] font-medium hover:underline">Read analysis →</Link>
            </article>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-[#8e44ad] to-[#c0392b] py-12 md:py-16 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-bold text-2xl md:text-3xl mb-4">Stay Updated</h2>
            <p className="text-white/90 mb-6">Get the latest political analysis and data insights straight to your inbox.</p>
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
