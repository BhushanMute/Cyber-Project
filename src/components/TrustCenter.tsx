/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Shield, CheckCircle, Lock, Download, Key, Search, FileText, 
  HelpCircle, AlertCircle, Building2, Landmark, Activity, ShoppingBag, 
  ChevronRight, RefreshCw, Eye, ExternalLink, ShieldCheck, FileCheck
} from "lucide-react";

interface TrustCenterProps {
  onOpenConsultationModal: () => void;
}

export default function TrustCenter({ onOpenConsultationModal }: TrustCenterProps) {
  // 1. Selector of Target Industry Security Concerns State
  const [selectedIndustry, setSelectedIndustry] = useState<string>("banking");

  // 2. Interactive Credential Verifier Registry State
  const [certQuery, setCertQuery] = useState<string>("OSCP-Elena");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<any>({
    verified: true,
    name: "Elena Vance",
    badge: "OSCP-22-90184",
    status: "ACTIVE / VERIFIED",
    issuedBy: "Offensive Security (OffSec)",
    expiry: "Lifetime Certification",
    hash: "sha256-4b2a88ef11...0ff3a"
  });

  const sampleCertificates = [
    { id: "OSCP-Elena", label: "OSCP-22-90184 (Elena Vance)" },
    { id: "CISSP-Sarah", label: "CISSP-559381 (Sarah Sterling)" },
    { id: "CCSP-Marcus", label: "CCSP-883012 (Marcus Vance)" },
    { id: "CREST-Aegis", label: "CREST-INF-3019 (Aegis Security Corporation)" }
  ];

  const handleVerifyCredential = (certId: string) => {
    setIsVerifying(true);
    setCertQuery(certId);
    
    setTimeout(() => {
      setIsVerifying(false);
      if (certId === "OSCP-Elena") {
        setVerificationResult({
          verified: true,
          name: "Elena Vance",
          badge: "OSCP-22-90184 (Offensive Security Certified Professional)",
          status: "ACTIVE / VERIFIED",
          issuedBy: "Offensive Security",
          expiry: "Lifetime",
          hash: "aeb4411fb239c099e28e93010b10be2831dc30c0420b79eef0dbadbf332c9431"
        });
      } else if (certId === "CISSP-Sarah") {
        setVerificationResult({
          verified: true,
          name: "Sarah Sterling",
          badge: "CISSP-559381 (Certified Information Systems Security Professional)",
          status: "ACTIVE / VERIFIED",
          issuedBy: "ISC2 (International Information System Security Certification Consortium)",
          expiry: "Valid through June 2028",
          hash: "cf30e2f89311a68bd8b31ac9bc3da0eef71dbfdba430f818b28cfedfbc68fa30"
        });
      } else if (certId === "CCSP-Marcus") {
        setVerificationResult({
          verified: true,
          name: "Marcus Vance",
          badge: "CCSP-883012 (Certified Cloud Security Professional)",
          status: "ACTIVE / VERIFIED",
          issuedBy: "ISC2 (International Information System Security Certification Consortium)",
          expiry: "Valid through October 2027",
          hash: "df83bc9eaf1938ac8d3810bef28dcf93ba0ec3dedfa3829bebf39217beef83a1"
        });
      } else if (certId === "CREST-Aegis") {
        setVerificationResult({
          verified: true,
          name: "Aegis CyberSecurity Corp",
          badge: "CREST-INF-3019 (Penetration Testing Discipline Accreditation)",
          status: "ACTIVE / ACCREDITED",
          issuedBy: "CREST International Regulatory Council",
          expiry: "Annual Audit on September 2026",
          hash: "93af7c9b0e2dcfbcbe3d10abdfc82fa0ff30dcefae38e8ecfba3ebee8fa300ec"
        });
      } else {
        setVerificationResult({
          verified: false,
          name: "Unknown / Unregistered",
          badge: certId,
          status: "NOT FOUND IN REGISTRY",
          issuedBy: "N/A",
          expiry: "N/A",
          hash: "N/A"
        });
      }
    }, 750);
  };

  // 3. Document Download Simulation State
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [downloadSuccesses, setDownloadSuccesses] = useState<string[]>([]);
  const [ndaForm, setNdaForm] = useState({ companyName: "", contactEmail: "", sector: "Banking" });
  const [ndaRequestSubmitted, setNdaRequestSubmitted] = useState<boolean>(false);

  const handleDownloadDoc = (docId: string, docName: string) => {
    setDownloadingDoc(docId);
    setTimeout(() => {
      setDownloadingDoc(null);
      setDownloadSuccesses([...downloadSuccesses, docId]);
      
      // Simulate typical client-side PDF file download
      const element = document.createElement("a");
      const file = new Blob([
        `--- AEGIS CYBERSECURITY RECON TRUST DOCUMENT ---\n\nTitle: ${docName}\nClassification: COMMERCIAL IN CONFIDENCE\nVerification Hash: sha256-${Math.random().toString(36).substring(2, 12)}... \n\nThis certifies that Aegis meets standard institutional security obligations. Please contact legal@aegis-defense.com to execute a full custom NDA.`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${docId.replace(/\s+/g, "_").toLowerCase()}_aegis_compliance_brief.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  const handleNdaRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setNdaRequestSubmitted(true);
    setTimeout(() => {
      setNdaRequestSubmitted(false);
      setNdaForm({ companyName: "", contactEmail: "", sector: "Banking" });
    }, 5000);
  };

  // 4. Industry details
  const industriesTrust = [
    {
      id: "banking",
      title: "Fintech, Banking & High-Value Ledger Systems",
      icon: <Landmark className="w-5 h-5 text-blue-400" />,
      compliance: "PCI-DSS Tier 1, SWIFT CSP Framework, GLBA Requirements, SOX",
      description: "Financial core systems require absolute operational availability, non-repudiation logging, and strict isolation layers. We run zero-downtime ledger pentesting with certified white-hat bankers.",
      safeguards: [
        "Core Banking API Payload Simulation (testing transactional parameter tampering)",
        "SWIFT Infrastructure Boundary Audits (verifying air-gapped SWIFT networks)",
        "Triple-Encrypted Report Delivery (using PGP/GPG keys to maintain absolute data safety)",
        "Zero-Downtime Manual Retesting (carefully timed during off-peak ledger clearance hours)"
      ]
    },
    {
      id: "healthcare",
      title: "Healthcare, Medical Devices & Electronic Health Records (EHR)",
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      compliance: "HIPAA Security Rule, HITECH Act, EU GDPR Patient Privacy",
      description: "With medical ransomware locking physical wings, hospitals are critical targets. We audit connected medical IoT controllers, Patient Portal APIs, and EHR interfaces securely.",
      safeguards: [
        "Patient Identity Access Isolation Validation (verifying cross-tenant HIPAA barriers)",
        "Medical IoT Device Threat Auditing (testing device communication vulnerabilities)",
        "Ransomware Blast-Radius Calculations (identifying weak Active Directory nodes)",
        "Emergency Escalation Hot-wiring (under 15 minutes alert response guarantee)"
      ]
    },
    {
      id: "saas-enterprise",
      title: "SaaS Platforms, Cloud Infrastructure & IT Enterprises",
      icon: <Building2 className="w-5 h-5 text-indigo-400" />,
      compliance: "SOC 2 Type II controls, ISO 27001 ISMS standard, FedRAMP alignment",
      description: "Cloud-native SaaS applications face rapid continuous deployment risk. We provide CI/CD pipeline audits, Cloud Security Posture Management (CSPM), and IAM least-privilege enforcement.",
      safeguards: [
        "Continuous Dev-stage Code Integration Scans (SAST/DAST automation mapping)",
        "AWS, Azure, and GCP IAM Configuration Audits (eliminating wildcard key paths)",
        "Multi-Tenant Logical Leak Tests (validating that SaaS databases are fully isolated)",
        "Signed Attestation Certificate (acceptable directly for enterprise client vendor reviews)"
      ]
    },
    {
      id: "ecommerce",
      title: "Enterprise E-Commerce & Payment Gateways",
      icon: <ShoppingBag className="w-5 h-5 text-purple-400" />,
      compliance: "PCI-DSS Tier 1 Compliance, CCPA, CCPA/GDPR personal records privacy",
      description: "Carding bots, checkout manipulation, and client-side credit card skimming (Magecart) destroy online retail trust. We test checkout flows, APIs, and rate limits.",
      safeguards: [
        "Checkout Flow Logic Manipulations (testing cart-price hijacking attempts)",
        "API Abuse Rate Limit Boundary Testing (blocking automated bulk transaction abuse)",
        "Client-Side Script & Vendor Auditing (neutralizing hidden malicious script scripts)",
        "Database Isolation Assessments (guaranteeing stored customer cards are safe)"
      ]
    }
  ];

  const activeIndustry = industriesTrust.find(ind => ind.id === selectedIndustry) || industriesTrust[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in" id="trust-hub-page">
      
      {/* Intro Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase rounded">
          <ShieldCheck className="w-3.5 h-3.5" /> SECURE INSTITUTIONAL COMPLIANCE CENTRAL
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white">
          Why Banks and Enterprises <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Trust Aegis Security</span>
        </h1>
        <p className="text-[#a0aec0] text-sm sm:text-base leading-relaxed">
          We combine internationally accredited cybersecurity methodologies, certified top-tier threat engineers, and a formal $5M liability insurance backing to deliver risk assurance you can verify at any time.
        </p>
      </div>

      {/* CORE CREDENTIALS & TRUST CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="trust-assurances-grid">
        {[
          {
            title: "CREST Registered Penetration Testing",
            desc: "Accredited under strict independent regulatory criteria. Aegis methodologies are audited and certified for international banking assessments.",
            badge: "REG-INF-3019",
            icon: <Shield className="w-6 h-6 text-blue-400" />
          },
          {
            title: "Certified OSCP/CISSP Personnel Only",
            desc: "We DO NOT use junior interns or generic scanner-scripts. Every assessor on your project holds valid Offensive Security Certified Professional (OSCP) status.",
            badge: "100% CERTIFIED EXTRAS",
            icon: <Key className="w-6 h-6 text-emerald-400" />
          },
          {
            title: "$5,000,000 Liability Insurance",
            desc: "Full comprehensive cybersecurity liability, professional indemnity, and technology errors & omissions insurance covering multi-site enterprise environments.",
            badge: "ACTIVE BINDING POLICY",
            icon: <FileText className="w-6 h-6 text-indigo-400" />
          },
          {
            title: "Strict Zero-Data Leak Policy",
            desc: "No customer data is ever stored outside offline-first secured vaults. After we audit, all telemetry payloads are securely deleted via DoD standards.",
            badge: "AES-256 ENCRYPTED",
            icon: <Lock className="w-6 h-6 text-purple-400" />
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl hover:border-slate-700/80 transition relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition"></div>
            <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-widest font-black mb-1">
              STATUS: {item.badge}
            </span>
            <h3 className="font-display font-bold text-white text-sm tracking-wide">{item.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-2">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CORE BANKING & SECTOR TRUST DETAILS SECTION */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl" id="sector-safety-matrix">
        {/* Left Interactive Nav List */}
        <div className="lg:col-span-4 bg-slate-950/80 border-b lg:border-b-0 lg:border-r border-slate-800/80 p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-blue-400 tracking-wider uppercase block">INDUSTRY SPECIALIZATIONS</span>
            <strong className="text-sm font-display text-white tracking-tight uppercase block">Select Enterprise Sector:</strong>
          </div>
          
          <div className="flex flex-col gap-2.5 pt-2">
            {industriesTrust.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`w-full text-left p-3.5 rounded-lg border text-xs font-mono font-medium transition cursor-pointer flex items-center gap-3 ${
                  selectedIndustry === ind.id
                    ? "bg-blue-600/15 border-blue-500 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.1)]"
                    : "bg-[#090d16] border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <div className="shrink-0">{ind.icon}</div>
                <div className="text-left">
                  <span className="block text-xs font-semibold font-display tracking-wide">{ind.title.split(",")[0]}</span>
                  <span className="text-[9px] text-slate-400 font-mono tracking-wider block mt-px uppercase">Standard: {ind.compliance.split(",")[0]}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-900 leading-relaxed text-[11px] text-slate-500 italic block">
            * All assessments are backed by customized pre-audit scope agreements ensuring safe simulation environments.
          </div>
        </div>

        {/* Right Active Scope Info */}
        <div className="lg:col-span-8 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 pb-3">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> SEC-OPS CERTIFIED ASSESSMENT MATRIX
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800/60">
                FRAMEWORK: {activeIndustry.compliance}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
              {activeIndustry.title}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {activeIndustry.description}
            </p>

            <div className="space-y-3.5 pt-2">
              <strong className="text-[10px] font-mono text-blue-400 uppercase tracking-wider block">Explicit Banking & Audit Safeguards We Guarantee:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeIndustry.safeguards.map((safeguard, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 border border-slate-900 rounded-lg space-y-1 hover:border-blue-500/20 transition">
                    <span className="text-[9px] font-mono text-emerald-400 font-bold block uppercase tracking-wide">✓ METHOD {idx+1}</span>
                    <p className="text-xs font-sans text-slate-300 leading-relaxed font-medium">
                      {safeguard}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
            <div className="text-xs font-sans text-slate-400">
              Need a custom PCI-DSS / SWIFT compliance scope briefing document?
            </div>
            <button
              onClick={onOpenConsultationModal}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-sans text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 cursor-pointer self-start sm:self-auto"
            >
              Request Custom Compliance Audit Scope
            </button>
          </div>
        </div>
      </div>

      {/* LOWER INTERACTIVE TOOLS: CAPTCHA VERIFIER & VAULT DIRECT DOWNLOADS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INTERACTIVE COMPLIANCE CREDENTIAL VERIFIER HUB */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 block tracking-widest uppercase">CREST SECURE ENCRYPTED KEYWAY</span>
              <h3 className="text-lg font-display font-extrabold text-white">Live Personnel Credential Verification System</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enterprises and financial institutions can verify our active security certifications directly against independent corporate registries. Select an assessor ID key below:
              </p>
            </div>

            {/* Select Certificate Dropdown */}
            <div className="grid grid-cols-1 gap-2 pt-2">
              {sampleCertificates.map((cert) => (
                <button
                  key={cert.id}
                  onClick={() => handleVerifyCredential(cert.id)}
                  className={`px-3 py-2 text-left rounded font-mono text-xs border transition cursor-pointer ${
                    certQuery === cert.id
                      ? "bg-slate-900 border-emerald-500 text-emerald-400 font-bold"
                      : "bg-slate-900/50 border-slate-805 text-slate-400 hover:text-white"
                  }`}
                >
                  {certQuery === cert.id ? "● " : "○ "} {cert.label}
                </button>
              ))}
            </div>

            {/* Query Result Panel */}
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-3 relative overflow-hidden">
              {isVerifying ? (
                <div className="flex flex-col items-center justify-center py-6 gap-2 font-mono text-xs text-slate-400">
                  <RefreshCw className="w-5 h-5 animate-spin text-blue-400" />
                  <span>Connecting to Decentrialized Credential Ledger...</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-950 pb-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">CREDENTIAL REGISTRY LOG</span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                      verificationResult.verified ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-500"
                    }`}>
                      {verificationResult.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <span className="text-slate-500">Name:</span>
                    <span className="col-span-2 text-white font-medium">{verificationResult.name}</span>
                    
                    <span className="text-slate-500">Certificate:</span>
                    <span className="col-span-2 text-slate-300 font-sans text-[11px]">{verificationResult.badge}</span>
                    
                    <span className="text-slate-500">Authority:</span>
                    <span className="col-span-2 text-slate-400">{verificationResult.issuedBy}</span>
                    
                    <span className="text-slate-500">Expiration:</span>
                    <span className="col-span-2 text-slate-400">{verificationResult.expiry}</span>
                  </div>

                  {/* Security Verification Cryptographic Hash block */}
                  <div className="pt-2 border-t border-slate-950 text-[10px] font-mono text-slate-500 space-y-1">
                    <span className="block uppercase text-emerald-500 font-black">SHA-256 INTEGRITY ACCREDIT:</span>
                    <span className="bg-slate-950 px-2 py-1.5 rounded block text-slate-400 overflow-x-auto select-all uppercase">
                      {verificationResult.hash}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 italic block mt-1">
            * All certificates are verifiable directly against public ISC2, OffSec, and CREST validation registries using our corporate assessor keys.
          </div>
        </div>

        {/* NDA EXECUTION & SAMPLE PENETRATION REPORT DOWNLOADS VAULT */}
        <div className="lg:col-span-7 bg-[#0c1220] border border-slate-800 rounded-xl p-6 space-y-4">
          <span className="text-[10px] font-mono text-indigo-400 block tracking-widest uppercase">AEGIS DIRECT ASSURANCE VAULT</span>
          <h3 className="text-lg font-display font-extrabold text-white">Download Standard Trust Assurances Instantly</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Need to complete vendor due diligence or present our credentials to your bank's Board of Directors? Click below to download standardized compliance brief materials or request an instant, pre-signed Non-Disclosure Agreement (NDA) framework:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2" id="download-materials-actions">
            {[
              {
                id: "Aegis-NDA-2026",
                name: "Aegis Mutual Non-Disclosure Agreement (Pre-signed PDF Draft)",
                desc: "Standard 2-way corporate NDAs to begin penetration assessment design consultations immediately."
              },
              {
                id: "Sample-Pentest-2026",
                name: "Standard Neutralized Web API Pentest Report Case Brief",
                desc: "Sample technical assessment detailing real security findings with code corrections, fully sanitized."
              },
              {
                id: "Attestation-Aegis",
                name: "Aegis Corporation Operations Assessment Attestation",
                desc: "Official letter of operations confirming SOC 2 criteria compliance, CREST status, and liability insurances."
              },
              {
                id: "Methodology-Manual",
                name: "Bank-Grade Penetration Auditing Methodology Manual",
                desc: "Our detailed technical handbook mapping out scope timelines, VPN safety configs, and escalation procedures."
              }
            ].map((doc, idx) => {
              const isDownloaded = downloadSuccesses.includes(doc.id);
              const isDownloading = downloadingDoc === doc.id;
              
              return (
                <div key={idx} className="bg-slate-950 p-4 border border-slate-900 rounded-lg flex flex-col justify-between space-y-3 hover:border-slate-800 transition">
                  <div className="space-y-1">
                    <strong className="text-white font-display text-[12px] block leading-snug">{doc.name}</strong>
                    <p className="text-[#a0aec0] font-sans text-[11px] leading-relaxed">{doc.desc}</p>
                  </div>

                  <button
                    onClick={() => handleDownloadDoc(doc.id, doc.name)}
                    disabled={isDownloading}
                    className={`w-full py-2 rounded font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isDownloaded
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-[#090d16] hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                    }`}
                  >
                    {isDownloading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                        <span>Compiling PDF Brief...</span>
                      </>
                    ) : isDownloaded ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Download Completed (Txt)</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-blue-400" />
                        <span>Download Document</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Inline Quick NDA Request form */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 space-y-3">
            <strong className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">Request Standard Bilateral NDA Package Execution:</strong>
            
            {ndaRequestSubmitted ? (
              <div className="p-2 border border-emerald-500/20 bg-emerald-500/5 rounded text-xs font-mono text-emerald-400 animate-pulse flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>NDA package queued! A customized docu-sign framework was dispatched to your email address. Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleNdaRequest} className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Your Corporate / Bank Name"
                  required
                  value={ndaForm.companyName}
                  onChange={(e) => setNdaForm({ ...ndaForm, companyName: e.target.value })}
                  className="bg-[#0c1220] border border-slate-800 rounded px-2.5 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Officer@bank-company.com"
                  required
                  value={ndaForm.contactEmail}
                  onChange={(e) => setNdaForm({ ...ndaForm, contactEmail: e.target.value })}
                  className="bg-[#0c1220] border border-slate-800 rounded px-2.5 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded font-sans font-bold uppercase transition flex items-center justify-center gap-1.5 cursor-pointer py-1.5 sm:py-0"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Send NDA Package</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
