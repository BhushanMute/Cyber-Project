/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Download, CheckSquare, Square, Shield, Terminal, ArrowRight, ClipboardCheck } from "lucide-react";

interface ChecklistItem {
  id: string;
  task: string;
  priority: "High" | "Medium" | "Low";
  purpose: string;
}

const INDUSTRY_CHECKLISTS: Record<string, ChecklistItem[]> = {
  SaaS: [
    { id: "saas-1", task: "Enforce multi-factor authentication (MFA) across all identity and console databases.", priority: "High", purpose: "Neutralizes 99% of basic credential-theft entry routes." },
    { id: "saas-2", task: "Conduct annual grey-box API safety testing targeting Broken Object Level Auth (BOLA).", priority: "High", purpose: "Stops tenant cross-talk or unauthorized user database query exposure." },
    { id: "saas-3", task: "Establish a secure SDLC pipeline with automated code scans (SAST/DAST).", priority: "Medium", purpose: "Flags vulnerabilities inside local modules before deployment to production." },
    { id: "saas-4", task: "Review and restrict IAM access boundaries, prioritizing third-party integration tokens.", priority: "Medium", purpose: "Prevents secondary integration leaks from compromising core services." },
    { id: "saas-5", task: "Set up real-time server crash and request spikes telemetry monitors.", priority: "Low", purpose: "Captures rapid API crawling attempts or DDoS botnets." }
  ],
  Healthcare: [
    { id: "health-1", task: "Enforce strict AES-256 encryption on all stored patient health data databases.", priority: "High", purpose: "Blocks rogue data readers from parsing tables if systems are compromised." },
    { id: "health-2", task: "Segment medical equipment (IoT/ICS devices) within separate local VLAN perimeters.", priority: "High", purpose: "Stops lateral ransomware attacks from disabling patient heart nodes." },
    { id: "health-3", task: "Conduct HIPAA and regulatory privacy audits on every patient communication point.", priority: "Medium", purpose: "Maintains regulatory compliance, neutralizing costly medical fines." },
    { id: "health-4", task: "Deploy automated endpoint detection (EDR) agents to physical diagnostic consoles.", priority: "Medium", purpose: "Isolates hijacked devices instantly before ransomware spreads." },
    { id: "health-5", task: "Formulate an incident recovery plan with immutable write-once patient file backups.", priority: "High", purpose: "Ensures quick patient operations recovery without paying ransom." }
  ],
  Finance: [
    { id: "fin-1", task: "Perform monthly penetration tests targeting transaction-ledger databases.", priority: "High", purpose: "Identifies query injections and double-spending vulnerabilities." },
    { id: "fin-2", task: "Lock down administrative console permissions using biometric-based TOTP keys.", priority: "High", purpose: "Stops compromised administrator credentials from triggering funds withdrawals." },
    { id: "fin-3", task: "Establish automatic rate limiting and fraud-detection layers on API pathways.", priority: "Medium", purpose: "Blocks carders, credential stuffers, and rapid token crawlers." },
    { id: "fin-4", task: "Implement strict IP whitelisting for backend administration portals.", priority: "Medium", purpose: "Restricts access strictly to recognized company headquarters nodes." },
    { id: "fin-5", task: "Acquire CreST-certified cyber liability protection and compliance certificates.", priority: "Low", purpose: "Mitigates financial impact if secondary breach occurrences hit networks." }
  ],
  Generic: [
    { id: "gen-1", task: "Enforce strong individual passwords (16+ chars) and deploy corporate password lockers.", priority: "High", purpose: "Stops basic dictionary attacks targeting employee email portals." },
    { id: "gen-2", task: "Run monthly automated external vulnerability network perimeter scans.", priority: "High", purpose: "Flags unpatched public router exposures or legacy configurations." },
    { id: "gen-3", task: "Implement quarterly simulated phishing emails and secure user awareness lessons.", priority: "Medium", purpose: "Converts workers into active firewalls, flagging email exploits." },
    { id: "gen-4", task: "Store database and configuration files in separate remote vaults.", priority: "Medium", purpose: "Mitigates total physical cluster wiping risks during datacenter compromises." },
    { id: "gen-5", task: "Establish a clear incident response reporting process with direct escalation routes.", priority: "Low", purpose: "Ensures rapid coordination if anomalies or logs trigger warnings." }
  ]
};

