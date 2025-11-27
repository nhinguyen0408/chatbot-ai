# Cấu hình Environment Variables

## File .env.local

Tạo file `.env.local` trong thư mục root và thêm các biến sau:

```env
# Gemini API (dùng cho chatbot và phân tích ảnh)
GEMINI_API_KEY=your_gemini_api_key_here

# Replicate API (dùng cho phục chế ảnh thực tế)
# Đăng ký tại: https://replicate.com
# Lấy token tại: https://replicate.com/account/api-tokens
REPLICATE_API_TOKEN=your_replicate_api_token_here
```

## Cài đặt Package cho Phục chế Ảnh

```bash
# Cài đặt Replicate SDK
npm install replicate

# Restart development server
npm run dev
```

## Hướng dẫn lấy API Keys

### 1. Gemini API Key (Đã có)
- Đã được cấu hình trong code
- Hoặc đăng ký mới tại: https://makersuite.google.com/app/apikey

### 2. Replicate API Token (Cần thiết cho phục chế ảnh)
1. Truy cập: https://replicate.com
2. Đăng ký tài khoản (miễn phí)
3. Vào Account Settings: https://replicate.com/account/api-tokens
4. Tạo API token mới
5. Copy token và thêm vào `.env.local`

## Free Tier của Replicate

- **50 predictions miễn phí/tháng**
- Đủ để test và demo
- Sau đó chỉ mất ~$0.0002-0.001/giây xử lý

## Kiểm tra Setup

Sau khi cấu hình xong, test API:

```bash
# Test API info
curl http://localhost:3000/api/restore-image

# Nếu thấy setup guide → chưa config đúng
# Nếu thấy API info → đã config thành công
```

## Troubleshooting

### Lỗi: "Chưa cấu hình REPLICATE_API_TOKEN"
→ Chưa tạo file `.env.local` hoặc chưa thêm token

### Lỗi: "Cannot find module 'replicate'"
→ Chạy: `npm install replicate`

### Lỗi: "API token không hợp lệ"
→ Token bị sai, lấy lại token mới

### Lỗi: "Cannot read environment variables"
→ Restart dev server: Ctrl+C, sau đó `npm run dev`

