# 🤖 AI Services Platform

Nền tảng dịch vụ AI đa chức năng tích hợp 2 tính năng chính: **Chatbot tư vấn bảo hiểm theo kịch bản** và **Phục chế ảnh cũ bằng AI**. Sử dụng Google Gemini API và Replicate AI để cung cấp các dịch vụ AI mạnh mẽ và thông minh.

## ✨ Tính năng

### 🤖 Chatbot Tư Vấn Bảo Hiểm Theo Kịch Bản
Chatbot AI thông minh giúp tư vấn sản phẩm bảo hiểm dựa trên kịch bản được định sẵn.

#### Tính năng chính:
- ✅ **Quản lý kịch bản linh hoạt**: Nhập kịch bản bằng text hoặc upload file DOCX
- ✅ **Giao diện chat hiện đại**: Interface thân thiện, responsive, dễ sử dụng
- ✅ **Tích hợp Gemini AI**: Sử dụng Google Gemini Pro để xử lý câu hỏi thông minh
- ✅ **Đa ngôn ngữ**: Hỗ trợ trả lời bằng tiếng Việt, tiếng Anh và nhiều ngôn ngữ khác
- ✅ **Chuyên nghiệp**: AI trả lời lịch sự, đầy đủ chủ ngữ vị ngữ, phù hợp với ngữ cảnh tư vấn
- ✅ **Hiểu ngữ cảnh**: AI hiểu rõ câu hỏi và trả lời chính xác dựa trên kịch bản
- ✅ **Xử lý ngoài kịch bản**: Gợi ý liên hệ chuyên viên khi không có thông tin trong kịch bản

### 🎨 Phục Chế Ảnh Cũ Bằng AI (Image Restoration)
Công cụ AI mạnh mẽ giúp phục chế ảnh cũ, ảnh mờ, ảnh hỏng thành ảnh sắc nét, chất lượng cao.

#### Tính năng chính:
- ✅ **Upload đa dạng**: Kéo thả hoặc click để chọn ảnh (JPG, PNG, GIF, WEBP)
- ✅ **3 Model AI chuyên nghiệp**:
  - **CodeFormer**: Tốt nhất cho ảnh chân dung, khuôn mặt
  - **GFPGAN**: Phục chế ảnh chất lượng cao, đa năng
  - **Real-ESRGAN**: Tăng độ phân giải, ảnh tổng quát
- ✅ **Phục chế thực sự**: Sử dụng Replicate AI để phục chế ảnh tự động (không chỉ phân tích)
- ✅ **Tùy chỉnh nâng cao**: Điều chỉnh upscale, fidelity, face upsample, background enhance
- ✅ **Giao diện hiện đại**: 
  - Chế độ tối/sáng (Dark/Light Mode)
  - Drag & Drop thân thiện
  - So sánh Before/After trực quan
  - Hover effects và animations mượt mà
- ✅ **Tải xuống dễ dàng**: Download ảnh đã phục chế với một click
- ✅ **Xử lý nhanh**: Thời gian phục chế 10-30 giây tùy model

#### 2 Phương thức phục chế:

**1. Phân tích AI (PhotoRestoration)**
- Gemini Vision API đánh giá tình trạng ảnh chi tiết
- Kế hoạch phục chế từng bước cụ thể
- Đề xuất công cụ và phần mềm phù hợp

**2. Phục chế tự động (ImageRestorer)**
- Sử dụng Replicate AI models (CodeFormer, GFPGAN, Real-ESRGAN)
- Phục chế ảnh tự động trong vài giây
- Tải ảnh kết quả trực tiếp

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Engines**: 
  - Google Gemini Pro (Chatbot & Photo Analysis)
  - Replicate AI (Image Restoration Models)
- **File Processing**: Mammoth (đọc file DOCX)
- **Image Processing**: Canvas API, FileReader API

## 🚀 Cài đặt

### 1. Cài đặt Dependencies

```bash
# Clone repository (nếu cần)
git clone <repository-url>
cd chatbot-ai

# Cài đặt packages
npm install

# Cài đặt Replicate cho phục chế ảnh
npm install replicate
```

### 2. Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục gốc với nội dung:

```env
# Google Gemini API (cho Chatbot và Photo Analysis)
GEMINI_API_KEY=your_gemini_api_key_here

# Replicate API (cho Image Restoration)
REPLICATE_API_TOKEN=your_replicate_api_token_here
```

