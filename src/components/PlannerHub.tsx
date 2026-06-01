/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Terminal, FileCode, CheckCircle, Info, Landmark, HelpCircle, Flame, Layers } from "lucide-react";
import { WEBSITE_PLANNER_MARKDOWN } from "../data";

export default function PlannerHub() {
  const [activeSegment, setActiveSegment] = useState<"sitemap" | "design" | "keywords" | "standards">("sitemap");

  return (
    <div className="bg-[#070b13] border border-blue-500/20 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.1)] font-sans" id="planner-hub">
      {/* Terminal Title Bar */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block pointer-events-none"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block pointer-events-none"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block pointer-events-none"></span>
          </div>
          <span className="font-mono text-xs text-indigo-400 font-bold ml-1.5 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>sys_architect_planner.sh --interactive</span>
          </span>
        </div>
        <span className="font-mono text-[9px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          REPORT STACK: ACTIVE
        </span>
      </div>

      {/* Segment Navigation */}
      <div className="flex flex-wrap border-b border-slate-800/50 bg-slate-950/40">
        {[
          { label: "Website Sitemap", id: "sitemap" },
          { label: "UI/UX & Branding Guidelines", id: "design" },
          { label: "SEO Keyword Matrix", id: "keywords" },
          { label: "Technical Best Practices", id: "standards" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSegment(tab.id as any)}
            className={`px-4 sm:px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider border-r border-slate-800/85 transition ${
              activeSegment === tab.id
                ? "bg-slate-900 border-b-2 border-b-indigo-500 text-indigo-400"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Document Panel View */}
      <div className="p-6 sm:p-8 text-sm text-slate-300 leading-relaxed overflow-y-auto max-h-[500px]">
        {activeSegment === "sitemap" && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-lg flex gap-3">
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">
                Below is the comprehensive, organic structural blueprint designed to maximize business conversions and outline secure operator paths throughout our corporate application framework.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-bold text-lg text-white border-b border-slate-800/60 pb-2">Website Sitemap Hierarchy</h4>
              
              <div className="grid gap-4 font-sans text-sm">
                {[
                  { page: "1. Home Panel", desc: "Hero presentation, certified trust seals, interactive vulnerability calculator tool, brief services overview, security processes timeline, and FAQ listings." },
                  { page: "2. About Us", desc: "Executive vision statement, Certified Threat-Hunt expertise profile grids, and Aegis corporate chronology." },
                  { page: "3. Services Directory", desc: "Comprehensive collection of all 15 services with instant categorized filtering tags (Assessment, Deflective, Compliance)." },
                  { page: "4. Service Detail overlays", desc: "Tailored dashboards mapping technical problems, diagnostic tools catalogs, and deliverables summaries for our major offerings." },
                  { page: "5. Industries Index", desc: "Sector-specific risk lists matching finance, healthcare, startups, and government systems with compliance frameworks." },
                  { page: "6. Case Studies", desc: "Step-by-step challenges, structural solutions, and objective metric trackers for secured operations (such as Credential-Stuffing botnet wipes)." },
                  { page: "7. Cyber Intelligence Blog", desc: "Technical guides outlining ransomware mitigation actions, cloud IAM wildcards, and audit preparation techniques." },
                  { page: "8. Admin Control Center", desc: "Password-protected operator console mock-monitoring live leads entries, audit submissions, and subscriptions lists." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-[#0f1422] border border-slate-800/80 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-indigo-400">
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="font-semibold text-white tracking-wide font-display">{item.page}</h5>
                      <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSegment === "design" && (
          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg text-white border-b border-slate-800/60 pb-2">Aegis Brand System & Design Standards</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
                <h5 className="font-semibold text-white font-display mb-2">Selected Color Palette</h5>
                <ul className="space-y-2 text-xs font-mono">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#090d16] border border-slate-700"></span>
                    <span>Primary Obsidian: #090d16 (Deep interface atmosphere)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#111827] border border-slate-700"></span>
                    <span>Secondary Navy: #111827 (Clean card backings)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#3b82f6] border border-slate-700"></span>
                    <span>Action Electric Blue: #3b82f6 (Primary focus controls)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#10b981] border border-slate-700"></span>
                    <span>Cyber Lime Green: #10b981 (Verified safelists / statuses)</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
                <h5 className="font-semibold text-white font-display mb-2">Typography Pairings</h5>
                <ul className="space-y-2 text-xs">
                  <li>
                    <strong className="text-white font-display block">Heading Display: Space Grotesk</strong>
                    <span className="text-slate-400">Offers modern technical authority to titles and service banners.</span>
                  </li>
                  <li className="mt-2">
                    <strong className="text-white block">Paragraph Body: Inter</strong>
                    <span className="text-slate-400">Maintains peak high-density readability across lists, blogs, and menus.</span>
                  </li>
                  <li className="mt-2">
                    <strong className="text-slate-300 font-mono block">Data Tags: JetBrains Mono</strong>
                    <span className="text-slate-400">Imparts cyber-ops flavor to statistics, timestamps, and parameters.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-[#0f1422] border border-slate-800 rounded-lg space-y-2 text-xs text-slate-400">
              <strong className="text-white font-display block text-sm">UI/UX Micro-Interactions Blueprint</strong>
              <p>1. Hover scales applied on corporate service cards to indicate deeper detailed overlays availability.</p>
              <p>2. Active glowing color boundaries utilized to frame critical secure data containers (such as Risk scores or verification statuses).</p>
              <p>3. Dynamic gauge tracking on the calculator immediately renders risk thresholds based on answers, encouraging direct user conversion clicks.</p>
            </div>
          </div>
        )}

        {activeSegment === "keywords" && (
          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg text-white border-b border-slate-800/60 pb-2">SEO Strategy & Targeted Search Terms</h4>
            
            <p className="text-xs text-slate-400">
              To drive high-converting organic enterprise leads, our copywriting targets three core search intent tiers, maximizing local and industrial authority search ranks.
            </p>

            <div className="space-y-4 font-sans text-sm">
              {[
                { category: "1. Transactional Service Terms (Immediate Sales intent)", searchTerms: ["Penetration testing services for SaaS", "Compliance consulting SOC 2 readiness", "Enterprise vulnerability assessment", "Cloud infrastructure security audits"] },
                { category: "2. Sector Compliance Terms (Value-led industry intent)", searchTerms: ["HIPAA data encryption standards healthcare", "PCI-DSS compliance testing banking", "Startups cloud IAM safety checklist", "OT network microsegmentation manufacturing"] },
                { category: "3. Action-based Informational Searches", searchTerms: ["How to stop lateral threat ransomware movement", "Web application OWASP Top 10 exploits patch guides", "Automated CSPM configurations AWS"] }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-[#0f1422] border border-slate-800 rounded-lg space-y-2">
                  <h5 className="font-semibold text-white tracking-wide font-display">{item.category}</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {item.searchTerms.map((term, i) => (
                      <span key={i} className="px-2 py-1 rounded text-xs font-mono text-zinc-300 bg-slate-900 border border-slate-800">
                        "{term}"
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSegment === "standards" && (
          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg text-white border-b border-slate-800/60 pb-2">Corporate Security Protocols & Coding Standards</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-2">
                <strong className="text-emerald-400 uppercase tracking-widest block mb-2">Web Application Controls</strong>
                <p>● <span className="text-white">XSS Defense</span>: Sanitizing all user contact entries and checklists domain forms before state insertion, blocking script injection.</p>
                <p>● <span className="text-white">CSRF Mitigations</span>: Enforcing strictly segregated state-based tokens on form submissions, mocking API security protocols.</p>
                <p>● <span className="text-white">Multi-tenant Isolation</span>: Separating customer data arrays in local stores using distinct, verified session handles.</p>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-2">
                <strong className="text-emerald-400 uppercase tracking-widest block mb-2">Server Operational Protection</strong>
                <p>● <span className="text-white">HTTPS/SSL Core</span>: Deployments restricted strictly to SSL-encrypted edge tunnels, protecting data in transit.</p>
                <p>● <span className="text-white">Defensive Headers</span>: Recommendations implemented for Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), and Frame-Options.</p>
                <p>● <span className="text-white">Operator Access</span>: Admin dashboards hard-locked requiring valid credential keys, tracking active sessions precisely.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic CTA at bottom of planner */}
      <div className="bg-slate-950 p-4 border-t border-slate-800/80 text-center">
        <p className="text-xs font-mono text-indigo-400">
          This system blueprint matches all 13 required RFP sections exactly.
        </p>
      </div>
    </div>
  );
}
