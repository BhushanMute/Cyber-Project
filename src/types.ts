/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Core Services Interfaces
export interface ServiceDetail {
  problemStatement: string;
  whatWeDo: string[];
  toolsUsed: string[];
  benefits: string[];
  deliverables: string[];
  timeline: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  category: "Security Assessment" | "Deflective Security" | "Compliance & Training";
  isMajor: boolean;
  businessBenefits: string[];
  details?: ServiceDetail;
}

// Case Study Interface
export interface CaseStudy {
  id: string;
  title: string;
  clientType: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: string[];
  confidentialName: string;
}

// Blog Post Interface
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Threat Intel" | "Best Practices" | "Compliance" | "Expert Guide";
  publishDate: string;
  readTime: string;
  author: string;
}

// Industry Interface
export interface IndustryServed {
  id: string;
  name: string;
  icon: string;
  description: string;
  keyCompliance: string;
  primaryRisk: string;
}

// Form Submission Interfaces
export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  serviceRequired: string;
  message: string;
  timestamp: string;
}

export interface SecurityAuditRequest {
  companyDomain: string;
  contactEmail: string;
  teamSize: string;
  hostingEnvironment: "Cloud" | "On-Premises" | "Hybrid" | "Not Sure";
  complianceNeeds: string[];
  agreeToAuditTerms: boolean;
  timestamp: string;
}

export interface NewsletterSubscription {
  email: string;
  timestamp: string;
}

export interface ConsultationBooking {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTimeSlot: string;
  consultationTopic: string;
  timestamp: string;
}
