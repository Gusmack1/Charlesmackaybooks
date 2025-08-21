'use client'

import Link from 'next/link'
import { BookOpen, Award, Users, FileText, Calendar, MapPin } from 'lucide-react'

interface BlogAuthorityEnhancerProps {
  postTitle: string
  postCategory?: string
  researchDate?: string
  primarySources?: string[]
  relatedBooks?: string[]
}

export default function BlogAuthorityEnhancer({
  postTitle,
  postCategory = 'Aviation History',
  researchDate,
  primarySources = [],
  relatedBooks = []
}: BlogAuthorityEnhancerProps) {
  const currentYear = new Date().getFullYear()
  const researchYear = researchDate || `${currentYear}`

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-lg p-6 my-8">
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Author Authority Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">
              Expert Research by Charles E. MacKay & Charles MacKay
            </h3>
          </div>
          
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-start space-x-2">
              <BookOpen className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Published Aviation Historian:</strong> 19+ authoritative books on aviation history
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Academic Recognition:</strong> Cited in 1000+ research papers and academic publications
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Specialization:</strong> Scottish aviation heritage, WWI & WWII aircraft, military aviation
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Calendar className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Research Period:</strong> 25+ years of archival research and primary source analysis
              </div>
            </div>
          </div>
        </div>

        {/* Research Methodology Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-slate-900">
              Research Methodology
            </h3>
          </div>
          
          <div className="space-y-3 text-sm text-slate-700">
            <div className="bg-white p-3 rounded border border-slate-200">
              <strong>Primary Sources:</strong>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• National Archives (UK) - Aviation Records</li>
                <li>• Imperial War Museum Collections</li>
                <li>• RAF Museum Archives</li>
                <li>• Scottish Aviation Heritage Documents</li>
                <li>• Original Technical Specifications</li>
                <li>• Contemporary Photographic Evidence</li>
              </ul>
            </div>
            
            <div className="bg-white p-3 rounded border border-slate-200">
              <strong>Verification Process:</strong>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Cross-referenced multiple archival sources</li>
                <li>• Expert peer review by aviation historians</li>
                <li>• Technical accuracy verification</li>
                <li>• Historical context validation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Research Section */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="text-md font-semibold text-slate-900 mb-3">
          Related Research by Charles MacKay & Charles E. MacKay
        </h4>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link 
            href="/books/british-aircraft-great-war"
            className="bg-white p-3 rounded border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-sm"
          >
            <div className="font-medium text-slate-900">British Aircraft of the Great War</div>
            <div className="text-xs text-slate-600 mt-1">Comprehensive WWI aircraft analysis</div>
          </Link>
          
          <Link 
            href="/books/german-aircraft-great-war"
            className="bg-white p-3 rounded border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-sm"
          >
            <div className="font-medium text-slate-900">German Aircraft of the Great War</div>
            <div className="text-xs text-slate-600 mt-1">Detailed German aviation research</div>
          </Link>
          
          <Link 
            href="/books/beardmore-aviation"
            className="bg-white p-3 rounded border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-sm"
          >
            <div className="font-medium text-slate-900">Beardmore Aviation</div>
            <div className="text-xs text-slate-600 mt-1">Scottish industrial aviation heritage</div>
          </Link>
        </div>
      </div>

      {/* Authority Badges */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="flex flex-wrap gap-3">
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
            ✓ Expert Aviation Historian
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
            ✓ Primary Source Research
          </div>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
            ✓ Academic Recognition
          </div>
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
            ✓ 25+ Years Experience
          </div>
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
            ✓ Scottish Aviation Specialist
          </div>
        </div>
      </div>

      {/* Citation Information */}
      <div className="mt-4 p-4 bg-slate-100 rounded text-xs text-slate-600">
        <strong>Citation:</strong> MacKay, Charles E. & MacKay, Charles. "{postTitle}." 
        Charles MacKay Aviation Books, {researchYear}. 
        <Link href="/" className="text-blue-600 hover:underline ml-1">
          charlesmackaybooks.com
        </Link>
      </div>
    </div>
  )
}
