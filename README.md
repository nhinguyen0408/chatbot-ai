# AI Services Platform

Nền tảng dịch vụ AI tích hợp 2 tính năng chính: Chatbot tư vấn bảo hiểm VBI và Phục chế ảnh cũ bằng AI. Sử dụng Google Gemini API để cung cấp các dịch vụ AI thông minh.

## Tính năng

### 🤖 Chatbot Tư Vấn Bảo Hiểm VBI
- ✅ **Quản lý kịch bản**: Nhập kịch bản bằng text hoặc upload file DOCX
- ✅ **Chat interface**: Giao diện chat thân thiện với khách hàng
- ✅ **Tích hợp Gemini AI**: Sử dụng Google Gemini API để xử lý câu trả lời
- ✅ **Đa ngôn ngữ**: Chatbot có thể trả lời bằng nhiều thứ tiếng
- ✅ **Lịch sự & chuyên nghiệp**: AI luôn trả lời đầy đủ chủ ngữ vị ngữ, lịch sự

### 📸 Phục Chế Ảnh Cũ Bằng AI
- ✅ **Upload ảnh**: Kéo thả hoặc chọn ảnh từ máy tính (JPG, PNG, GIF - tối đa 10MB)
- ✅ **Phân tích AI**: Gemini Vision API đánh giá tình trạng ảnh chi tiết
- ✅ **Kế hoạch phục chế**: Hướng dẫn từng bước cụ thể để phục chế ảnh
- ✅ **Công cụ khuyến nghị**: Đề xuất phần mềm và công cụ phù hợp
- ✅ **Yêu cầu tùy chỉnh**: Có thể thêm hướng dẫn cụ thể cho AI

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

### Chatbot Tư Vấn Bảo Hiểm

1. **Chọn chức năng "Chatbot Bảo Hiểm"** từ menu header
2. **Thêm kịch bản**:
   - Click button "Thêm kịch bản" hoặc "Đổi kịch bản"
   - Nhập kịch bản trực tiếp vào textarea HOẶC
   - Upload file DOCX từ máy tính
   - Click "Lưu kịch bản"
3. **Chat với khách hàng**:
   - Nhập câu hỏi vào ô chat
   - Press Enter hoặc click "Gửi"
   - Chatbot sẽ trả lời dựa trên kịch bản đã cung cấp

### Phục Chế Ảnh Cũ

1. **Chọn chức năng "Phục Chế Ảnh"** từ menu header
2. **Upload ảnh**:
   - Kéo thả ảnh vào vùng upload HOẶC
   - Click để chọn file từ máy tính
3. **Thêm hướng dẫn** (tùy chọn):
   - Nhập yêu cầu cụ thể: "Làm rõ khuôn mặt", "Khôi phục màu sắc"...
4. **Phục chế**:
   - Click "Phục chế ảnh"
   - Đợi AI phân tích (vài giây)
   - Xem kết quả đánh giá và kế hoạch phục chế chi tiết

## Cấu trúc dự án

```
chatbot-ai/
├── app/
│   ├── api/
│   │   ├── chat/route.ts              # API xử lý chat bảo hiểm
│   │   ├── scripts/route.ts           # API upload/parse kịch bản
│   │   └── photo-restoration/route.ts # API phục chế ảnh
│   ├── components/
│   │   ├── Header.tsx           # Header với menu chọn tính năng
│   │   ├── ScriptSelector.tsx   # Component quản lý kịch bản
│   │   ├── ChatInterface.tsx    # Component giao diện chat
│   │   └── PhotoRestoration.tsx # Component phục chế ảnh
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Trang chủ với feature switching
│   └── globals.css              # Global styles
├── scripts/                     # Kịch bản tư vấn bảo hiểm
├── CURSOR_PROMPT.md            # Hướng dẫn chatbot bảo hiểm
├── PHOTO_RESTORATION_PROMPT.md # Hướng dẫn phục chế ảnh
├── tailwind.config.ts          # Cấu hình Tailwind CSS
├── tsconfig.json               # Cấu hình TypeScript
└── next.config.mjs             # Cấu hình Next.js
```

## Lưu ý

### Chatbot Bảo Hiểm
- Chatbot chỉ trả lời dựa trên thông tin trong kịch bản được cung cấp
- Nếu không có thông tin trong kịch bản, chatbot sẽ đề xuất liên hệ giao dịch viên
- Chatbot hỗ trợ đa ngôn ngữ (tiếng Việt, tiếng Anh, v.v.)
- Chatbot luôn trả lời lịch sự, chuyên nghiệp với đầy đủ chủ ngữ vị ngữ

### Phục Chế Ảnh
- AI chỉ **phân tích và đưa ra kế hoạch**, không thực hiện phục chế tự động
- Người dùng cần sử dụng phần mềm (Photoshop, GIMP...) để phục chế theo hướng dẫn
- Ảnh càng rõ nét, kết quả phân tích càng chính xác
- File ảnh tối đa 10MB

## Prompt Documentation

- **Chatbot Bảo Hiểm**: Xem file `CURSOR_PROMPT.md`
- **Phục Chế Ảnh**: Xem file `PHOTO_RESTORATION_PROMPT.md`

## Phát triển tiếp theo

### Chatbot
- [ ] Lưu lịch sử chat vào database
- [ ] Export chat logs
- [ ] Multi-language support nâng cao

### Photo Restoration
- [ ] Tích hợp API phục chế tự động (Remini, DeepAI)
- [ ] So sánh Before/After
- [ ] Batch processing (nhiều ảnh)
- [ ] Export báo cáo PDF
