/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Shield, Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, ShieldAlert } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
  setShowPlanner: (show: boolean) => void;
  onSubscribeNewsletter: (email: string) => void;
}

export default function Footer({ setCurrentPage, setShowPlanner, onSubscribeNewsletter }: FooterProps) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // basic email layout validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid business email address.");
      setSuccess(false);
      return;
    }

    onSubscribeNewsletter(email);
    setSuccess(true);
    setErrorMsg("");
    setEmail("");
    setTimeout(() => setSuccess(false), 5000);
  };

  const footerLinks = [
    { label: "Home", page: "home" },
    { label: "About Us", page: "about" },
    { label: "Cyber Services", page: "services" },
    { label: "Industries Served", page: "industries" },
    { label: "Client Case Studies", page: "cases" },
    { label: "Enterprise Trust Center", page: "trust" },
    { label: "Threat Blog", page: "blog" },
    { label: "Contact Consultation", page: "contact" },
  ];

  const regulations = [
    "SOC 2 Type II Certified",
    "ISO 27001 Lead Auditors",
    "CREST Approved Pen-testers",
    "HIPAA Security Compliant",
    "CISA Certified Experts"
  ];

  return (
    <footer className="bg-[#05080e] border-t border-slate-800 text-slate-300 font-sans" id="footer-core">
      {/* Upper Certified Seals / Certifications */}
      <div className="border-b border-slate-800/60 bg-slate-950/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-white tracking-wide font-display">Compliance & Attestation Standards</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6">
            {regulations.map((badge, idx) => (
              <span
                key={idx}
                className="text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:border-emerald-500/30 transition-all duration-300"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        {/* Company Pitch Column */}
        <div className="lg:col-span-4 space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-600/10 border border-blue-500/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <span className="font-display font-bold text-lg text-white">AEGIS CYBERSECURITY</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            Providing enterprise-grade penetration testing, continuous active threat surveillance, and rapid incident isolation response services globally. Locking down digital environments with high integrity.
          </p>
          <div className="space-y-2 font-mono text-xs text-slate-500">
            <p>Global Dev Hub: IT Park, Nagpur, MH, India</p>
            <p>Liaison Office: 100 Pine St, San Francisco, CA</p>
            <p>Active Response Portal: core-op@aegis-sec.com</p>
          </div>
        </div>

        {/* Navigation Quick Links Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">Security Sections</h4>
          <ul className="space-y-2 text-sm">
            {footerLinks.map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    setCurrentPage(link.page);
                    setShowPlanner(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400 hover:underline"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact/Support Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">Emergency Response Host</h4>
          <div className="space-y-3.5 text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-slate-400 leading-snug">
                <strong className="text-white text-xs block">Nagpur Global SOC:</strong>
                <span>Wing B, Software Block, IT Park, Gayatri Nagar, Nagpur, MH 440022</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 pt-2 border-t border-slate-900">
              <MapPin className="w-4.5 h-4.5 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-slate-400 leading-snug">
                <strong className="text-slate-300 text-xs block">SF Liaison Office:</strong>
                <span>Floor 42, 100 Pine St, SF, CA 94111</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              <Phone className="w-4.5 h-4.5 text-slate-500 shrink-0" />
              <span className="text-slate-400">+91 (712) 555-AEGIS (South Asia)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4.5 h-4.5 text-slate-500 shrink-0" />
              <span className="text-slate-400">ops@aegis-defense.com</span>
            </div>
          </div>
        </div>

        {/* Newsletter Signup Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">Security Bulletins</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            Get elite weekly threat intelligence digests, zero-day threat evaluations, and compliance safety bulletins straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="relative mt-2 flex flex-col gap-2">
            <div className="relative">
              <input
                type="email"
                placeholder="security@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0f1b] border border-slate-700/80 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 pr-10"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded transition hover:scale-105"
                title="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {errorMsg && (
              <span className="text-xs text-red-400 font-mono italic">{errorMsg}</span>
            )}
            {success && (
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Active subscriber successfully saved.
              </span>
            )}
          </form>
          <div className="text-[11px] text-slate-500 italic block mt-1">
            * Fully spam protected and encrypted under XSS/CSRF mitigation practices.
          </div>
        </div>
      </div>

      {/* Deep Footer Legal */}
      <div className="border-t border-slate-800/40 bg-[#030509] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Aegis CyberSecurity Services Company. All rights reserved. SEC-OPS-ID #77-B</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentPage("contact")} className="hover:text-slate-300 hover:underline">Privacy Policy</button>
            <span className="text-slate-850">|</span>
            <button onClick={() => setCurrentPage("contact")} className="hover:text-slate-300 hover:underline">Terms & Conditions</button>
            <span className="text-slate-850">|</span>
            <button onClick={() => { setShowPlanner(true); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-slate-300 hover:underline text-indigo-400">Sitemap / Planner Docs</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
