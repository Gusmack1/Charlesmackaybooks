'use client'

import { useEffect, useState } from 'react'

type Row = {
  slug: string
  featuredUrl: string
  featuredIsDefault: boolean
  placeholdersInContent: number
  approvedCount: number
  requiredCount: number
  pendingCount: number
}

export default function BlogAssetsAdminPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/data/blog-assets-audit.json', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          setRows(data.report || [])
        }
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Blog Assets Audit</h1>
        {loading ? (
          <p>Loading report…</p>
        ) : rows.length === 0 ? (
          <p>No audit found. Run: <code>npm run audit:blogs</code></p>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-3">Slug</th>
                  <th className="text-left p-3">Featured</th>
                  <th className="text-left p-3">Placeholders</th>
                  <th className="text-left p-3">Approved</th>
                  <th className="text-left p-3">Required</th>
                  <th className="text-left p-3">Pending</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.slug} className="border-t">
                    <td className="p-3">
                      <a href={`/blog/${r.slug}`} className="underline text-blue-600" target="_blank" rel="noreferrer">
                        {r.slug}
                      </a>
                    </td>
                    <td className="p-3">
                      {r.featuredIsDefault ? (
                        <span className="text-red-600">Default</span>
                      ) : (
                        <span className="text-green-700">Custom</span>
                      )}
                    </td>
                    <td className="p-3">{r.placeholdersInContent}</td>
                    <td className="p-3">{r.approvedCount}</td>
                    <td className="p-3">{r.requiredCount}</td>
                    <td className="p-3">{r.pendingCount}</td>
                    <td className="p-3">
                      <a href={`/admin/image-approvals`} className="underline">Manage Images</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}


