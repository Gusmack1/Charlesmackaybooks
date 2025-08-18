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
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-green-600" />
        Secure & Trusted Shopping
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {showSSL && (
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
            <Lock className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">SSL Secured</p>
              <p className="text-xs text-green-600">256-bit encryption</p>
            </div>
          </div>
        )}

        {showPCI && (
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-800">PCI Compliant</p>
              <p className="text-xs text-blue-600">Payment security</p>
            </div>
          </div>
        )}

        {showGuarantee && (
          <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
            <Award className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium text-orange-800">30-Day Guarantee</p>
              <p className="text-xs text-orange-600">Money back guarantee</p>
            </div>
          </div>
        )}

        {showReviews && (
          <div className="flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg">
            <Star className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800">5-Star Reviews</p>
              <p className="text-xs text-yellow-600">Customer verified</p>
            </div>
          </div>
        )}

        {showSecurity && (
          <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
            <Shield className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-purple-800">Fraud Protection</p>
              <p className="text-xs text-purple-600">Advanced security</p>
            </div>
          </div>
        )}

        {showTrust && (
          <div className="flex items-center space-x-2 p-3 bg-indigo-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm font-medium text-indigo-800">Trusted Author</p>
              <p className="text-xs text-indigo-600">Charles E. MacKay</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm text-secondary">
          <span>🔒 Secure Checkout</span>
          <span>✓ Verified Author</span>
          <span>🛡️ Protected</span>
        </div>
      </div>
    </div>
  );
}
