# CHATBOT AI CHĂM SÓC KHÁCH HÀNG VBI - PRE-PROMPT

## MỤC ĐÍCH DỰ ÁN
Xây dựng ứng dụng chatbot AI sử dụng Google Gemini để tư vấn khách hàng về các sản phẩm bảo hiểm VBI (Bảo hiểm TNDS xe cơ giới, VBICare, Bảo hiểm du lịch). Chatbot hoạt động dựa trên kịch bản tư vấn được lưu trong file DOCX hoặc TXT.

## YÊU CẦU KỸ THUẬT

### 1. Tech Stack
- **Backend**: Node.js với TypeScript (hoặc Python với FastAPI)
- **AI Engine**: Google Gemini API (gemini-pro hoặc gemini-pro-vision)
- **File Processing**: 
  - DOCX: `mammoth` (Node.js) hoặc `python-docx` (Python)
  - TXT: Native file reading
- **Web Framework**: 
  - Node.js: Express.js hoặc Next.js
  - Python: FastAPI hoặc Flask
- **Database**: (Optional) MongoDB/PostgreSQL để lưu lịch sử chat
- **Frontend**: React.js hoặc Next.js (nếu full-stack)

### 2. Cấu trúc thư mục đề xuất
```
chatbot-ai/
├── src/
│   ├── config/
│   │   └── gemini.config.ts      # Cấu hình Gemini API
│   ├── services/
│   │   ├── scriptParser.service.ts    # Parse kịch bản từ DOCX/TXT
│   │   ├── gemini.service.ts          # Xử lý Gemini API
│   │   └── promptBuilder.service.ts   # Tạo pre-prompt từ kịch bản
│   ├── models/
│   │   └── script.model.ts            # Model cho kịch bản
│   ├── routes/
│   │   └── chat.routes.ts             # API endpoints
│   └── utils/
│       └── fileHandler.util.ts        # Xử lý file upload
├── scripts/
│   └── *.docx hoặc *.txt              # Kịch bản tư vấn
├── .env.example
├── package.json
└── README.md
```

### 3. Chức năng chính

#### 3.1. Parse Kịch bản (Script Parser)
- Đọc file DOCX/TXT từ thư mục `scripts/`
- Trích xuất nội dung:
  - Câu hỏi thường gặp (Q&A)
  - Thông tin sản phẩm (quyền lợi, mức phí)
  - Quy trình tư vấn
  - Các tình huống và cách xử lý
- Chuyển đổi thành format chuẩn (JSON/Markdown)

#### 3.2. Prompt Builder
- Tạo system prompt từ kịch bản đã parse
- Format prompt theo chuẩn Gemini:
  ```
  Bạn là chatbot tư vấn bảo hiểm VBI. 
  Dựa trên kịch bản sau, hãy trả lời câu hỏi của khách hàng:
  
  [Nội dung kịch bản đã parse]
  
  Quy tắc:
  1. Chỉ trả lời dựa trên thông tin trong kịch bản
  2. Nếu không có thông tin, hãy đề xuất liên hệ giao dịch viên
  3. Luôn giữ thái độ chuyên nghiệp, thân thiện
  4. Ưu tiên tư vấn các sản phẩm: Bảo hiểm TNDS xe cơ giới, VBICare, Bảo hiểm du lịch
  ```

#### 3.3. Gemini Service
- Kết nối với Gemini API
- Xử lý conversation context
- Stream response (nếu cần)
- Error handling

#### 3.4. API Endpoints
- `POST /api/chat` - Gửi câu hỏi, nhận phản hồi
- `POST /api/scripts/upload` - Upload kịch bản mới
- `GET /api/scripts` - Lấy danh sách kịch bản
- `GET /api/health` - Health check

### 4. Xử lý kịch bản DOCX/TXT

#### Format kịch bản đề xuất:
```
# KỊCH BẢN TƯ VẤN BẢO HIỂM VBI

## Sản phẩm 1: Bảo hiểm TNDS xe cơ giới
### Câu hỏi thường gặp
Q: Mức phí bảo hiểm TNDS xe máy là bao nhiêu?
A: Mức phí bảo hiểm TNDS xe máy dao động từ 100.000 - 500.000 VNĐ/năm tùy theo loại xe...

### Quyền lợi
- Bồi thường thiệt hại về người
- Bồi thường thiệt hại về tài sản
...

## Sản phẩm 2: Bảo hiểm VBICare
...
```

### 5. Environment Variables
```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-pro
PORT=3000
SCRIPTS_DIR=./scripts
```

### 6. Tính năng bổ sung (nếu cần)
- Lưu lịch sử chat vào database
- Analytics: thống kê câu hỏi thường gặp
- Multi-turn conversation với context
- Upload kịch bản qua web interface
- Export chat logs để phân tích

### 7. Best Practices
- Validate input từ người dùng
- Rate limiting cho API
- Error handling đầy đủ
- Logging cho debugging
- Security: sanitize user input
- Caching kịch bản đã parse để tăng tốc

## BƯỚC TRIỂN KHAI
1. Setup project structure
2. Cấu hình Gemini API
3. Xây dựng script parser cho DOCX/TXT
4. Tạo prompt builder
5. Implement Gemini service
6. Tạo API endpoints
7. Test với kịch bản mẫu
8. Deploy và monitoring

## LƯU Ý
- Chatbot chủ yếu phục vụ chăm sóc khách hàng tại quầy giao dịch
- Ưu tiên tốc độ phản hồi và độ chính xác
- Cần xử lý được tiếng Việt có dấu
- Hỗ trợ đa dạng cách hỏi của khách hàng

