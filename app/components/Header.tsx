'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type FeatureType = 'insurance' | 'photo-restoration';

interface HeaderProps {
  currentFeature: FeatureType;
  onFeatureChange: (feature: FeatureType) => void;
}

export default function Header({ currentFeature, onFeatureChange }: HeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Services Platform
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Powered by Google Gemini AI
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex space-x-2">
            <button
              onClick={() => onFeatureChange('insurance')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                currentFeature === 'insurance'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span className="hidden sm:inline">Chatbot Bảo Hiểm</span>
              <span className="sm:hidden">Chatbot</span>
            </button>

            <button
              onClick={() => onFeatureChange('photo-restoration')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                currentFeature === 'photo-restoration'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="hidden sm:inline">Phục Chế Ảnh</span>
              <span className="sm:hidden">Ảnh AI</span>
            </button>

            <Link
              href="/image-restorer"
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-600 hover:text-white hover:shadow-lg hover:shadow-green-500/50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="hidden sm:inline">Image Restorer</span>
              <span className="sm:hidden">Restorer</span>
            </Link>
          </nav>
        </div>

        {/* Feature Description */}
        <div className="pb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {currentFeature === 'insurance' ? (
              <>
                🛡️ <span className="font-medium">Chatbot tư vấn bảo hiểm VBI</span> - Hỗ trợ tư vấn các sản phẩm bảo hiểm
              </>
            ) : (
              <>
                ✨ <span className="font-medium">Phục chế ảnh cũ bằng AI</span> - Khôi phục và cải thiện chất lượng ảnh cũ
              </>
            )}
          </p>
        </div>
      </div>
    </header>
  );
}

