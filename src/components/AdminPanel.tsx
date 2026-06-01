/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Terminal, Lock, Key, ShieldCheck, Database, Calendar, Mail, FileText, AlertTriangle, User, RefreshCw, Eye, Sparkles } from "lucide-react";
import { ContactRequest, SecurityAuditRequest, ConsultationBooking } from "../types";

interface AdminPanelProps {
  contacts: ContactRequest[];
  audits: SecurityAuditRequest[];
  bookings: ConsultationBooking[];
  subscribes: string[];
  onClearLogs: () => void;
}

export default function AdminPanel({
  contacts,
  audits,
  bookings,
  subscribes,
  onClearLogs
}: AdminPanelProps) {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [pastedKeyPrompt, setPastedKeyPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState<"contacts" | "audits" | "bookings" | "subscribes">("contacts");

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey.toUpperCase() === "ADMIN123") {
      setIsAdminUnlocked(true);
      setPastedKeyPrompt(false);
    } else {
      setPastedKeyPrompt(true);
      setTimeout(() => setPastedKeyPrompt(false), 3000);
    }
  };

  const getLogStats = () => {
    return {
      contactsCount: contacts.length,
      auditsCount: audits.length,
      bookingsCount: bookings.length,
      subscribesCount: subscribes.length
    };
  };

  const stats = getLogStats();

  if (!isAdminUnlocked) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-[#0b0f19] border border-slate-800 rounded-xl text-center shadow-2xl relative" id="admin-sec-login">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-amber-500 to-amber-300"></div>
        
        <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 mx-auto flex items-center justify-center mb-6">
          <Lock className="w-6 h-6 text-amber-400" />
        </div>

        <h3 className="font-display font-bold text-xl text-white">Security Command Administration</h3>
        <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
          Authorized personnel only. Please input your secure terminal key.
        </p>

        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 my-5 text-left font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2 mb-1.5 text-slate-300">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Developer Test Key Indicator:</span>
          </div>
          <span>Secure Pass-Key: <code className="text-amber-400 bg-amber-950/40 px-1 py-0.5 rounded font-bold">ADMIN123</code></span>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="relative">
            <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Input access key..."
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-3 pl-10 text-sm font-mono text-center text-white tracking-widest focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded font-sans text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-[0_0_15px_rgba(242,158,11,0.2)]"
          >
            Authenticate & Access Dashboard
          </button>
        </form>

        {pastedKeyPrompt && (
          <p className="text-xs text-red-400 font-mono italic mt-4 animate-pulse">
            ⚠️ Invalid credential key block detected. Access denied.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#0b0f19] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-sans" id="admin-sec-panel">
      {/* Top bar */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Database className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-display font-medium text-white flex items-center gap-2">
              <span>Security Leads Terminal Command Center</span>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20">
                Authorized Session
              </span>
            </h3>
            <p className="text-xs text-slate-400">Monitoring mock-persisted live submission endpoints in runtime state</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onClearLogs}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded hover:border-slate-700 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear Lead Datastores</span>
          </button>
          
          <button
            onClick={() => setIsAdminUnlocked(false)}
            className="text-xs text-amber-400 hover:text-amber-300 hover:underline cursor-pointer"
          >
            Lock Session
          </button>
        </div>
      </div>

      {/* Metrics grid row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-slate-800/60 bg-slate-950/40">
        {[
          { label: "Contact Requests", val: stats.contactsCount, activeId: "contacts", color: "text-blue-400 bg-blue-500/5 border-blue-500/10" },
          { label: "Free Security Audits", val: stats.auditsCount, activeId: "audits", color: "text-indigo-400 bg-indigo-500/5 border-indigo-500/10" },
          { label: "Consultation Bookings", val: stats.bookingsCount, activeId: "bookings", color: "text-teal-400 bg-teal-500/5 border-teal-500/10" },
          { label: "Newsletter Signs", val: stats.subscribesCount, activeId: "subscribes", color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" }
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border transition cursor-pointer flex flex-col gap-1 ${
              activeTab === item.activeId
                ? "bg-slate-900/90 border-slate-700 shadow-md ring-1 ring-slate-800"
                : "bg-[#0f1422] border-slate-900/60 hover:bg-[#121a2c]"
            }`}
            onClick={() => setActiveTab(item.activeId as any)}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">{item.label}</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-2xl font-mono font-bold text-white">{item.val}</span>
              <span className={`w-2 h-2 rounded-full ${item.val > 0 ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Tab content space */}
      <div className="p-6 h-[400px] overflow-y-auto" id="admin-lead-lists">
        {activeTab === "contacts" && (
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-semibold uppercase text-slate-400">Contact Form Submissions</h4>
            
            {contacts.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm font-mono italic">
                -- No contact submissions recorded in dynamic state. Fill the form on Contact Page to populate payload --
              </div>
            ) : (
              <div className="grid gap-3.5">
                {contacts.map((c, i) => (
                  <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-2">
                      <div className="flex items-center gap-2 text-sm text-white font-medium">
                        <User className="w-4 h-4 text-blue-400" />
                        <span>{c.name}</span>
                        <span className="text-slate-500 font-normal">({c.companyName})</span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{c.timestamp}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                      <p><span className="text-slate-500">Email:</span> {c.email}</p>
                      <p><span className="text-slate-500">Phone:</span> {c.phone}</p>
                      <p className="sm:col-span-2"><span className="text-slate-500">Required Service:</span> <span className="text-blue-400 font-mono font-semibold">{c.serviceRequired}</span></p>
                    </div>
                    <p className="text-sm text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800/40 italic">
                      "{c.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "audits" && (
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-semibold uppercase text-slate-400">Free Audit Nominations</h4>
            
            {audits.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm font-mono italic">
                -- No audit requests recorded. Request an audit in Home, Services or Footer to populate --
              </div>
            ) : (
              <div className="grid gap-3.5">
                {audits.map((a, i) => (
                  <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-2">
                      <div className="flex items-center gap-1.5 text-sm font-mono text-emerald-400 font-semibold">
                        <Database className="w-4 h-4" />
                        <span>Domain: {a.companyDomain}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{a.timestamp}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
                      <p><span className="text-slate-500">Contact Email:</span> {a.contactEmail}</p>
                      <p><span className="text-slate-500">Internal Team Size:</span> {a.teamSize} employees</p>
                      <p><span className="text-slate-500">Host Environment:</span> <span className="text-indigo-400 font-semibold font-mono">{a.hostingEnvironment}</span></p>
                      <div className="sm:col-span-2 space-y-1">
                        <span className="text-slate-500">Target Compliancies Mapped:</span>
                        <div className="flex flex-wrap gap-1">
                          {a.complianceNeeds.map((need, index) => (
                            <span key={index} className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">{need}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-semibold uppercase text-slate-400">Consultation Booking Logs</h4>
            
            {bookings.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm font-mono italic">
                -- No consultation meetings scheduled. Book a slot from Home, Header or Footer to populate slots --
              </div>
            ) : (
              <div className="grid gap-3.5">
                {bookings.map((b, i) => (
                  <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-2">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-white">
                        <Calendar className="w-4 h-4 text-teal-400" />
                        <span>Slot Booked: {b.preferredDate} @ {b.preferredTimeSlot}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{b.timestamp}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                      <p><span className="text-slate-500">Lead Operator:</span> {b.name}</p>
                      <p><span className="text-slate-500">Direct Email:</span> {b.email}</p>
                      <p><span className="text-slate-500">Phone Identifier:</span> {b.phone}</p>
                      <p><span className="text-slate-500">Target Cyber Subject:</span> <span className="text-teal-400 font-mono font-semibold">{b.consultationTopic}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "subscribes" && (
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-semibold uppercase text-slate-400">Email Bulletin Members</h4>
            
            {subscribes.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm font-mono italic">
                -- No subscriber emails saved. Subscribe to the email list on the home/footer page --
              </div>
            ) : (
              <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left font-mono text-xs text-slate-400">
                  <thead className="bg-[#0f1422] border-b border-slate-800 text-white font-sans uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Subscriber Address</th>
                      <th className="p-3 text-right">Verification Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900">
                    {subscribes.map((emailStr, i) => (
                      <tr key={i} className="hover:bg-slate-900/40">
                        <td className="p-3 font-medium text-slate-300 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{emailStr}</span>
                        </td>
                        <td className="p-3 text-right text-[10px] text-emerald-400 font-bold tracking-widest uppercase">
                          ● SAFE_LIST
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
