# Chatbot AI VBI

Ứng dụng chatbot AI demo sử dụng Google Gemini để tư vấn khách hàng về các sản phẩm bảo hiểm VBI. Chatbot hoạt động dựa trên kịch bản tư vấn được nhập trực tiếp hoặc upload từ file DOCX.

## Tính năng

- ✅ **Quản lý kịch bản**: Nhập kịch bản bằng text hoặc upload file DOCX
- ✅ **Chat interface**: Giao diện chat thân thiện với khách hàng
- ✅ **Tích hợp Gemini AI**: Sử dụng Google Gemini API (bản free) để xử lý câu trả lời
- ✅ **Đa ngôn ngữ**: Chatbot có thể trả lời bằng nhiều thứ tiếng
- ✅ **Lịch sự & chuyên nghiệp**: AI luôn trả lời đầy đủ chủ ngữ vị ngữ, lịch sự

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Engine**: Google Gemini API (gemini-pro)
- **File Processing**: Mammoth (đọc file DOCX)

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Tạo file .env.local và thêm API key
# GEMINI_API_KEY=your_gemini_api_key_here

# Chạy development server
npm run dev

# Build cho production
npm run build

# Chạy production server
npm start
```

Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000)

## Cấu hình

Tạo file `.env.local` trong thư mục gốc với nội dung:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Lấy API key từ [Google AI Studio](https://makersuite.google.com/app/apikey)

## Cách sử dụng

1. **Thêm kịch bản**:
   - Click button "Thêm kịch bản" hoặc "Đổi kịch bản"
   - Nhập kịch bản trực tiếp vào textarea HOẶC
   - Upload file DOCX từ máy tính
   - Click "Lưu kịch bản"

2. **Chat với khách hàng**:
   - Nhập câu hỏi vào ô chat
   - Press Enter hoặc click "Gửi"
   - Chatbot sẽ trả lời dựa trên kịch bản đã cung cấp

## Cấu trúc dự án

```
chatbot-ai/
├── app/
│   ├── api/
│   │   ├── chat/route.ts      # API endpoint xử lý chat
│   │   └── scripts/route.ts   # API endpoint upload/parse script
│   ├── components/
│   │   ├── ScriptSelector.tsx # Component quản lý kịch bản
│   │   └── ChatInterface.tsx  # Component giao diện chat
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Trang chủ
│   └── globals.css            # Global styles
├── tailwind.config.ts         # Cấu hình Tailwind CSS
├── tsconfig.json              # Cấu hình TypeScript
└── next.config.mjs            # Cấu hình Next.js
```

## Lưu ý

- Chatbot chỉ trả lời dựa trên thông tin trong kịch bản được cung cấp
- Nếu không có thông tin trong kịch bản, chatbot sẽ đề xuất liên hệ giao dịch viên
- Chatbot hỗ trợ đa ngôn ngữ (tiếng Việt, tiếng Anh, v.v.)
- Chatbot luôn trả lời lịch sự, chuyên nghiệp với đầy đủ chủ ngữ vị ngữ

## Phát triển tiếp theo

Xem file `CURSOR_PROMPT.md` để biết chi tiết về yêu cầu và cấu trúc dự án.
