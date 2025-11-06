'use client';

import { useState, useRef } from 'react';

interface ScriptSelectorProps {
  currentScript: string | null;
  onScriptChange: (script: string) => void;
}

export default function ScriptSelector({ currentScript, onScriptChange }: ScriptSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileInput(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!textInput.trim() && !fileInput) {
      alert('Vui lòng nhập kịch bản hoặc chọn file DOCX');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      if (fileInput) {
        formData.append('file', fileInput);
      } else if (textInput.trim()) {
        formData.append('textScript', textInput);
      }

      const response = await fetch('/api/scripts', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onScriptChange(data.script);
        setIsOpen(false);
        setTextInput('');
        setFileInput(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        alert('Lỗi: ' + (data.error || 'Không thể xử lý kịch bản'));
      }
    } catch (error) {
      console.error('Error uploading script:', error);
      alert('Lỗi khi tải kịch bản');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
              Kịch bản đang sử dụng:
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              {currentScript 
                ? `${currentScript.substring(0, 100)}${currentScript.length > 100 ? '...' : ''}`
                : 'Chưa có kịch bản. Vui lòng thêm kịch bản để bắt đầu.'}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {currentScript ? 'Đổi kịch bản' : 'Thêm kịch bản'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentScript ? 'Đổi kịch bản' : 'Thêm kịch bản'}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nhập kịch bản bằng text:
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Nhập nội dung kịch bản tư vấn tại đây..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows={8}
                  />
                </div>

                <div className="text-center text-gray-500 dark:text-gray-400">HOẶC</div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Import file DOCX:
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".docx"
                    onChange={handleFileSelect}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  {fileInput && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Đã chọn: {fileInput.name}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isLoading ? 'Đang xử lý...' : 'Lưu kịch bản'}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