export default function ChecklistGenerator() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("SaaS");
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const activeChecklist = INDUSTRY_CHECKLISTS[selectedIndustry] || INDUSTRY_CHECKLISTS.Generic;

  const handleToggleItem = (itemId: string) => {
    if (completedItems.includes(itemId)) {
      setCompletedItems(completedItems.filter(id => id !== itemId));
    } else {
      setCompletedItems([...completedItems, itemId]);
    }
  };

  const handleDownload = () => {
    let text = `======================================================\n`;
    text += `AEGIS CYBERSECURITY - CUSTOM BUSINESS SAFETY CHECKLIST\n`;
    text += `Target Sector Profile: ${selectedIndustry}\n`;
    text += `Generated Date: ${new Date().toISOString().substring(0, 10)}\n`;
    text += `======================================================\n\n`;
    text += `Completion Level: ${completedItems.length} of ${activeChecklist.length} Safeguard systems active.\n\n`;
    text += `------------------------------------------------------\n`;
    text += `TAILORED CYBER SAFEGUARDS CATALOG:\n`;
    text += `------------------------------------------------------\n\n`;

    activeChecklist.forEach((item, index) => {
      const isDone = completedItems.includes(item.id);
      text += `${index + 1}. [${isDone ? "ACTIVE SHIELD" : "PENDING AUDIT"}] - Priority: ${item.priority}\n`;
      text += `   >> Task: ${item.task}\n`;
      text += `   >> Purpose: ${item.purpose}\n\n`;
    });

    text += `------------------------------------------------------\n`;
    text += `RECOMMENDED SECURITY PHASING:\n`;
    text += `------------------------------------------------------\n`;
    text += `1. Work from 'High Priority' targets down to baseline assets.\n`;
    text += `2. Test your system integrity with an authorized manual vulnerability penetration test.\n`;
    text += `3. Schedule an active Threat Defense consultation at: ops@aegis-defense.com.\n`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Aegis_CyberShield_Checklist_${selectedIndustry}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-6 sm:p-8 relative" id="checklist-builder">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">Custom Threat Checklist</h3>
            <p className="text-xs text-slate-400">Generate and download tailored defense protocols for your business model</p>
          </div>
        </div>

        {/* Industry Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {Object.keys(INDUSTRY_CHECKLISTS).map((ind) => (
            <button
              key={ind}
              onClick={() => {
                setSelectedIndustry(ind);
                setCompletedItems([]);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs font-semibold uppercase tracking-wider transition ${
                selectedIndustry === ind
                  ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Main Checklist View */}
      <div className="space-y-4 mb-6">
        {activeChecklist.map((item) => {
          const isDone = completedItems.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => handleToggleItem(item.id)}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                isDone
                  ? "bg-slate-900/60 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.02)]"
                  : "bg-[#111625] border-slate-800 hover:border-slate-700 hover:bg-[#131b31]"
              }`}
            >
              <button
                className="pt-0.5 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleItem(item.id);
                }}
              >
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500 hover:text-slate-400" />
                )}
              </button>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-mono font-semibold uppercase px-2 py-0.5 rounded border ${
                    item.priority === "High"
                      ? "text-red-400 bg-red-500/10 border-red-500/20"
                      : item.priority === "Medium"
                      ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                      : "text-blue-400 bg-blue-500/10 border-blue-500/20"
                  }`}>
                    {item.priority} Priority
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">SAFEGUARD ID: {item.id.toUpperCase()}</span>
                </div>
                <p className={`text-sm font-sans font-medium leading-relaxed leading-snug transition-colors ${isDone ? "text-slate-400 line-through" : "text-white"}`}>
                  {item.task}
                </p>
                <p className="text-xs text-slate-400 font-mono italic">
                  🛡️ Core Purpose: {item.purpose}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800">
        <div className="text-left font-sans text-xs text-slate-400">
          Completed <span className="text-indigo-400 font-bold font-mono text-sm">{completedItems.length}</span> of <span className="text-white font-bold font-mono">{activeChecklist.length}</span> security tasks
        </div>
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-sans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
        >
          <Download className="w-4 h-4" />
          <span>Export Tailored TXT Checklist</span>
        </button>
      </div>
    </div>
  );
}
