/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Shield, ShieldCheck, Terminal, Menu, X, LockKeyhole, FileCode, Clock } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  showPlanner: boolean;
  setShowPlanner: (show: boolean) => void;
  showAdmin: boolean;
  setShowAdmin: (show: boolean) => void;
  onOpenConsultationModal: () => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  showPlanner,
  setShowPlanner,
  showAdmin,
  setShowAdmin,
  onOpenConsultationModal,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Services", id: "services" },
    { label: "Industries", id: "industries" },
    { label: "Case Studies", id: "cases" },
    { label: "Trust Center", id: "trust" },
    { label: "Blog", id: "blog" },
    { label: "Contact Us", id: "contact" },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setShowPlanner(false);
    setShowAdmin(false);
    setMobileMenuOpen(false);
  };

  const handlePlannerToggle = () => {
    setShowPlanner(!showPlanner);
    setShowAdmin(false);
    setMobileMenuOpen(false);
  };

  const handleAdminToggle = () => {
    setShowAdmin(!showAdmin);
    setShowPlanner(false);
    setMobileMenuOpen(false);
  };

  const formattedTime = time.toISOString().replace("T", " ").substring(0, 19) + " UTC";

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick("home")} 
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/30 group-hover:border-blue-500 group-hover:bg-blue-600/20 transition-all duration-300">
            <Shield className="w-5 h-5 text-blue-400 group-hover:text-blue-300 group-hover:scale-105 transition-all" />
            <div className="absolute -inset-1 rounded-lg bg-blue-500/20 blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg text-white tracking-tight">AEGIS</span>
              <span className="font-display font-medium text-xs tracking-wider uppercase text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-400 block tracking-widest">CYBER RECON & PROTECTION</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`px-3.5 py-2 rounded-md font-sans text-sm font-medium transition-all duration-200 ${
                currentPage === item.id && !showPlanner && !showAdmin
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/40"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Secondary controls (Planner, Admin, CTA) */}
        <div className="hidden xl:flex items-center gap-3" id="secondary-nav">
          {/* UTC Clock for security accuracy */}
          <div className="hidden 2xl:flex items-center gap-1.5 font-mono text-[11px] text-slate-500 bg-slate-900/50 px-2.5 py-1.5 rounded border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{formattedTime}</span>
          </div>

          <button
            id="toggle-planner"
            onClick={handlePlannerToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs font-semibold uppercase tracking-wider border transition-all duration-200 ${
              showPlanner
                ? "bg-indigo-600/20 border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                : "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
            title="View Website Sitemap & 13 required design report sections"
          >
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span>Design Planner</span>
          </button>

          <button
            id="toggle-admin"
            onClick={handleAdminToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs font-semibold uppercase tracking-wider border transition-all duration-200 ${
              showAdmin
                ? "bg-amber-600/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                : "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
            title="Simulated secure administrator dashboard to track leads and form signs"
          >
            <LockKeyhole className="w-4 h-4 text-amber-400" />
            <span>Admin Panel</span>
          </button>

          <button
            id="header-cta"
            onClick={onOpenConsultationModal}
            className="px-4 py-2 text-xs font-semibold font-display tracking-wider uppercase rounded bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] cursor-pointer"
          >
            Audit Request
          </button>
        </div>

        {/* Small/Tablet secondary menu controls */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Tiny indicator for Planner block on mobile tabs */}
          <button
            onClick={handlePlannerToggle}
            className={`p-2 rounded border text-xs font-mono uppercase tracking-widest ${
              showPlanner ? "bg-indigo-600/10 border-indigo-500 text-indigo-400" : "bg-slate-900 border-slate-700 text-slate-400"
            }`}
            title="Planner"
          >
            <FileCode className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleAdminToggle}
            className={`p-2 rounded border text-xs font-mono uppercase tracking-widest ${
              showAdmin ? "bg-amber-600/10 border-amber-500 text-amber-400" : "bg-slate-900 border-slate-700 text-slate-400"
            }`}
            title="Admin Logs"
          >
            <LockKeyhole className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-slate-700 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0c1220]/95 backdrop-blur-lg absolute left-0 right-0 py-6 px-4 shadow-xl z-40 transition-all duration-300">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-all ${
                  currentPage === item.id && !showPlanner && !showAdmin
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-slate-800 my-3"></div>
            <button
              onClick={handlePlannerToggle}
              className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium flex items-center gap-2 font-mono uppercase tracking-wide ${
                showPlanner ? "bg-indigo-600/20 text-indigo-400" : "text-slate-400"
              }`}
            >
              <FileCode className="w-4 h-4 text-indigo-400" />
              <span>Sitemap / Planner Docs</span>
            </button>
            <button
              onClick={handleAdminToggle}
              className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium flex items-center gap-2 font-mono uppercase tracking-wide ${
                showAdmin ? "bg-amber-600/20 text-amber-400" : "text-slate-400"
              }`}
            >
              <LockKeyhole className="w-4 h-4 text-amber-400" />
              <span>Admin Systems Portal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultationModal();
              }}
              className="mt-2 w-full py-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-sans text-sm font-semibold tracking-wide text-center uppercase cursor-pointer"
            >
              Get Free Audit Report
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
