"use client";

import React, { useMemo, useState } from "react";
import approvals from "@/data/image-approvals.json";

type Candidate = {
  url: string;
  source: string;
  license: string;
  title: string;
  alt: string;
  caption?: string;
  approved: boolean;
};

type PostRecord = {
  requiredCount: number;
  approvedFeaturedIndex: number | null;
  candidates: Candidate[];
};

export default function ImageApprovalsPage() {
  const [state, setState] = useState(approvals as any);

  const posts = useMemo(() => Object.entries(state.posts as Record<string, PostRecord>), [state]);

  const toggleApproved = (slug: string, index: number) => {
    const next = { ...state };
    next.posts[slug].candidates[index].approved = !next.posts[slug].candidates[index].approved;
    setState(next);
  };

  const setFeatured = (slug: string, index: number) => {
    const next = { ...state };
    next.posts[slug].approvedFeaturedIndex = index;
    setState(next);
  };

  const addCandidate = (slug: string) => {
    const next = { ...state };
    next.posts[slug].candidates.push({ url: "", source: "", license: "", title: "", alt: "", caption: "", approved: false });
    setState(next);
  };

  const updateField = (slug: string, index: number, key: keyof Candidate, value: string | boolean) => {
    const next = { ...state };
    // @ts-ignore
    next.posts[slug].candidates[index][key] = value as any;
    setState(next);
  };

  const download = () => {
    const blob = new Blob([JSON.stringify({ ...state, updatedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "image-approvals.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0b2a5b] text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Image Approvals</h1>
        <p className="text-sm text-slate-300 mb-6">Review candidate images per post. Approvals will be exported as a JSON you can place in <code>src/data/image-approvals.json</code>.</p>

        <div className="flex justify-end mb-4">
          <button onClick={download} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white">Download Updated Manifest</button>
        </div>

        <div className="space-y-8">
        {posts.map(([slug, rec]) => {
          const approved = rec.candidates.filter(c => c.approved).length;
          return (
            <section key={slug} className="border border-slate-700 bg-slate-900/40 rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{slug}</h2>
                <div className="text-sm text-slate-300">Approved {approved}/{rec.requiredCount}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rec.candidates.map((c, idx) => (
                  <div key={idx} className="border border-slate-700 bg-slate-900/30 rounded p-3">
                    <div className="flex items-center gap-3 mb-3">
                      <input type="checkbox" checked={c.approved} onChange={() => toggleApproved(slug, idx)} />
                      <button className={`px-2 py-1 rounded ${rec.approvedFeaturedIndex === idx ? 'bg-green-600 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'}`} onClick={() => setFeatured(slug, idx)}>
                        {rec.approvedFeaturedIndex === idx ? 'Featured' : 'Set as Featured'}
                      </button>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm mb-1">Image URL</label>
                      <input className="w-full border border-slate-600 bg-slate-800 text-white placeholder-slate-400 rounded p-2" value={c.url} onChange={e => updateField(slug, idx, 'url', e.target.value)} placeholder="https://..." />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-sm mb-1">Source</label>
                        <input className="w-full border border-slate-600 bg-slate-800 text-white placeholder-slate-400 rounded p-2" value={c.source} onChange={e => updateField(slug, idx, 'source', e.target.value)} placeholder="commons.wikimedia.org/..." />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">License</label>
                        <input className="w-full border border-slate-600 bg-slate-800 text-white placeholder-slate-400 rounded p-2" value={c.license} onChange={e => updateField(slug, idx, 'license', e.target.value)} placeholder="CC BY-SA 4.0 / Public Domain" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm mb-1">Title</label>
                      <input className="w-full border border-slate-600 bg-slate-800 text-white placeholder-slate-400 rounded p-2" value={c.title} onChange={e => updateField(slug, idx, 'title', e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm mb-1">Alt</label>
                      <input className="w-full border border-slate-600 bg-slate-800 text-white placeholder-slate-400 rounded p-2" value={c.alt} onChange={e => updateField(slug, idx, 'alt', e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm mb-1">Caption</label>
                      <textarea className="w-full border border-slate-600 bg-slate-800 text-white placeholder-slate-400 rounded p-2" value={c.caption || ''} onChange={e => updateField(slug, idx, 'caption', e.target.value)} />
                    </div>
                    {c.url && (
                      <div className="aspect-video bg-slate-800 rounded overflow-hidden border border-slate-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.url} alt={c.alt} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <button onClick={() => addCandidate(slug)} className="px-3 py-2 rounded bg-slate-700 text-white hover:bg-slate-600">Add candidate</button>
              </div>
            </section>
          );
        })}
      </div>
      </div>
    </div>
  );
}


