# Chatbot AI VBI

Ứng dụng chatbot AI sử dụng Google Gemini để tư vấn khách hàng về các sản phẩm bảo hiểm VBI.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Engine**: Google Gemini API

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Chạy production server
npm start
```

Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000)

## Cấu trúc dự án

```
chatbot-ai/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Trang chủ
│   └── globals.css        # Global styles với Tailwind
├── components/             # React components
├── lib/                    # Utilities và helpers
├── public/                 # Static files
├── scripts/                # Kịch bản tư vấn (DOCX/TXT)
├── tailwind.config.ts      # Cấu hình Tailwind CSS
├── tsconfig.json           # Cấu hình TypeScript
└── next.config.mjs         # Cấu hình Next.js
```

## Environment Variables

Tạo file `.env.local` với các biến sau:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-pro
PORT=3000
SCRIPTS_DIR=./scripts
```

## Phát triển tiếp theo

Xem file `CURSOR_PROMPT.md` để biết chi tiết về yêu cầu và cấu trúc dự án.
