'use client';

import { useState } from 'react';
import ScriptSelector from './components/ScriptSelector';
import ChatInterface from './components/ChatInterface';

export default function Home() {
  const [currentScript, setCurrentScript] = useState<string | null>(null);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Chatbot AI VBI
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ứng dụng chatbot AI tư vấn bảo hiểm VBI
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
    </main>
  );
}
