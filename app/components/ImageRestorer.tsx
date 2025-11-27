"use client";

import { useState } from "react";

interface RestoreResult {
  success: boolean;
  restoredImageUrl?: string;
  error?: string;
  model?: string;
  setupGuide?: any;
}

export default function ImageRestorer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelType, setModelType] = useState<string>("codeformer");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setRestoredImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Vui lòng chọn file ảnh hợp lệ");
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const restoreImage = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch("/api/restore-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: selectedImage,
          options: {
            modelType: modelType,
            upscale: 2,
            fidelity: 0.8,
            faceUpsample: true,
            backgroundEnhance: true,
          },
        }),
      });

      const data: RestoreResult = await response.json();

      if (data.success && data.restoredImageUrl) {
        setRestoredImage(data.restoredImageUrl);
      } else {
        setError(data.error || "Có lỗi xảy ra");
        
        // Hiển thị hướng dẫn setup nếu chưa cấu hình
        if (data.setupGuide) {
          console.log("Setup Guide:", data.setupGuide);
        }
      }
    } catch (err: any) {
      setError(err.message || "Lỗi kết nối đến server");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            🎨 Phục Chế Ảnh Cũ - AI Powered
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-full transition-all duration-300 ${
              isDarkMode 
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
            }`}
            title={isDarkMode ? 'Chế độ sáng' : 'Chế độ tối'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className={`rounded-xl shadow-2xl p-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Model Selection */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              🤖 Chọn Model AI:
            </label>
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-650' 
                  : 'bg-white text-gray-800 border-gray-300 hover:border-blue-400'
              } border`}
              disabled={isProcessing}
            >
              <option value="codeformer">
                CodeFormer - Tốt nhất cho ảnh chân dung/khuôn mặt
              </option>
              <option value="gfpgan">
                GFPGAN - Phục chế ảnh chất lượng cao, đa năng
              </option>
              <option value="realesrgan">
                Real-ESRGAN - Tăng độ phân giải, ảnh tổng quát
              </option>
            </select>
          </div>

          {/* Drag & Drop Image Upload */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              📸 Chọn hoặc kéo thả ảnh cần phục chế:
            </label>
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                isDragging
                  ? isDarkMode 
                    ? 'border-blue-400 bg-blue-900/30 scale-105' 
                    : 'border-blue-500 bg-blue-50 scale-105'
                  : isDarkMode
                    ? 'border-gray-600 hover:border-gray-500 bg-gray-750'
                    : 'border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50/50'
              } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isProcessing}
                id="file-input"
              />
              <div className="pointer-events-none">
                <div className="text-6xl mb-4">
                  {selectedImage ? '✅' : '📤'}
                </div>
                <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {selectedImage ? 'Ảnh đã được chọn!' : 'Kéo thả ảnh vào đây'}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  hoặc click để chọn file
                </p>
                <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Hỗ trợ: JPG, PNG, GIF, WEBP
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mb-6 p-4 rounded-xl border-l-4 ${
              isDarkMode 
                ? 'bg-red-900/30 border-red-500 text-red-300' 
                : 'bg-red-50 border-red-500 text-red-800'
            }`}>
              <p className="font-medium flex items-center">
                <span className="text-2xl mr-2">⚠️</span> 
                Lỗi:
              </p>
              <p className={`mt-1 ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>{error}</p>
              {error.includes("REPLICATE_API_TOKEN") && (
                <div className={`mt-3 text-sm ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                  <p className="font-medium">📋 Hướng dẫn cài đặt:</p>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Đăng ký tại: https://replicate.com</li>
                    <li>Lấy API token</li>
                    <li>Chạy: npm install replicate</li>
                    <li>Thêm REPLICATE_API_TOKEN vào .env.local</li>
                    <li>Restart server: npm run dev</li>
                  </ol>
                  <p className={`mt-2 text-xs ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
                    📖 Xem chi tiết trong file: PHOTO_RESTORATION_API_GUIDE.md
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Restore Button */}
          {selectedImage && (
            <button
              onClick={restoreImage}
              disabled={isProcessing}
              className={`w-full py-4 px-6 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed mb-6 shadow-lg ${
                isProcessing
                  ? isDarkMode 
                    ? 'bg-gray-600 text-gray-400' 
                    : 'bg-gray-400 text-gray-600'
                  : isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  ⏳ Đang phục chế... (có thể mất 10-30 giây)
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="text-xl mr-2">✨</span>
                  Phục Chế Ảnh Ngay
                </span>
              )}
            </button>
          )}

          {/* Image Comparison */}
          {selectedImage && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original Image */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <h3 className={`text-lg font-semibold mb-3 flex items-center ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  <span className="text-2xl mr-2">📷</span>
                  Ảnh Gốc
                </h3>
                <div className={`border-2 rounded-xl overflow-hidden shadow-lg ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-300'
                }`}>
                  <img
                    src={selectedImage}
                    alt="Original"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Restored Image */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <h3 className={`text-lg font-semibold mb-3 flex items-center ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  <span className="text-2xl mr-2">✨</span>
                  Ảnh Đã Phục Chế
                </h3>
                {restoredImage ? (
                  <div className="border-2 border-green-500 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={restoredImage}
                      alt="Restored"
                      className="w-full h-auto object-cover"
                    />
                    <div className={`p-4 ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                      <button
                        onClick={() =>
                          downloadImage(restoredImage, "restored-image.png")
                        }
                        className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center"
                      >
                        <span className="text-xl mr-2">⬇️</span>
                        Tải Ảnh Đã Phục Chế
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-750' 
                      : 'border-gray-300 bg-gray-50'
                  }`}>
                    {isProcessing ? (
                      <div className="animate-pulse">
                        <div className="text-5xl mb-4">⚙️</div>
                        <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          Đang xử lý...
                        </p>
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          Vui lòng đợi một chút
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-5xl mb-4">🖼️</div>
                        <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Ảnh sẽ hiển thị ở đây
                        </p>
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          sau khi phục chế
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Info */}
          <div className={`mt-8 p-6 rounded-xl border-l-4 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-blue-900/30 border-blue-500 shadow-blue-900/20' 
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500 shadow-sm'
          }`}>
            <h4 className={`font-bold text-lg mb-3 flex items-center ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
              <span className="text-2xl mr-2">💡</span>
              Thông tin quan trọng
            </h4>
            <ul className={`text-sm space-y-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
              <li className="flex items-start">
                <span className="mr-2 text-lg">🤖</span>
                <span>API này sử dụng Replicate AI để phục chế ảnh thực sự (không chỉ phân tích)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">🔑</span>
                <span>Cần cấu hình REPLICATE_API_TOKEN để sử dụng</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">🆓</span>
                <span>Free tier: 50 lần phục chế/tháng</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">⏱️</span>
                <span>Thời gian xử lý: 10-30 giây tùy model</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">⭐</span>
                <span>CodeFormer tốt nhất cho ảnh chân dung, GFPGAN cho ảnh đa năng</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
