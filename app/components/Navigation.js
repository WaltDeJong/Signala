'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Briefcase, LandPlot } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/signala.svg" alt="Signala" className="h-20 md:h-28" />
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink href="/housing" icon={<Home className="h-5 w-5" />} label="Housing" />
            <NavLink href="/jobs" icon={<Briefcase className="h-5 w-5" />} label="Jobs" />
            <NavLink href="/politics" icon={<LandPlot className="h-5 w-5" />} label="Politics" />
          </div>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, label }) {
  return (
    <Link 
      href={href} 
      className="flex items-center text-[#64748B] hover:text-[#27ae60] font-medium transition-colors"
    >
      <span className="mr-1">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#64748B] p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md p-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            <NavLink href="/housing" icon={<Home className="h-5 w-5" />} label="Housing" />
            <NavLink href="/jobs" icon={<Briefcase className="h-5 w-5" />} label="Jobs" />
            <NavLink href="/politics" icon={<LandPlot className="h-5 w-5" />} label="Politics" />
          </div>
        </div>
      )}
    </div>
  );
}
