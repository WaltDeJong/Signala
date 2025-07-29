'use client';

import Link from 'next/link';
import { Home, Briefcase, LandPlot } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <section className="container mx-auto px-4 md:px-6 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-3xl">
          <h1 className="text-[#333333] font-bold text-3xl md:text-5xl leading-tight">
            Data-driven insights on how Canadians live, work, and vote
          </h1>
          <p className="text-[#64748B] text-lg md:text-xl mt-4 md:mt-6">
            Nonpartisan analysis and visualizations exploring the numbers behind Canadian life.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-12 md:pb-20">
        <article className="border-t border-[#8e44ad] pt-6 mb-12">
          <h2 className="text-[#333333] font-bold text-2xl md:text-3xl mb-4">Latest Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-[#333333] font-semibold text-xl mb-3">Why housing affordability matters to Canadian voters</h3>
              <p className="text-[#64748B] mb-4">A deep dive into how housing policy has become the top concern for voters in urban centers across Canada.</p>
              <Link href="/housing/affordability" className="text-[#27ae60] font-medium hover:underline">Read analysis →</Link>
            </div>
            <div className="aspect-video bg-slate-100 flex items-center justify-center">
              <span className="text-slate-400">Housing Affordability Visualization</span>
            </div>
          </div>
        </article>
      </section>

      <div className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <ContentSection 
          title="Housing" 
          icon={<Home className="h-5 w-5 md:h-6 md:w-6" />}
          description="Tracking affordability, market trends, and policy impacts on Canadian housing."
          articles={[
            { title: "The urban-rural housing divide", excerpt: "How housing markets differ drastically between major urban centers and rural communities.", link: "/housing/urban-rural-divide" },
            { title: "Mortgage rates and housing starts", excerpt: "Analyzing the relationship between interest rates and new housing development across provinces.", link: "/housing/mortgage-rates-impact" }
          ]}
        />

        <ContentSection 
          title="Jobs" 
          icon={<Briefcase className="h-5 w-5 md:h-6 md:w-6" />}
          description="Examining employment trends, wage growth, and labor market dynamics."
          articles={[
            { title: "Regional employment disparities", excerpt: "Mapping the variance in employment rates and industry concentration across Canada.", link: "/jobs/regional-disparities" },
            { title: "Remote work adoption by industry", excerpt: "Which sectors are embracing permanent remote work policies, and what it means for workers.", link: "/jobs/remote-work-trends" }
          ]}
        />

        <ContentSection 
          title="Politics" 
          icon={<LandPlot className="h-5 w-5 md:h-6 md:w-6" />}
          description="Nonpartisan analysis of voting patterns, policy impacts, and public opinion."
          articles={[
            { title: "Evolving voting patterns in Quebec", excerpt: "How regional voting blocs have shifted over the past three federal elections.", link: "/politics/quebec-voting-patterns" },
            { title: "Climate policy support by demographic", excerpt: "Breaking down how age, location, and economic factors correlate with climate policy support.", link: "/politics/climate-policy-demographics" }
          ]}
        />
      </div>

      <section className="bg-gradient-to-r from-[#8e44ad] to-[#c0392b] py-12 md:py-16 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-bold text-2xl md:text-3xl mb-4">Stay Updated</h2>
            <p className="text-white/90 mb-6">Get the latest data-driven analysis on Canadian trends straight to your inbox.</p>
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
              <img 
                src="/signala.svg" 
                alt="Signala" 
                className="h-16 md:h-20" 
              />
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
    </main>
  );
}

function ContentSection({ title, icon, description, articles }) {
  return (
    <section className="border-t border-gray-200 py-12 md:py-16">
      <div className="flex items-center mb-4">
        <div className="text-[#27ae60] mr-2">
          {icon}
        </div>
        <h2 className="text-[#333333] font-bold text-2xl md:text-3xl">{title}</h2>
      </div>
      
      <p className="text-[#64748B] text-lg mb-8 max-w-3xl">
        {description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {articles.map((article, index) => (
          <article key={index} className="border-l-2 border-[#8e44ad] pl-4">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">{article.title}</h3>
            <p className="text-[#64748B] mb-3">{article.excerpt}</p>
            <Link href={article.link} className="text-[#27ae60] font-medium hover:underline">
              Read more →
            </Link>
          </article>
        ))}
      </div>
      
      <div className="mt-8">
        <Link 
          href={`/${title.toLowerCase()}`}
          className="inline-flex items-center text-[#27ae60] font-medium hover:underline"
        >
          View all {title.toLowerCase()} analysis →
        </Link>
      </div>
    </section>
  );
}
