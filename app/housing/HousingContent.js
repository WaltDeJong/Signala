import Link from 'next/link';
import { Home as HomeIconLucide, TrendingUp, TrendingDown, Target, Info } from 'lucide-react';
import LazyPlot from '../components/LazyPlot';

export default function HousingContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <header className="container mx-auto px-4 md:px-6 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="flex items-center mb-4">
          <div className="text-[#27ae60] mr-3">
            <HomeIconLucide className="h-8 w-8 md:h-10 md:w-10" />
          </div>
          <h1 className="text-[#333333] font-bold text-3xl md:text-5xl">Canadian Housing Market</h1>
        </div>
        <p className="text-[#64748B] text-lg md:text-xl max-w-3xl">
          Tracking home prices, affordability, construction, and rental market dynamics across Canada.
        </p>
      </header>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-[#8e44ad] pt-8">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-4">National Home Price Evolution</h2>
          <p className="text-[#64748B] mb-6 max-w-3xl">
            Average home prices in Canada saw a significant surge post-pandemic, followed by a period of correction and recent stabilization.
          </p>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
            <div className="h-80 md:h-96 w-full">
              <LazyPlot chartName="MedianSalePrice" />
            </div>
            <div className="flex items-start mt-4 text-sm text-[#64748B]">
              <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>Data: CREA National Average Price. 2024 data is a YTD estimate/projection.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="col-span-2">
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Analysis</h3>
              <p className="text-[#64748B] mb-4">
                The rapid price escalation from 2020-2022 significantly impacted affordability. While prices have moderated from their peak, they remain substantially higher than pre-pandemic levels. Interest rate hikes have cooled demand, but persistent supply shortages continue to support price levels in many markets.
              </p>
              <Link href="/housing/national-price-trends" className="text-[#27ae60] font-medium hover:underline inline-flex items-center">
                Read full price analysis →
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Key Insights</h3>
              <ul className="space-y-2 text-[#64748B]">
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 mr-2 text-[#c0392b] flex-shrink-0 mt-0.5" />
                  <span>~51% price increase from 2018 to 2024 (projected).</span>
                </li>
                <li className="flex items-start">
                  <TrendingDown className="h-5 w-5 mr-2 text-[#27ae60] flex-shrink-0 mt-0.5" />
                  <span>Peak reached in 2022, followed by a ~5% correction in 2023.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-gray-200 pt-8">
            <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-6">Supply & Rental Market Snapshot</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-xl text-gray-900 mb-4">Monthly Housing Starts</h3>
                    <div className="h-80 w-full">
                        <LazyPlot chartName="HousingStarts" />
                    </div>
                     <div className="flex items-start mt-4 text-sm text-[#64748B]">
                        <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <p>Source: CMHC. Seasonally Adjusted Annual Rate (SAAR) divided by 12 (illustrative).</p>
                    </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-xl text-gray-900 mb-4">Rental Vacancy Rates (Major Cities)</h3>
                    <div className="h-80 w-full">
                        <LazyPlot chartName="RentalVacancy" />
                    </div>
                     <div className="flex items-start mt-4 text-sm text-[#64748B]">
                        <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <p>Source: CMHC Rental Market Survey. Most recent data.</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="font-semibold text-xl text-gray-900 mb-3">Construction & Availability</h3>
                <p className="text-[#64748B] mb-4">
                    Housing starts show resilience but need to accelerate significantly to meet demand and government targets. Extremely low vacancy rates in major urban centers like Toronto and Vancouver highlight the intense pressure on the rental market, driving up rental costs and making it difficult for many to find suitable housing.
                </p>
                <Link href="/housing/supply-rental-challenges" className="text-[#27ae60] font-medium hover:underline">
                    Explore supply issues →
                </Link>
            </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-4">Mortgage Rate Environment</h2>
          <p className="text-[#64748B] mb-6 max-w-3xl">
            After a period of historically low rates, mortgage costs have risen sharply, impacting buyer affordability and market activity.
          </p>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold text-xl text-gray-900 mb-4">5-Year Fixed Mortgage Rate Trend</h3>
            <div className="h-80 md:h-96 w-full">
              <LazyPlot chartName="MortgageRate" />
            </div>
            <div className="flex items-start mt-4 text-sm text-[#64748B]">
              <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>Data: Bank of Canada, typical advertised rates. Illustrative.</p>
            </div>
          </div>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="col-span-2">
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Impact of Higher Borrowing Costs</h3>
              <p className="text-[#64748B] mb-4">
                The increase in mortgage rates since early 2022 has significantly reduced purchasing power for prospective homebuyers. This has led to a slowdown in sales activity and has put many buyers on the sidelines. Recent minor dips in rates offer some relief, but overall borrowing costs remain elevated.
              </p>
              <Link href="/housing/mortgage-rate-impacts" className="text-[#27ae60] font-medium hover:underline inline-flex items-center">
                Detailed mortgage analysis →
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Considerations</h3>
              <ul className="space-y-2 text-[#64748B]">
                <li className="flex items-start">
                  <Target className="h-5 w-5 mr-2 text-[#3498db] flex-shrink-0 mt-0.5" />
                  <span>Stress test qualifications have become tougher.</span>
                </li>
                <li className="flex items-start">
                  <TrendingDown className="h-5 w-5 mr-2 text-[#27ae60] flex-shrink-0 mt-0.5" />
                  <span>Potential for rate cuts later in 2024/2025 if inflation subsides.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-6">Recent Housing Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="border-l-2 border-[#8e44ad] pl-4">
              <h3 className="font-semibold text-xl text-gray-900 mb-2">Affordability Crisis: Generational Divide</h3>
              <p className="text-[#64748B] mb-3">How the path to homeownership differs for Millennials and Gen Z compared to previous generations.</p>
              <span className="text-sm text-[#64748B] mb-3 block">May 5, 2025</span>
              <Link href="/housing/generational-affordability" className="text-[#27ae60] font-medium hover:underline">Read analysis →</Link>
            </article>
            <article className="border-l-2 border-[#8e44ad] pl-4">
              <h3 className="font-semibold text-xl text-gray-900 mb-2">The Role of Foreign Investment in Canadian Real Estate</h3>
              <p className="text-[#64748B] mb-3">Examining the data and policy debates surrounding non-resident ownership.</p>
              <span className="text-sm text-[#64748B] mb-3 block">April 29, 2025</span>
              <Link href="/housing/foreign-investment-impact" className="text-[#27ae60] font-medium hover:underline">Read analysis →</Link>
            </article>
            <article className="border-l-2 border-[#8e44ad] pl-4">
              <h3 className="font-semibold text-xl text-gray-900 mb-2">Urban Sprawl vs. Densification: Canada's Future Cities</h3>
              <p className="text-[#64748B] mb-3">Exploring the challenges and opportunities in how Canadian cities grow.</p>
              <span className="text-sm text-[#64748B] mb-3 block">April 22, 2025</span>
              <Link href="/housing/urban-development-paths" className="text-[#27ae60] font-medium hover:underline">Read analysis →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#8e44ad] to-[#c0392b] py-12 md:py-16 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-bold text-2xl md:text-3xl mb-4">Canadian Housing Insights</h2>
            <p className="text-white/90 mb-6">Get the latest housing market data and analysis delivered to your inbox.</p>
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
