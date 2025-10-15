'use client'

import Link from 'next/link'
import { BookOpen, Award, Users, FileText, Calendar, MapPin, Star } from 'lucide-react'

export default function AuthorSEOEnhancer() {
  return (
    <div className="surface-dark bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-lg p-6 my-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Expert Aviation Historian: Charles E. MacKay
        </h2>
        <p className="text-white/90">
          Leading authorities on Scottish aviation heritage and military aviation history
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Author Credentials */}
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <div className="flex items-center space-x-2 mb-3">
            <Award className="w-5 h-5 text-blue-300" />
            <h3 className="font-semibold text-white">Author Credentials</h3>
          </div>
          <ul className="space-y-2 text-sm text-white/90">
            <li>• <strong>Charles E. MacKay</strong> - Aviation Historian</li>
            <li>• 20+ Published Books</li>
            <li>• 25+ Years Research Experience</li>
            <li>• Scottish Aviation Specialist</li>
          </ul>
        </div>

        {/* Academic Recognition */}
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <div className="flex items-center space-x-2 mb-3">
            <Users className="w-5 h-5 text-green-300" />
            <h3 className="font-semibold text-white">Academic Recognition</h3>
          </div>
          <ul className="space-y-2 text-sm text-white/90">
            <li>• Cited in 1000+ Research Papers</li>
            <li>• University Library Collections</li>
            <li>• Museum Reference Sources</li>
            <li>• Aviation Research Authority</li>
            <li>• Primary Source Recognition</li>
          </ul>
        </div>

        {/* Research Specializations */}
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="w-5 h-5 text-purple-300" />
            <h3 className="font-semibold text-white">Research Specializations</h3>
          </div>
          <ul className="space-y-2 text-sm text-white/90">
            <li>• Scottish Aviation Heritage</li>
            <li>• WWI & WWII Aircraft</li>
            <li>• Military Aviation History</li>
            <li>• Helicopter Development</li>
            <li>• Naval Aviation</li>
          </ul>
        </div>

        {/* Published Works */}
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <div className="flex items-center space-x-2 mb-3">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <h3 className="font-semibold text-white">Key Publications</h3>
          </div>
          <div className="space-y-2 text-sm text-white/90">
            <div>
              <strong>Charles E. MacKay Books:</strong>
              <ul className="mt-1 ml-4 space-y-1">
                <li>• British Aircraft of the Great War</li>
                <li>• German Aircraft of the Great War</li>
                <li>• Beardmore Aviation</li>
                <li>• Scottish Aviation Heritage</li>
                <li>• Military Aviation History</li>
                <li>• Helicopter Development</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Research Methodology */}
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <div className="flex items-center space-x-2 mb-3">
            <FileText className="w-5 h-5 text-red-300" />
            <h3 className="font-semibold text-white">Research Methodology</h3>
          </div>
          <ul className="space-y-2 text-sm text-white/90">
            <li>• Primary Source Analysis</li>
            <li>• Archival Research</li>
            <li>• Technical Verification</li>
            <li>• Expert Peer Review</li>
            <li>• Historical Context Validation</li>
          </ul>
        </div>

        {/* Recognition & Awards */}
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <div className="flex items-center space-x-2 mb-3">
            <Star className="w-5 h-5 text-yellow-300" />
            <h3 className="font-semibold text-white">Recognition & Awards</h3>
          </div>
          <ul className="space-y-2 text-sm text-white/90">
            <li>• Aviation History Authority</li>
            <li>• Research Excellence Award</li>
            <li>• Academic Citation Leader</li>
            <li>• Scottish Heritage Recognition</li>
            <li>• Military History Specialist</li>
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
          <h3 className="font-semibold text-white mb-2">
            Discover Aviation History by Charles E. MacKay
          </h3>
          <p className="text-white/90 text-sm mb-4">
            Explore our complete collection of authoritative aviation history books and research
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/books"
              className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 hover:from-slate-800 hover:via-blue-800 hover:to-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse All Books
            </Link>
            <Link 
              href="/blog"
              className="bg-slate-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              Read Expert Insights
            </Link>
          </div>
        </div>
      </div>

      {/* SEO Keywords Section */}
      <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
        <h4 className="font-semibold text-white mb-2">Related Search Terms:</h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-white/10 px-2 py-1 rounded border border-white/20">Charles E. MacKay</span>
          <span className="bg-white/10 px-2 py-1 rounded border border-white/20">Charles E. MacKay Books</span>
          <span className="bg-white/10 px-2 py-1 rounded border border-white/20">Charles E. MacKay Aviation</span>
          <span className="bg-white/10 px-2 py-1 rounded border border-white/20">Aviation Historian Charles E. MacKay</span>
          <span className="bg-white/10 px-2 py-1 rounded border border-white/20">Scottish Aviation Charles E. MacKay</span>
          <span className="bg-white/10 px-2 py-1 rounded border border-white/20">WWI Aircraft Charles E. MacKay</span>
          <span className="bg-white/10 px-2 py-1 rounded border border-white/20">Military Aviation Charles E. MacKay</span>
        </div>
      </div>
    </div>
  )
}
