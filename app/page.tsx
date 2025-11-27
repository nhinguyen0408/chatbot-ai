'use client';

import { useState } from 'react';
import Header from './components/Header';
import ScriptSelector from './components/ScriptSelector';
import ChatInterface from './components/ChatInterface';
import PhotoRestoration from './components/PhotoRestoration';

type FeatureType = 'insurance' | 'photo-restoration';

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState<FeatureType>('insurance');
  const [currentScript, setCurrentScript] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Navigation */}
      <Header 
        currentFeature={currentFeature}
        onFeatureChange={setCurrentFeature}
      />

      {/* Main Content */}
      <main className="p-4 md:p-8 lg:p-12">
        {currentFeature === 'insurance' ? (
          <div className="max-w-6xl mx-auto">
            {/* Insurance Chatbot Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Chatbot Tư Vấn Bảo Hiểm VBI
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Hỗ trợ tư vấn các sản phẩm: TNDS xe cơ giới, VBICare, Bảo hiểm du lịch
              </p>
            </div>

            {/* Script Selector */}
            <div className="mb-6">
              <ScriptSelector 
                currentScript={currentScript}
                onScriptChange={setCurrentScript}
              />
            </div>

            {/* Chat Interface */}
            <div className="h-[600px] md:h-[700px]">
              <ChatInterface script={currentScript} />
            </div>
          </div>
        ) : (
          <div>
            {/* Photo Restoration Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Phục Chế Ảnh Cũ Bằng AI
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Phân tích và đưa ra kế hoạch phục chế chi tiết cho ảnh cũ của bạn
              </p>
            </div>

            <PhotoRestoration />
          </div>
        )}
      </main>
    </div>
  );
}