**Lấy API Keys:**
- **Gemini API Key**: [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Replicate API Token**: [Replicate](https://replicate.com) (Free tier: 50 lần/tháng)

### 3. Chạy Ứng Dụng

```bash
# Development mode
npm run dev

# Build cho production
npm run build

# Chạy production server
npm start
```

Ứng dụng sẽ chạy tại: **[http://localhost:3000](http://localhost:3000)**

## 📖 Hướng Dẫn Sử Dụng

### 🤖 Chatbot Tư Vấn Bảo Hiểm

1. **Truy cập trang Chatbot**
   - Chọn "Chatbot Bảo Hiểm" từ menu navigation
   - Hoặc truy cập: `http://localhost:3000`

2. **Cấu hình kịch bản tư vấn**
   - Click nút **"Thêm kịch bản"** hoặc **"Đổi kịch bản"**
   - **Cách 1**: Nhập kịch bản trực tiếp vào textarea
   - **Cách 2**: Upload file DOCX chứa kịch bản
   - Click **"Lưu kịch bản"** để hoàn tất

3. **Bắt đầu tư vấn**
   - Nhập câu hỏi của khách hàng vào ô chat
   - Nhấn **Enter** hoặc click nút **"Gửi"**
   - AI sẽ phân tích và trả lời dựa trên kịch bản đã cung cấp
   - Lịch sử chat được lưu trong session

### 🎨 Phục Chế Ảnh - Phân Tích AI (Photo Restoration)

1. **Truy cập trang Phục Chế Ảnh**
   - Chọn "Phục Chế Ảnh" từ menu navigation
   - Hoặc truy cập: `http://localhost:3000/photo-restoration`

2. **Upload ảnh cần phân tích**
   - Kéo thả ảnh vào vùng upload HOẶC
   - Click để chọn file (JPG, PNG, GIF - max 10MB)

3. **Thêm yêu cầu tùy chỉnh** (tùy chọn)
   - Nhập hướng dẫn cụ thể: "Làm rõ khuôn mặt", "Khôi phục màu sắc gốc"...

4. **Phân tích**
   - Click **"Phục chế ảnh"**
   - Gemini AI sẽ phân tích chi tiết tình trạng ảnh
   - Nhận kế hoạch phục chế từng bước và công cụ khuyến nghị

### 🖼️ Phục Chế Ảnh - Tự Động (Image Restorer)

1. **Truy cập trang Image Restorer**
   - Chọn "Image Restorer" từ menu navigation
   - Hoặc truy cập: `http://localhost:3000/image-restorer`

2. **Chọn Model AI phù hợp**
   - **CodeFormer**: Tốt nhất cho ảnh chân dung/khuôn mặt
   - **GFPGAN**: Phục chế đa năng, chất lượng cao
   - **Real-ESRGAN**: Tăng độ phân giải, ảnh tổng quát

3. **Upload ảnh**
   - **Kéo thả** ảnh vào vùng upload HOẶC
   - **Click** vào vùng upload để chọn file

4. **Phục chế tự động**
   - Click nút **"✨ Phục Chế Ảnh Ngay"**
   - Đợi 10-30 giây để AI xử lý
   - Xem so sánh Before/After
   - Click **"⬇️ Tải Ảnh Đã Phục Chế"** để download

5. **Tùy chỉnh giao diện**
   - Toggle nút **🌙/☀️** để chuyển Dark/Light mode

## 📁 Cấu Trúc Dự Án

```
chatbot-ai/
├── app/
│   ├── api/                                    # API Routes
│   │   ├── chat/route.ts                       # API xử lý chat bảo hiểm
│   │   ├── scripts/route.ts                    # API upload/parse kịch bản
│   │   ├── photo-restoration/route.ts          # API phân tích ảnh (Gemini Vision)
│   │   ├── photo-restoration-process/route.ts  # API xử lý process phục chế
│   │   └── restore-image/route.ts              # API phục chế ảnh tự động (Replicate)
│   │
│   ├── components/                             # React Components
│   │   ├── Header.tsx                          # Navigation header
│   │   ├── ScriptSelector.tsx                  # Quản lý kịch bản tư vấn
│   │   ├── ChatInterface.tsx                   # Giao diện chat
│   │   ├── PhotoRestoration.tsx                # Phân tích ảnh bằng AI
│   │   └── ImageRestorer.tsx                   # Phục chế ảnh tự động (mới)
│   │
│   ├── photo-restoration/                      # Photo Restoration Page
│   │   └── page.tsx                            # Trang phân tích ảnh
│   │
│   ├── image-restorer/                         # Image Restorer Page
│   │   └── page.tsx                            # Trang phục chế ảnh tự động
│   │
│   ├── layout.tsx                              # Root layout
│   ├── page.tsx                                # Trang chủ - Chatbot
│   └── globals.css                             # Global styles
│
├── scripts/                                    # Kịch bản mẫu
├── public/                                     # Static assets
├── .env.local                                  # Environment variables
├── CURSOR_PROMPT.md                            # Prompt cho chatbot
├── PHOTO_RESTORATION_PROMPT.md                 # Prompt cho phân tích ảnh
├── PHOTO_RESTORATION_API_GUIDE.md             # Hướng dẫn Replicate API
├── tailwind.config.ts                          # Tailwind config
├── tsconfig.json                               # TypeScript config
├── next.config.mjs                             # Next.js config
└── package.json                                # Dependencies
```

## ⚠️ Lưu Ý Quan Trọng

### 🤖 Chatbot Bảo Hiểm
- ✅ Chatbot chỉ trả lời dựa trên thông tin trong **kịch bản được cung cấp**
- ✅ Nếu không có thông tin trong kịch bản, chatbot sẽ đề xuất **liên hệ chuyên viên**
- ✅ Hỗ trợ **đa ngôn ngữ** (tiếng Việt, tiếng Anh, v.v.)
- ✅ Chatbot luôn trả lời **lịch sự, chuyên nghiệp** với đầy đủ chủ ngữ vị ngữ
- ⚠️ Cần cấu hình **GEMINI_API_KEY** trong `.env.local`

### 🎨 Phục Chế Ảnh - Phân Tích (Photo Restoration)
- ✅ Gemini Vision API **phân tích chi tiết** tình trạng ảnh
- ✅ Đưa ra **kế hoạch phục chế từng bước** cụ thể
- ✅ Đề xuất **công cụ và phần mềm** phù hợp
- ⚠️ Người dùng cần tự phục chế theo hướng dẫn bằng Photoshop, GIMP...
- ⚠️ File ảnh tối đa **10MB**

### 🖼️ Phục Chế Ảnh - Tự Động (Image Restorer)
- ✅ Sử dụng **Replicate AI** để phục chế ảnh thực sự
- ✅ Hỗ trợ 3 model: **CodeFormer**, **GFPGAN**, **Real-ESRGAN**
- ✅ Kết quả ảnh **chất lượng cao**, có thể tải xuống ngay
- ⚠️ Cần cấu hình **REPLICATE_API_TOKEN** trong `.env.local`
- ⚠️ Free tier: **50 lần phục chế/tháng**
- ⚠️ Thời gian xử lý: **10-30 giây** tùy model và kích thước ảnh
- ⚠️ Cần cài đặt package: `npm install replicate`

### 🔑 API Keys Required
| Service | API Key | Free Tier | Đăng ký |
|---------|---------|-----------|---------|
| **Google Gemini** | GEMINI_API_KEY | Unlimited (có giới hạn rate) | [Google AI Studio](https://makersuite.google.com/app/apikey) |
| **Replicate** | REPLICATE_API_TOKEN | 50 lần/tháng | [Replicate.com](https://replicate.com) |

## 📚 Tài Liệu Tham Khảo

- **Chatbot Prompt**: [`CURSOR_PROMPT.md`](./CURSOR_PROMPT.md)
- **Photo Analysis Prompt**: [`PHOTO_RESTORATION_PROMPT.md`](./PHOTO_RESTORATION_PROMPT.md)
- **Replicate API Guide**: [`PHOTO_RESTORATION_API_GUIDE.md`](./PHOTO_RESTORATION_API_GUIDE.md)

## 🚧 Roadmap & Phát Triển Tiếp Theo

### Chatbot
- [ ] 💾 Lưu lịch sử chat vào database (PostgreSQL/MongoDB)
- [ ] 📤 Export chat logs ra file (JSON, CSV, PDF)
- [ ] 🌐 Multi-language support nâng cao (tự động detect ngôn ngữ)
- [ ] 📊 Dashboard thống kê số lượng chat, câu hỏi phổ biến
- [ ] 🔄 Cập nhật kịch bản realtime không cần refresh

### Photo Restoration
- [x] ✅ Tích hợp API phục chế tự động (Replicate AI)
- [x] ✅ So sánh Before/After trực quan
- [x] ✅ Giao diện hiện đại với Dark Mode
- [ ] 📦 Batch processing (upload và phục chế nhiều ảnh cùng lúc)
- [ ] 📄 Export báo cáo phân tích ra PDF
- [ ] 🎨 Thêm filters và effects sau khi phục chế
- [ ] 💾 Lưu lịch sử ảnh đã phục chế
- [ ] 🔄 Undo/Redo cho quá trình phục chế

### General
- [ ] 🔐 Authentication & User Management
- [ ] 💳 Payment integration (cho premium features)
- [ ] 📱 Mobile app (React Native)
- [ ] 🌍 Deployment (Vercel, AWS, Azure)

## 🤝 Đóng Góp

Mọi đóng góp đều được chào đón! Vui lòng:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

MIT License - Xem file `LICENSE` để biết thêm chi tiết.

## 📧 Liên Hệ

- **Email**: your-email@example.com
- **GitHub**: [github.com/your-username](https://github.com/your-username)

---

Made with ❤️ using Next.js, Gemini AI & Replicate AI
