'use client';

import React, { useState } from 'react';

export default function TestReactPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          React Module Test
        </h1>
        <p className="text-gray-600 mb-4">
          If you can see this page, React is working correctly!
        </p>
        <div className="mb-4">
          <p className="text-lg font-semibold text-blue-600">
            Count: {count}
          </p>
        </div>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Increment Count
        </button>
        <div className="mt-4 text-sm text-green-600">
          ✅ React imports are working correctly
        </div>
      </div>
    </div>
  );
} 