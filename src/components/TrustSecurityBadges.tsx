'use client';

import React from 'react';
import { Shield, Lock, CreditCard, CheckCircle, Star, Award } from 'lucide-react';

interface TrustSecurityBadgesProps {
  showSSL?: boolean;
  showPCI?: boolean;
  showGuarantee?: boolean;
  showReviews?: boolean;
  showSecurity?: boolean;
  showTrust?: boolean;
}

export default function TrustSecurityBadges({
  showSSL = true,
  showPCI = true,
  showGuarantee = true,
  showReviews = true,
  showSecurity = true,
  showTrust = true
}: TrustSecurityBadgesProps) {
  return (
    <div className="surface-dark bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-4">
        <h3 className="text-lg font-bold text-center mb-4 flex items-center justify-center">
          <Shield className="w-4 h-4 mr-2 text-blue-400" />
          Secure & Trusted Shopping
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {showSSL && (
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-white/15 bg-black/10">
              <Lock className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs font-semibold text-white">SSL Secured</p>
                <p className="text-xs opacity-80">256-bit encryption</p>
              </div>
            </div>
          )}

          {showPCI && (
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-white/15 bg-black/10">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs font-semibold text-white">PCI Compliant</p>
                <p className="text-xs opacity-80">Payment security</p>
              </div>
            </div>
          )}

          {showGuarantee && (
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-white/15 bg-black/10">
              <Award className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-xs font-semibold text-white">30-Day Guarantee</p>
                <p className="text-xs opacity-80">Money back guarantee</p>
              </div>
            </div>
          )}

          {showReviews && (
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-white/15 bg-black/10">
              <Star className="w-4 h-4 text-yellow-400" />
              <div>
                <p className="text-xs font-semibold text-white">5-Star Reviews</p>
                <p className="text-xs opacity-80">Customer verified</p>
              </div>
            </div>
          )}

          {showSecurity && (
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-white/15 bg-black/10">
              <Shield className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs font-semibold text-white">Fraud Protection</p>
                <p className="text-xs opacity-80">Advanced security</p>
              </div>
            </div>
          )}

          {showTrust && (
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-white/15 bg-black/10">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs font-semibold text-white">Trusted Author</p>
                <p className="text-xs opacity-80">Charles E. MacKay</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-white/15">
          <div className="flex items-center justify-center space-x-6 text-xs opacity-90">
            <span className="flex items-center">
              <Lock className="w-3 h-3 mr-1 text-green-400" />
              Secure Checkout
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-3 h-3 mr-1 text-blue-400" />
              Verified Author
            </span>
            <span className="flex items-center">
              <Shield className="w-3 h-3 mr-1 text-purple-400" />
              Protected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
