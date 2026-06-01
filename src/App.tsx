/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Shield, ShieldAlert, ShieldCheck, Lock, Unlock, Server, Key, Cpu, Database, 
  Activity, Terminal, Users, Menu, X, ChevronRight, CheckCircle, AlertTriangle, 
  Calendar, Clock, Send, Phone, MapPin, Mail, ArrowRight, LockKeyhole, Download, 
  ExternalLink, Search, Briefcase, Layers, Landmark, ShoppingBag, GraduationCap, 
  Factory, Rocket, Building2, Eye, BookOpen, HeartHandshake, HelpCircle, CheckSquare, Zap
} from "lucide-react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import VulnerabilityChecker from "./components/VulnerabilityChecker";
import ChecklistGenerator from "./components/ChecklistGenerator";
import AdminPanel from "./components/AdminPanel";
import PlannerHub from "./components/PlannerHub";
import TrustCenter from "./components/TrustCenter";

import { SERVICES, INDUSTRIES, CASE_STUDIES, BLOG_POSTS } from "./data";
import { ContactRequest, SecurityAuditRequest, ConsultationBooking, Service } from "./types";

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [showPlanner, setShowPlanner] = useState<boolean>(false);
  const [showAdmin, setShowAdmin] = useState<boolean>(false);

  // Form / Lead State
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [audits, setAudits] = useState<SecurityAuditRequest[]>([]);
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [subscribes, setSubscribes] = useState<string[]>([]);

  // Selected major service detail overlay
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Modal State for Booking & Audit Form
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  // Contact Form Inputs
  const [contactForm, setContactForm] = useState({
    name: "", email: "", phone: "", companyName: "", serviceRequired: "Penetration Testing", message: ""
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  // Booking Form Inputs
  const [bookingForm, setBookingForm] = useState({
    name: "", email: "", phone: "", preferredDate: "", preferredTimeSlot: "10:00 AM - 11:00 AM", consultationTopic: "General Penetration Testing"
  });

  // Audit Form Inputs
  const [auditForm, setAuditForm] = useState({
    companyDomain: "", contactEmail: "", teamSize: "1-10", hostingEnvironment: "Cloud" as any, complianceNeeds: [] as string[]
  });

  // Service list filter
  const [serviceFilter, setServiceFilter] = useState<string>("All");

  // Lead handlers
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaAnswer !== "7") {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);

    const submission: ContactRequest = {
      ...contactForm,
      timestamp: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
    };
    setContacts([submission, ...contacts]);
    setContactSubmitted(true);
    setContactForm({ name: "", email: "", phone: "", companyName: "", serviceRequired: "Penetration Testing", message: "" });
    setCaptchaAnswer("");
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  const handleAuditRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const submission: SecurityAuditRequest = {
      ...auditForm,
      agreeToAuditTerms: true,
      timestamp: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
    };
    setAudits([submission, ...audits]);
    setAuditSubmitted(true);
    setAuditForm({ companyDomain: "", contactEmail: "", teamSize: "1-10", hostingEnvironment: "Cloud", complianceNeeds: [] });
    setTimeout(() => {
      setAuditSubmitted(false);
      setIsConsultationModalOpen(false);
    }, 4000);
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission: ConsultationBooking = {
      ...bookingForm,
      timestamp: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
    };
    setBookings([submission, ...bookings]);
    setConsultationSubmitted(true);
    setBookingForm({ name: "", email: "", phone: "", preferredDate: "", preferredTimeSlot: "10:00 AM - 11:00 AM", consultationTopic: "General Penetration Testing" });
    setTimeout(() => {
      setConsultationSubmitted(false);
      setIsConsultationModalOpen(false);
    }, 4000);
  };

  const handleSubscribeNewsletter = (email: string) => {
    setSubscribes([email, ...subscribes]);
  };

  const handleClearLogs = () => {
    setContacts([]);
    setAudits([]);
    setBookings([]);
    setSubscribes([]);
  };

  const toggleComplianceNeed = (need: string) => {
    if (auditForm.complianceNeeds.includes(need)) {
      setAuditForm({ ...auditForm, complianceNeeds: auditForm.complianceNeeds.filter(n => n !== need) });
    } else {
      setAuditForm({ ...auditForm, complianceNeeds: [...auditForm.complianceNeeds, need] });
    }
  };

  // Helper for rendering icons dynamically
  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case "Landmark": return <Landmark className="w-5 h-5 text-blue-400" />;
      case "Activity": return <Activity className="w-5 h-5 text-emerald-400" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-indigo-400" />;
      case "ShoppingBag": return <ShoppingBag className="w-5 h-5 text-teal-400" />;
      case "GraduationCap": return <GraduationCap className="w-5 h-5 text-amber-500" />;
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case "Factory": return <Factory className="w-5 h-5 text-slate-400" />;
      case "Rocket": return <Rocket className="w-5 h-5 text-rose-400" />;
      default: return <Building2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* Header bar */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        showPlanner={showPlanner}
        setShowPlanner={setShowPlanner}
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
        onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* Dynamic Planner Display Overlay Hub */}
        {showPlanner && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-4">
              <span className="text-xs font-mono text-indigo-400 block tracking-widest uppercase">INTERACTIVE SPECIFICATION</span>
              <h2 className="text-2xl font-display font-bold text-white mt-1">Design & Planning Document Hub</h2>
              <p className="text-xs text-slate-400 mt-1">Review full sitemap configurations, CSS theme variables, targeted SEO keywords, and security mitigation practices</p>
            </div>
            <PlannerHub />
          </div>
        )}

        {/* Dynamic Admin Control Panel display */}
        {showAdmin && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-4">
              <span className="text-xs font-mono text-amber-400 block tracking-widest uppercase">SECURITY VERIFICATION PROTOCOLS</span>
              <h2 className="text-2xl font-display font-bold text-white mt-1">Leads CMS & Logging Console</h2>
              <p className="text-xs text-slate-400 mt-1">Securely manage, edit, and wipe inquiries submitted across dynamic booking sheets in active state</p>
            </div>
            <AdminPanel
              contacts={contacts}
              audits={audits}
              bookings={bookings}
              subscribes={subscribes}
              onClearLogs={handleClearLogs}
            />
          </div>
        )}

        {/* Home Page View */}
        {!showPlanner && !showAdmin && currentPage === "home" && (
          <div>
            {/* HERO SECTION */}
            <section className="relative pt-12 pb-20 sm:pb-24 overflow-hidden border-b border-slate-800/60" id="hero-banner">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#090d16] to-[#090d16] -z-10 pointer-events-none"></div>
              {/* Futuristic network grid mock */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-15 pointer-events-none opacity-40"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
                {/* Visual Status Indicator */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono font-semibold tracking-wider text-blue-400 uppercase">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24/7 Threat Protection Engaged</span>
                </div>

                {/* Powerful Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] sm:leading-[1.15]">
                  Protect Your Business From <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500">Modern Cyber Threats</span>
                </h1>

                {/* Tagline */}
                <p className="text-[#a0aec0] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  We provide expert cyber security services including penetration testing, vulnerability assessment, cloud security, and 24/7 threat monitoring to keep your business and customer records safe.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-sans font-bold text-sm tracking-wide uppercase transition shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 cursor-pointer"
                  >
                    Get Free Security Audit
                  </button>
                  <button
                    onClick={() => setCurrentPage("contact")}
                    className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 rounded font-sans font-bold text-sm tracking-wide uppercase transition hover:border-slate-500 cursor-pointer"
                  >
                    Talk to Security Expert
                  </button>
                </div>

                {/* Stats Dashboard */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto pt-12 border-t border-slate-800/40 font-mono" id="stats-dashboard">
                  {[
                    { number: "500+", text: "Security Tests Completed" },
                    { number: "99.9%", text: "Client Retention Rate" },
                    { number: "24/7/365", text: "Active Threat SIEM Hub" },
                    { number: "120+", text: "Corporate Networks Armed" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-950/40 p-5 rounded-lg border border-slate-800/80 hover:border-blue-500/30 transition duration-300">
                      <span className="text-2xl sm:text-3xl font-bold font-display text-blue-400 block tracking-tight">{stat.number}</span>
                      <span className="text-[11px] text-slate-400 block mt-1.5 uppercase font-medium">{stat.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TRUST INDICATORS & CLIENT LOGOS */}
            <section className="bg-slate-950/40 border-b border-slate-900 py-10 text-center">
              <div className="max-w-7xl mx-auto px-4 text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">
                TRUSTED COMPLIANCE ASSURANCES & SECURED STACK LAYERS
              </div>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 px-6 opacity-65 grayscale hover:grayscale-0 transition duration-300">
                {["SOC 2 CERTIFIED", "ISO 27001", "OWASP ALIGNED", "HIPAA COMPLIANT", "CREST ACCREDITED"].map((tag, idx) => (
                  <span key={idx} className="font-display font-black text-sm text-slate-400 tracking-wider">
                    ⚸ {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* INTERACTIVE CALCUATOR PREVIEW */}
            <section className="py-16 bg-[#090d16] border-b border-slate-800/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">REAL-TIME MITIGATION DIAGNOSTIC</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">Evaluate Your System Risks Instantly</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Most companies only find out about security flaws after a ransom payload is triggered. Use our interactive risk analyzer to locate configuration holes across cloud environments, access keys, and employee safety routines.
                  </p>
                  <ul className="space-y-3.5 text-xs text-slate-300 font-mono">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span>
                      <span>Instant overall security score index calculation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span>
                      <span>Remediation checklist and analyst tips</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span>
                      <span>Direct printable security posture scorecard export</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-7">
                  <VulnerabilityChecker onOpenAuditRequest={() => setIsConsultationModalOpen(true)} />
                </div>
              </div>
            </section>

            {/* CORE SERVICES SECTOR */}
            <section className="py-16 sm:py-20 bg-slate-950/20 border-b border-slate-800/60" id="services-preview">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-3">
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">CYBER EXCELLENCE SERVICE LAYERS</span>
                  <h2 className="text-3xl font-display font-bold text-white tracking-tight">Our Core Defensive Services</h2>
                  <p className="text-sm text-[#a0aec0] max-w-xl mx-auto">
                    We cover physical, systemic, and human pathways to insulate your code repositories, cloud containers, and internal corporate operations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES.filter(s => s.isMajor).map((service) => (
                    <div 
                      key={service.id} 
                      className="bg-[#0c1220] border border-slate-800 rounded-lg p-6 hover:border-blue-500/40 hover:bg-[#0e1629] transition duration-300 relative group"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors"></div>
                      
                      <div className="inline-flex w-10 h-10 items-center justify-center rounded bg-slate-900 border border-slate-800 text-blue-400 group-hover:text-blue-300 transition mb-4">
                        <Shield className="w-5 h-5" />
                      </div>

                      <h3 className="text-lg font-display font-semibold text-white group-hover:text-blue-300 transition">
                        {service.title}
                      </h3>
                      
                      <p className="text-xs text-slate-400 leading-relaxed mt-2.5 h-16 overflow-hidden">
                        {service.shortDescription}
                      </p>

                      <div className="border-t border-slate-800/50 pt-4 mt-4 space-y-2 text-xs font-sans text-slate-300">
                        {service.businessBenefits.slice(0, 2).map((ben, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold shrink-0">✓</span>
                            <span>{ben}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedService(service)}
                        className="mt-5 w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-xs font-mono text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Service Details</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      setCurrentPage("services");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 text-sm font-mono text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                  >
                    <span>Browse All 15 Cyber Security Portfolios</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* PIPELINE / WORKFLOW TIMELINE */}
            <section className="py-16 sm:py-20 bg-[#090d16] border-b border-slate-800/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-3">
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">OPERATION PIPELINE</span>
                  <h2 className="text-3xl font-display font-bold text-white tracking-tight">Our Structured Security Process</h2>
                  <p className="text-sm text-slate-400 max-w-xl mx-auto">
                    We design assessments around the cyber kill chain to comprehensively map vulnerability states.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs relative">
                  {/* Connecter track for large monitors */}
                  <div className="hidden lg:block absolute left-4 right-4 top-14 h-0.5 bg-slate-800/80 -z-5"></div>

                  {[
                    { step: "01", title: "RECONNAISSANCE", desc: "Passive and active mapping of the external host perimeter and employee data targets to spot exposure pathways." },
                    { step: "02", title: "THREAT PLOTTING", desc: "Execute specialized scanning to identify outdated systems, software, cloud credential holes, and logic gaps." },
                    { step: "03", title: "EXPLOITATION", desc: "Perform controlled manual simulations to break authorization layers, secure domain access, and confirm danger impact levels." },
                    { step: "04", title: "REMEDIATION & RE-TEST", desc: "Generate a priority checklist matching remediation logs, then execute verification testing to attest posture safety." }
                  ].map((proc, index) => (
                    <div key={index} className="bg-slate-950/60 border border-slate-800 p-5 rounded-lg space-y-3 relative">
                      <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">{proc.step}</span>
                      <h4 className="font-display font-bold text-sm text-white tracking-wide uppercase pt-1">{proc.title}</h4>
                      <p className="text-slate-400 font-sans leading-relaxed text-[12px]">{proc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TESTIMONIALS & FAQ COMBINED */}
            <section className="py-16 bg-[#090d16]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* FAQ COLUMN */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">KNOWLEDGE PERIMETER</span>
                    <h2 className="text-2xl font-display font-bold text-white">Frequently Asked Inquiries</h2>
                  </div>

                  <div className="space-y-4">
                    {[
                      { q: "What is the primary difference between Vulnerability Scanning and Penetration Testing?", a: "Vulnerability Scanning is an automated assessment to catalog potential unpatched service holes. Penetration Testing is a specialized manual exercise where certified engineers actually attempt to exploit those targets, validating if threats can breach data storage." },
                      { q: "Does a security audit affect our active operational runtime?", a: "No. All diagnostic queries and simulated exploits are carefully scheduled around system metrics, or performed on dev clones, assuring zero impact to live customer databases." },
                      { q: "How fast can you initiate emergency incident containment response?", a: "Our 24/7 SIEM SIEM and alert specialists dispatch warning containment workflows under 15 minutes of an active threat alert." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-lg">
                        <strong className="text-sm font-display text-white block">{item.q}</strong>
                        <p className="text-xs text-slate-400 leading-relaxed mt-2">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TESTIMONIAL COLUMN */}
                <div className="lg:col-span-5 space-y-6 lg:mt-7">
                  <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-5 relative">
                    <div className="absolute top-4 right-4 font-black font-display text-4xl text-blue-500/10 pointer-events-none">“</div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">VERIFIED TESTIMONIAL</span>
                    
                    <p className="text-sm font-sans text-slate-300 italic leading-relaxed">
                      "Aegis conducted an exhaustive API security pentest and fixed 4 deep logical bypass holes on our billing payment nodes. Their detailed documentation allowed us to easily pass our SOC 2 audit under strict timelines."
                    </p>

                    <div className="border-t border-slate-800/60 pt-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center font-bold text-blue-400 font-mono text-xs border border-slate-800">
                        CT
                      </div>
                      <div>
                        <strong className="text-xs font-display text-white text-md block">Chief Technology Officer</strong>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Enterprise Payment Software Platform</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Small audit CTA */}
                  <div className="bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border border-blue-500/10 p-5 rounded-xl text-center">
                    <p className="text-xs text-slate-300">Ready to secure your workspace environment?</p>
                    <button 
                      onClick={() => setIsConsultationModalOpen(true)}
                      className="mt-3 text-xs font-mono font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Nominate Domain for Audit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* About Us Page View */}
        {!showPlanner && !showAdmin && currentPage === "about" && (
          <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-fade-in" id="about-us-view">
            {/* Mission / Intro */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">ABOUT AEGIS SECTOR</span>
                <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">Security-First Philosophy Designed to Safeguard Innovations</h1>
                <p className="text-sm text-[#cbd5e1] leading-relaxed">
                  Aegis was founded under the premise that standard cybersecurity assessments ignore the logical structures of modern architectures. True security cannot be attained utilizing standard boilerplate scanners - it requires thinking like an active, persistent adversary.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our certified threat analysts, pen-testers, and incident containment managers hold industry-leading qualifications including OSCP, CEH, CISSP, and ISO 27001 Lead Auditor certificates. We keep your code, networks, and workers hard-locked.
                </p>
              </div>

              <div className="bg-slate-950/60 p-6 sm:p-8 rounded-xl border border-slate-800 space-y-4 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>
                
                <h3 className="font-display font-bold text-white text-md tracking-wide flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Our Five Core Commitments</span>
                </h3>
                
                <ul className="space-y-3 font-sans text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span><strong>100% Manual Verification</strong>: No false positive logs or placeholder scanning files.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span><strong>Full Operational Safety</strong>: Zero downtime induced during authorized threat simulations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span><strong>Strict NDA Secrecy</strong>: Ultimate enterprise-grade safety around testing parameters.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span><strong>Immediate Alert Notification</strong>: Alerts dispatched under 15 minutes of any critical exposure.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span><strong>Continuous Remediation Support</strong>: Verification testing included standard on all projects.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-display font-semibold text-white tracking-tight border-b border-slate-800 pb-3">Corporate Chronology & Threat Records</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-slate-400">
                {[
                  { year: "2020", title: "PORTFOLIO FOUNDATION", desc: "Aegis established by senior security consultants to disrupt passive automated scans, shifting corporate priorities to manual penetration testing." },
                  { year: "2023", title: "SOC & threat CENTER EXPANSION", desc: "Opened a 24/7 proactive security monitoring center designed around automated cloud telemetry and behavioral incident responds." },
                  { year: "2026", title: "ZERO-TRUST FRAMEWORKS", desc: "Successfully deployed immutable credential barriers across 120+ SaaS payment gate databases and medical devices clusters." }
                ].map((chron, idx) => (
                  <div key={idx} className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 space-y-2">
                    <span className="text-sm font-bold text-blue-400 block tracking-wider">{chron.year} -- {chron.title}</span>
                    <p className="font-sans leading-relaxed text-[12px]">{chron.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialist Team Certified list */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">CYBER RECON ELITE</span>
                <h3 className="text-xl font-display font-semibold text-white tracking-tight">Our Certified Threat Hunter Leads</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: "Elena Vance", role: "SVP Threat Intelligence & Recon", badge: "OSCP, OSCE" },
                  { name: "Marcus Vance", role: "Cloud Security Architecture Dev", badge: "CCSP, CSSLP" },
                  { name: "Sarah Sterling", role: "Compliance & Enterprise Auditing Partner", badge: "CISA, CPA" }
                ].map((th, idx) => (
                  <div key={idx} className="bg-[#111726]/40 border border-slate-800/80 p-5 rounded-lg text-center space-y-2 relative hover:border-slate-700 transition">
                    <div className="w-12 h-12 rounded-full bg-slate-950 font-mono font-bold border border-slate-800/80 text-blue-400 flex items-center justify-center text-sm mx-auto">
                      {th.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <strong className="text-white font-display text-sm block pt-1">{th.name}</strong>
                    <span className="text-xs text-slate-400 block font-sans">{th.role}</span>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20 inline-block uppercase font-bold tracking-wider">{th.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services Hub View */}
        {!showPlanner && !showAdmin && currentPage === "services" && (
          <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in" id="services-page-view">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">DIRECTORY OF SAFEGUARDS</span>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Our Complete Cyber Security Services</h1>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Filter and browse through all 15 services. Let Aegis establish secure bounds around your operations.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-950 max-w-md mx-auto p-1 rounded-lg border border-slate-800">
              {["All", "Security Assessment", "Deflective Security", "Compliance & Training"].map((type) => (
                <button
                  key={type}
                  onClick={() => setServiceFilter(type)}
                  className={`px-3 py-1.5 rounded font-mono text-xs font-semibold uppercase tracking-wider transition ${
                    serviceFilter === type
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {type.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Services Grid list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.filter(s => serviceFilter === "All" || s.category === serviceFilter).map((s) => (
                <div key={s.id} className="bg-[#0c1220] border border-slate-800 rounded-lg p-5 hover:border-blue-500/30 hover:bg-[#0f1729] transition duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-900 pb-3 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#a0aec0] bg-slate-950 px-2 py-0.5 rounded border border-slate-900/80">
                        {s.category}
                      </span>
                      {s.isMajor && (
                        <span className="text-[9px] font-mono uppercase tracking-widest font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          Primary Offer
                        </span>
                      )}
                    </div>
                    <strong className="text-base font-display text-white block font-semibold">{s.title}</strong>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                      {s.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/40 mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">ID: {s.id.toUpperCase()}</span>
                    
                    {s.isMajor ? (
                      <button
                        onClick={() => setSelectedService(s)}
                        className="text-xs text-blue-400 hover:text-blue-300 font-mono font-bold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        <span>Deep Detail</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsConsultationModalOpen(true)}
                        className="text-xs text-slate-400 hover:text-white font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inquire Slot</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Checklist Section integration */}
            <div className="bg-[#080d16] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">INTERACTIVE COMPLIANCE TOOL</span>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">Export Security Action Sheets Direct</h3>
                <p className="text-sm text-slate-400 mt-2">
                  Need a quick checklists baseline to share with developers or management? Choose your industry segment, complete target checkboxes, and export full security manuals in 1-click.
                </p>
              </div>

              <ChecklistGenerator />
            </div>
          </section>
        )}

        {/* Industries Serviced View */}
        {!showPlanner && !showAdmin && currentPage === "industries" && (
          <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in" id="industries-view">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">COMPLIANCE BOUNDS MAPPING</span>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Industries We Insulate</h1>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Each corporate sector operates under distinct risk topologies and compliance structures. We align auditing scopes to match your regulatory standards.
              </p>
            </div>

            {/* Sectors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INDUSTRIES.map((ind) => (
                <div key={ind.id} className="bg-[#0b0f19] border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition duration-300 relative group">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-9 h-9 rounded bg-[#101726] border border-slate-800/80 flex items-center justify-center shrink-0">
                      {getIndustryIcon(ind.icon)}
                    </div>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/5 px-2.5 py-0.5 rounded border border-indigo-500/10 uppercase tracking-wider font-semibold">
                      SEC-MAPPED: {ind.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2">{ind.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {ind.description}
                  </p>

                  <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-900 space-y-2 mt-4 text-xs font-mono">
                    <div className="text-slate-400">
                      <span className="text-[10px] font-black tracking-wider block text-emerald-400 uppercase">Primary compliance:</span>
                      <p className="font-sans text-[#cbd5e1] mt-0.5">{ind.keyCompliance}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-900 text-slate-400">
                      <span className="text-[10px] font-black tracking-wider block text-red-400 uppercase">Primary Attack Risk:</span>
                      <p className="font-sans text-[#cbd5e1] mt-0.5">{ind.primaryRisk}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-xs font-mono font-medium text-slate-400 hover:text-white transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Inquire Segment Compliance Package</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Case Studies View */}
        {!showPlanner && !showAdmin && currentPage === "cases" && (
          <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in" id="cases-view">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">ADVERSARY COUNTER REPORTS</span>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Corporate Case Investigations</h1>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Real challenges structured under NDA guidelines to prove Aegis strategic incident defense success rates.
              </p>
            </div>

            {/* Case Studies Lists */}
            <div className="space-y-8">
              {CASE_STUDIES.map((cs) => (
                <div key={cs.id} className="bg-[#0b0f19] border border-slate-800 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-8 p-6 sm:p-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-bold uppercase tracking-wide">
                        {cs.industry} SEGMENT
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{cs.confidentialName}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight">
                      {cs.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-4">
                      <p className="bg-slate-950 p-3 rounded border border-slate-900 leading-relaxed text-slate-400">
                        <strong className="text-white block font-display uppercase tracking-wider mb-1 text-[10px] text-red-400">Threat Challenges Met:</strong>
                        {cs.challenge}
                      </p>
                      <p className="bg-slate-950 p-3 rounded border border-slate-900 leading-relaxed text-slate-400">
                        <strong className="text-white block font-display uppercase tracking-wider mb-1 text-[10px] text-blue-400">Defensive Solution Executed:</strong>
                        {cs.solution}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-900">
                      <strong className="text-[10px] font-mono block text-emerald-400 uppercase font-bold tracking-wider mb-1.5">Remediation Outcome achieved:</strong>
                      <p className="text-sm font-sans text-slate-300 leading-relaxed">
                        {cs.result}
                      </p>
                    </div>
                  </div>

                  {/* Right hand metric card sidebar */}
                  <div className="lg:col-span-4 bg-slate-950 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-center space-y-4">
                    <strong className="text-xs font-mono uppercase tracking-wider text-slate-400">VERIFIABLE SEGMENT RESULTS</strong>
                    <div className="space-y-3 font-mono">
                      {cs.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#cbd5e1] border-b border-slate-900 pb-2">
                          <span className="text-emerald-500 font-bold">🎯</span>
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trust Center View */}
        {!showPlanner && !showAdmin && currentPage === "trust" && (
          <TrustCenter onOpenConsultationModal={() => setIsConsultationModalOpen(true)} />
        )}

        {/* Blog Portal View */}
        {!showPlanner && !showAdmin && currentPage === "blog" && (
          <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in" id="blog-view">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">ACTIVE FORENSICS BULLETIN</span>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Threat Intelligence Bulletins</h1>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Read core updates on cloud security, ransomware mitigations, and compliance guides Authored by the Aegis team.
              </p>
            </div>

            {/* Blog Post List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_POSTS.map((post) => (
                <article key={post.id} className="bg-[#0c1220] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
                  {/* Decorative card upper */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                  
                  <div className="p-5 space-y-3.5">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-500 font-semibold uppercase">
                      <span className="text-indigo-400">{post.category}</span>
                      <span>{post.publishDate} -- {post.readTime}</span>
                    </div>

                    <h3 className="text-base font-display font-bold text-white tracking-tight leading-relaxed">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="bg-slate-950 p-3 rounded text-[11px] font-mono leading-relaxed text-slate-400 border border-slate-900/60 overflow-hidden line-clamp-4 bg-opacity-70">
                      {post.content.replace(/###/g, "").replace(/\*\*/g, "")}
                    </div>
                  </div>

                  <div className="p-5 border-t border-slate-900/80 bg-slate-950/40 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>By: {post.author}</span>
                    <button
                      onClick={() => {
                        alert(`Full readable intelligence bulletins are unlocked during custom client portal onboarding. Code file references are located in data.ts.`);
                      }}
                      className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Read More</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Contact Page View */}
        {!showPlanner && !showAdmin && currentPage === "contact" && (
          <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in" id="contact-view">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">GET SECURE ONBOARDING</span>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Initiate Cyber Safety Assessments</h1>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Submit details below to authorize security reviews, schedule bookings, or access private WhatsApp channels.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Contact detail sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
                  <h3 className="font-display font-bold text-white text-base">Direct Escalation Lines</h3>
                  <div className="space-y-4 text-xs font-mono text-slate-400">
                    <div className="flex items-start gap-2.5">
                      <Mail className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white tracking-wide block">Global Sales Unit:</strong>
                        <span>sales@aegis-defense.com</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white tracking-wide block">South Asia Hotline:</strong>
                        <span>+91 (712) 555-2344 / 2345</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white tracking-wide block">US Liaison support:</strong>
                        <span>+1 (800) 555-SHIELD (7443)</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Inquiry Button integration */}
                  <div className="pt-2">
                    <a
                      href="https://wa.me/917125552344"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold uppercase tracking-wider font-sans flex items-center justify-center gap-2 cursor-pointer transition shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
                    >
                      <Phone className="w-4 h-4 text-white animate-pulse" />
                      <span>WhatsApp Direct Channel</span>
                    </a>
                    <span className="text-[10px] text-slate-500 font-mono italic text-center block mt-1.5">* Direct routing to Nagpur Command Duty Officer</span>
                  </div>
                </div>

                {/* Nagpur IT Park Location Card with Animated Cyber Radar */}
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 relative overflow-hidden" id="nagpur-office-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">PRIMARY DIVISION HUB</span>
                      <h4 className="font-display font-extrabold text-white text-sm">Nagpur IT Park, India</h4>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Systems Nominal"></span>
                  </div>

                  {/* Cyber Radar Mock */}
                  <div className="h-44 bg-slate-900 rounded-lg border border-slate-800 relative flex flex-col items-center justify-center text-center p-4 overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent"></div>
                    
                    {/* Simulated Radar Circular grids */}
                    <div className="absolute w-36 h-36 border border-blue-500/10 rounded-full animate-ping pointer-events-none"></div>
                    <div className="absolute w-28 h-28 border border-blue-500/20 rounded-full animate-pulse pointer-events-none"></div>
                    <div className="absolute w-12 h-12 border border-blue-500/30 rounded-full flex items-center justify-center pointer-events-none">
                      <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></div>
                    </div>
                    
                    {/* Security Coordinates HUD */}
                    <div className="relative font-mono text-[10px] text-slate-400 space-y-1.5 z-10 select-none">
                      <span className="text-blue-400 font-bold block text-xs tracking-wider">AEGIS CYBER HELIPAD BLOCK</span>
                      <p className="text-slate-500">LAT: 21.1245° N | LON: 79.0270° E</p>
                      <p className="text-[9px] text-slate-300 border border-slate-800 px-2 py-0.5 rounded bg-slate-950/80">
                        IT Park, Gayatri Nagar, Nagpur, MH 440022
                      </p>
                    </div>
                    
                    {/* Bottom HUD bar */}
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[9px] font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                      <span>RADAR: ACTIVE</span>
                      <span className="text-emerald-400">SECURE LINK</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Our Nagpur cybersecurity center operates 24/7/365 to deliver proactive threat intelligence, red-team infrastructure testing, and responsive security services to enterprises and local banks across direct Fiber corridors.
                  </p>
                </div>

                <div className="bg-[#0b101c] p-6 rounded-xl border border-zinc-900 space-y-3 font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="font-bold">Encryption Auditing Check</span>
                  </div>
                  <p className="font-sans text-[12px] leading-relaxed">
                    Aegis forms route directly through state memory. To inspect real payloads generated by these components, unlock the passcode <code className="text-amber-400 bg-amber-950/40 px-1 py-0.5 rounded font-bold">ADMIN123</code> inside our Admin panel in global header items.
                  </p>
                </div>
              </div>

              {/* Main Contact Form */}
              <div className="lg:col-span-8 bg-[#0b0f19] border border-slate-800 p-6 sm:p-8 rounded-xl shadow-lg relative">
                <div className="absolute top-0 right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>

                <h3 className="font-display font-extrabold text-white text-lg border-b border-slate-800/80 pb-3 mb-6">
                  Online Contact & Quote Form
                </h3>

                {contactSubmitted ? (
                  <div className="text-center py-16 space-y-3.5 font-mono text-xs">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    </div>
                    <strong className="text-white text-sm font-display uppercase tracking-wider block">Security Token Generated Safely</strong>
                    <p className="text-slate-400 font-sans max-w-sm mx-auto">
                      Form content received. Your information is securely logged in active state memory. Access the Admin Control list to review it.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-wide">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-wide">Business Email Address</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-wide">Phone Number</label>
                        <input
                          type="text"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-wide">Company Name</label>
                        <input
                          type="text"
                          required
                          value={contactForm.companyName}
                          onChange={(e) => setContactForm({ ...contactForm, companyName: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 uppercase tracking-wide">Select Security Service Program Required</label>
                      <select
                        value={contactForm.serviceRequired}
                        onChange={(e) => setContactForm({ ...contactForm, serviceRequired: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Penetration Testing">Vulnerability Penetration Testing</option>
                        <option value="Cloud Security Configuration">Cloud Posture security Configurations</option>
                        <option value="24/7 Security Operations SOC">24/7 SIEM monitoring Operations</option>
                        <option value="Compliance Consulting SOC2">Regulatory Compliance (SOC 2, ISO)</option>
                        <option value="Other Custom Auditing">Other bespoke technical scoping</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 uppercase tracking-wide">Secure Message Scopes & Specs</label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Detail target subnets, host structures or special security priorities..."
                        className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Integrated CAPTCHA validation element */}
                    <div className="p-4 bg-slate-950 rounded-lg border border-slate-900/80 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div className="text-xs text-slate-400 space-y-1">
                        <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider font-mono block">CAPTCHA Shield Active</span>
                        <p className="font-sans">Solve math equation to prove human operation session:</p>
                        <strong className="text-white text-xs block font-mono">What is 3 + 4 = ?</strong>
                      </div>
                      <input
                        type="text"
                        placeholder="Solve math equation..."
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        className="w-full bg-[#070b13] border border-slate-800 rounded px-3 py-2 text-sm font-mono text-center text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    {captchaError && (
                      <p className="text-xs text-red-400 font-mono">⚠️ Invalid CAPTCHA value. Solution attempt blocked.</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-sans text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                    >
                      Authenticate and Submit Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* FOOTER BAR */}
      <Footer
        setCurrentPage={setCurrentPage}
        setShowPlanner={setShowPlanner}
        onSubscribeNewsletter={handleSubscribeNewsletter}
      />

      {/* DYNAMIC SERVICE DETAIL MODAL OVERLAY */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Upper strip theme lock */}
            <div className="h-1.5 bg-blue-500"></div>

            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Service header title */}
              <div className="space-y-1 border-b border-slate-900 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">AEGIS DETAILED SPECIFICATION</span>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">{selectedService.title}</h3>
              </div>

              {selectedService.details ? (
                <div className="space-y-5">
                  
                  {/* Problem statement */}
                  <div className="space-y-1.5">
                    <strong className="text-xs font-mono text-red-400 uppercase tracking-wider block">Security Context Problem:</strong>
                    <p className="text-sm font-sans text-slate-300 leading-relaxed bg-[#101423] p-3 rounded border border-red-500/10 italic">
                      "{selectedService.details.problemStatement}"
                    </p>
                  </div>

                  {/* Actions checklist */}
                  <div className="space-y-1.5">
                    <strong className="text-xs font-mono text-blue-400 uppercase tracking-wider block">Diagnostics Procedures Offered:</strong>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                      {selectedService.details.whatWeDo.map((item, id) => (
                        <li key={id} className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">●</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools catalog */}
                  <div className="space-y-1.5 pt-1">
                    <strong className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Analyst & Forensics Tools Catalog:</strong>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedService.details.toolsUsed.map((tool, idx) => (
                        <span key={idx} className="px-2 py-1 font-mono text-[10px] text-zinc-300 bg-slate-950 border border-slate-800 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing/Timeline bottom strip */}
                  <div className="p-3.5 bg-slate-950/70 border border-slate-900 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-mono">
                    <div className="text-left">
                      <span className="text-slate-500 text-[10px] uppercase block">Scoping Timeline:</span>
                      <strong className="text-white text-xs">{selectedService.details.timeline}</strong>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        setIsConsultationModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold uppercase tracking-wider font-sans cursor-pointer transition shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                    >
                      Audit Target Scope
                    </button>
                  </div>

                </div>
              ) : (
                <div className="text-slate-400 text-sm italic font-mono p-4 text-center">
                  Full programmatic logs under NDA validation. Submit the emergency contact audit sheet to request slot bookings.
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC CONSULTATION SIGN / FREE AUDIT MODAL OVERLAY */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-xl max-w-xl w-full shadow-2xl relative overflow-hidden">
            
            <div className="h-1.5 bg-emerald-500"></div>

            <button
              onClick={() => {
                setIsConsultationModalOpen(false);
                setConsultationSubmitted(false);
                setAuditSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Inner modal tabs */}
            <div className="p-6 sm:p-8 space-y-5">
              
              <div className="space-y-1.5 border-b border-slate-900 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">AEGIS SECURE SCHEDULER</span>
                <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">Book Active Diagnostics Slot</h3>
              </div>

              {/* Form switches (Audit vs Consultation) */}
              {(!consultationSubmitted && !auditSubmitted) ? (
                <div className="space-y-4">
                  {/* Free Security Audit Lead form */}
                  <form onSubmit={handleAuditRequest} className="space-y-3">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold border-b border-slate-800 pb-1">OPTION A: NOMINATE FOR FREE ASSESSMENT</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Target Domain / Subnet</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. secure-site.com"
                          value={auditForm.companyDomain}
                          onChange={(e) => setAuditForm({ ...auditForm, companyDomain: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Business Email</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. partner@corp.com"
                          value={auditForm.contactEmail}
                          onChange={(e) => setAuditForm({ ...auditForm, contactEmail: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Employee Team Count</label>
                        <select
                          value={auditForm.teamSize}
                          onChange={(e) => setAuditForm({ ...auditForm, teamSize: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-550"
                        >
                          <option value="1-10">1 - 10 employees</option>
                          <option value="11-50">11 - 50 employees</option>
                          <option value="51-200">51 - 200 employees</option>
                          <option value="200+">200+ Enterprise</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Hosting Environment</label>
                        <select
                          value={auditForm.hostingEnvironment}
                          onChange={(e) => setAuditForm({ ...auditForm, hostingEnvironment: e.target.value as any })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-550"
                        >
                          <option value="Cloud">Public/SaaS Cloud (AWS/GCP/Azure)</option>
                          <option value="On-Premises">On-Premises Bare Metal</option>
                          <option value="Hybrid">Hybrid Mix Architecture</option>
                        </select>
                      </div>
                    </div>

                    {/* Checkbox fields */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase block">Compliance Attestation Goals Required</label>
                      <div className="flex flex-wrap gap-1.5">
                        {["SOC 2", "PCI-DSS", "HIPAA", "ISO 27001"].map((need) => {
                          const hasSelected = auditForm.complianceNeeds.includes(need);
                          return (
                            <button
                              key={need}
                              type="button"
                              onClick={() => toggleComplianceNeed(need)}
                              className={`px-2 py-1 rounded text-[10px] font-mono border transition ${
                                hasSelected
                                  ? "bg-blue-600/20 text-blue-400 border-blue-500/40"
                                  : "bg-slate-950 border-slate-800 text-slate-500"
                              }`}
                            >
                              {need}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-sans text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Nominate and Request Audit</span>
                    </button>
                  </form>

                  <div className="flex items-center gap-2 py-1.5">
                    <div className="h-px bg-slate-800/80 grow"></div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase">OR BOOK TECHNICAL HOUR</span>
                    <div className="h-px bg-slate-800/80 grow"></div>
                  </div>

                  {/* Consultation Booking form */}
                  <form onSubmit={handleConsultationSubmit} className="space-y-3">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block font-bold border-b border-slate-800 pb-1">OPTION B: BOOK DIRECT CYBER TELEPHONE SLOT</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Your Contact Name</label>
                        <input
                          type="text"
                          required
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Direct Email</label>
                        <input
                          type="email"
                          required
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Telephone Identifier</label>
                        <input
                          type="text"
                          required
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Booking Schedule Date</label>
                        <input
                          type="date"
                          required
                          value={bookingForm.preferredDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-sans text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Book Diagnostic Consultation</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-10 space-y-3 font-mono text-xs">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <strong className="text-white text-sm font-display uppercase tracking-wider block">Security Token Session Created</strong>
                  <p className="text-slate-400 font-sans max-w-xs mx-auto leading-relaxed">
                    Lead submitted successfully into simulated program state memory. Read results under the 'Admin Panel' (Passcode: <code className="text-amber-400 font-bold">ADMIN123</code>).
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
