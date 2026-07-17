/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Image, ExternalLink, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  imageUrl?: string; // Optional image URL for certificate files
  pdfUrl?: string; // Optional PDF file path or URL for inline viewing
  category: string;
}

export default function CertificationsTab() {
  const certifications: Certification[] = [
    {
      id: "ccnav7",
      title: "CCNAv7",
      issuer: "Cisco",
      issueDate: "",
      credentialId: "",
      verificationUrl: "",
      imageUrl: "",
      pdfUrl: new URL('../assets/certifications/CCNAv7.pdf', import.meta.url).href,
      category: "Networking"
    },
    {
      id: "devnet-associate",
      title: "DevNet Associate",
      issuer: "Cisco",
      issueDate: "",
      credentialId: "",
      verificationUrl: "",
      imageUrl: "",
      pdfUrl: new URL('../assets/certifications/DevNet Associate.pdf', import.meta.url).href,
      category: "Networking"
    },
    {
      id: "intro-cybersecurity",
      title: "Intro to CyberSecurity",
      issuer: "Cisco",
      issueDate: "",
      credentialId: "",
      verificationUrl: "",
      imageUrl: "",
      pdfUrl: new URL('../assets/certifications/Intro to CyberSec.pdf', import.meta.url).href,
      category: "Cybersecurity"
    }
  ];

  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 animate-fade-in" id="certifications-tab-root">
      
      {/* 1. Informational header */}
      <div className="rounded-lg border border-[#d0d7de] bg-[#f6f8fa] p-6 dark:border-[#30363d] dark:bg-[#161b22]" id="certs-header">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-[#f78166]/10 p-3 text-[#f78166]">
            <Award size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#24292f] dark:text-[#f0f6fc] flex items-center gap-2">
              Professional Certifications <Sparkles size={16} className="text-yellow-400" />
            </h2>
            <p className="mt-1 text-sm text-[#57606a] dark:text-[#8b949e] leading-relaxed">
              Showcasing valid verified technical credentials. Below, you can see the layouts designed specifically to present your certificate images.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Layout Grid for Certificate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="certs-showcase-grid">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col rounded-lg border border-[#d0d7de] bg-white shadow-sm hover:shadow transition duration-200 dark:border-[#30363d] dark:bg-[#161b22] overflow-hidden"
            id={`cert-card-${cert.id}`}
          >
            {/* Visual Certificate Placeholder Container */}
            <div className="relative aspect-video w-full bg-[#f6f8fa] dark:bg-[#0d1117] border-b border-[#d0d7de] dark:border-[#30363d] flex flex-col items-center justify-center p-4 overflow-hidden">
              {cert.imageUrl ? (
                // Displays the real image once the user inputs it
                <img
                  src={cert.imageUrl}
                  alt={`${cert.title} certificate document`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain hover:scale-[1.02] transition-transform duration-300"
                />
              ) : cert.pdfUrl ? (
                // Inline PDF preview inside the card (first-page preview)
                <object data={cert.pdfUrl} type="application/pdf" className="h-full w-full">
                  {/* Fallback iframe if object isn't supported */}
                  <iframe src={cert.pdfUrl} title={`${cert.title} PDF preview`} className="h-full w-full" />
                </object>
              ) : (
                // High-fidelity Placeholder when neither image nor pdf is specified
                <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-[#d0d7de] dark:border-[#30363d] rounded-md p-4 bg-white/50 dark:bg-black/20 text-center select-none group">
                  <div className="rounded-full bg-[#f78166]/10 p-2.5 text-[#f78166] group-hover:scale-110 transition duration-200">
                    <Image size={22} />
                  </div>
                  <h4 className="mt-2 text-xs font-bold text-[#24292f] dark:text-[#f0f6fc]">
                    Certificate Preview Frame
                  </h4>
                  <p className="mt-1 text-[10px] text-[#57606a] dark:text-[#8b949e] max-w-[200px]">
                    To supply a preview, add a path to <code className="font-mono bg-[#eaeef2] dark:bg-[#1f242c] px-0.5 rounded">imageUrl</code> (image) or <code className="font-mono bg-[#eaeef2] dark:bg-[#1f242c] px-0.5 rounded">pdfUrl</code> (PDF) in code.
                  </p>
                  
                  {/* Subtle technical accent lines to make it look like a certificate draft */}
                  <div className="absolute top-2 left-2 text-[8px] font-mono text-[#d0d7de] dark:text-[#30363d] tracking-widest uppercase">
                    Specimen {cert.id}
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-45">
                    <ShieldCheck size={11} className="text-[#1f883d] dark:text-[#39d353]" />
                    <span className="text-[8px] font-mono text-[#57606a] dark:text-[#8b949e]">Verified ID</span>
                  </div>
                </div>
              )}

              {/* PDF quick action button (view inline) */}
              {cert.pdfUrl && (
                <button
                  onClick={() => setSelectedPdf(cert.pdfUrl || null)}
                  className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-md bg-[#0969da] text-white px-3 py-1.5 text-xs font-semibold shadow hover:opacity-90 transition"
                  title={`View ${cert.title} PDF`}
                >
                  View PDF
                  <ExternalLink size={12} />
                </button>
              )}
            </div>

            {/* Content Details Block */}
            <div className="p-4 flex flex-col justify-between flex-1 gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-[#eaeef2] px-2 py-0.5 text-[9px] font-bold text-[#24292f] dark:bg-[#30363d] dark:text-[#c9d1d9] uppercase tracking-wider">
                    {cert.category}
                  </span>
                  <span className="text-[10px] text-[#57606a] dark:text-[#8b949e] font-mono">
                    {cert.issueDate}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#24292f] dark:text-[#f0f6fc] leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs text-[#57606a] dark:text-[#8b949e] font-medium flex items-center gap-1">
                  <span>Issuer:</span>
                  <span className="text-[#24292f] dark:text-[#c9d1d9] font-semibold">{cert.issuer}</span>
                </p>

                {cert.credentialId && (
                  <p className="text-[10px] font-mono text-[#57606a] dark:text-[#8b949e] flex items-center gap-1 bg-[#f6f8fa] dark:bg-[#0d1117] px-1.5 py-0.5 rounded w-fit border border-[#d0d7de]/40 dark:border-[#30363d]/40">
                    <span>Credential ID:</span>
                    <span className="font-semibold text-[#24292f] dark:text-[#c9d1d9]">{cert.credentialId}</span>
                  </p>
                )}
              </div>

              {/* Action Buttons to Verify Credentials */}
              {cert.verificationUrl && (
                <div className="pt-3 border-t border-[#d0d7de]/40 dark:border-[#30363d]/40 flex justify-end">
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-xs font-semibold text-[#24292f] hover:bg-[#eaeef2] shadow-xs transition dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#c9d1d9] dark:hover:bg-[#30363d]"
                  >
                    Verify Credential
                    <ExternalLink size={12} className="ml-0.5 text-[#57606a] dark:text-[#8b949e]" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PDF inline viewer modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelectedPdf(null)}>
          <div className="relative w-full max-w-4xl h-[80vh] bg-white dark:bg-[#0d1117] rounded-md overflow-hidden shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-2 border-b border-[#d0d7de] dark:border-[#30363d]">
              <div className="text-sm font-semibold text-[#24292f] dark:text-[#f0f6fc]">Certificate Viewer</div>
              <div className="flex items-center gap-2">
                <a href={selectedPdf} target="_blank" rel="noreferrer" className="text-xs inline-flex items-center gap-1 px-2 py-1 bg-[#eaeef2] dark:bg-[#21262d] rounded">
                  Open in new tab
                  <ExternalLink size={12} />
                </a>
                <button onClick={() => setSelectedPdf(null)} className="text-sm px-2 py-1 rounded hover:bg-[#eaeef2] dark:hover:bg-[#30363d]">Close</button>
              </div>
            </div>

            <iframe src={selectedPdf} title="Certification PDF" className="w-full h-full border-0" />
          </div>
        </div>
      )}

    </div>
  );
}
