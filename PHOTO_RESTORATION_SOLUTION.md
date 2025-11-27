# Giải Pháp Phục Chế Ảnh - Tổng Kết

## 🎯 Vấn Đề

Bạn muốn API `/api/photo-restoration` trả về **ảnh đã được phục chế** thay vì chỉ phân tích văn bản.

## ⚠️ Thực Trạng

**Gemini AI không thể tạo hoặc chỉnh sửa ảnh**, chỉ có thể:
- ✅ Phân tích nội dung ảnh
- ✅ Mô tả chi tiết về ảnh
- ✅ Đưa ra gợi ý phục chế
- ❌ **KHÔNG THỂ** tạo ảnh mới
- ❌ **KHÔNG THỂ** chỉnh sửa ảnh

## ✅ Giải Pháp

Để phục chế ảnh thực sự, cần sử dụng **AI models chuyên về xử lý ảnh**.

---

## 📁 Files Đã Tạo

### 1. `/app/api/restore-image/route.ts` ⭐ (API chính)
**Mục đích:** API phục chế ảnh thực tế sử dụng Replicate AI

**Tính năng:**
- ✅ Phục chế ảnh thực sự (trả về file ảnh)
- ✅ Hỗ trợ 3 models: CodeFormer, GFPGAN, Real-ESRGAN
- ✅ Tự động xử lý và trả về URL ảnh đã phục chế
- ✅ Xử lý lỗi chi tiết, hướng dẫn setup

**Cách dùng:**
```typescript
// POST /api/restore-image
{
  "image": "data:image/jpeg;base64,...",
  "options": {
    "modelType": "codeformer", // hoặc "gfpgan", "realesrgan"
    "upscale": 2,
    "fidelity": 0.8
  }
}

// Response
{
  "success": true,
  "restoredImageUrl": "https://replicate.delivery/...",
  "model": "codeformer"
}
```

### 2. `/app/components/ImageRestorer.tsx` (UI Component)
**Mục đích:** Component React để sử dụng API phục chế ảnh

**Tính năng:**
- Upload ảnh
- Chọn model AI
- Hiển thị so sánh trước/sau
- Download ảnh đã phục chế
- Xử lý lỗi và hướng dẫn setup

**Cách dùng:**
```tsx
import ImageRestorer from "@/app/components/ImageRestorer";

export default function Page() {
  return <ImageRestorer />;
}
```

### 3. `/app/api/photo-restoration-process/route.ts` (API phụ)
**Mục đích:** Ví dụ implementation chi tiết hơn

### 4. `PHOTO_RESTORATION_API_GUIDE.md` 📖
**Mục đích:** Hướng dẫn chi tiết về các API có sẵn

**Nội dung:**
- So sánh các dịch vụ (Replicate, Stability AI, Clipdrop, DeepAI)
- Bảng giá và free tier
- Ví dụ code
- Hướng dẫn tích hợp

### 5. `ENV_SETUP.md` 📖
**Mục đích:** Hướng dẫn cấu hình môi trường

---

## 🚀 Cách Sử Dụng

### Bước 1: Cài đặt Package

```bash
npm install replicate
```

### Bước 2: Lấy API Token

1. Đăng ký tại: https://replicate.com
2. Vào Account Settings: https://replicate.com/account/api-tokens
3. Tạo và copy token

### Bước 3: Cấu hình Environment

Tạo file `.env.local`:

```env
GEMINI_API_KEY=AIzaSy... (đã có)
REPLICATE_API_TOKEN=r8_... (mới thêm)
```

### Bước 4: Restart Server

```bash
# Dừng server
Ctrl + C

# Start lại
npm run dev
```

### Bước 5: Sử dụng

```typescript
// Frontend code
const response = await fetch('/api/restore-image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    image: imageBase64, // base64 string
    options: {
      modelType: 'codeformer',
      upscale: 2
    }
  })
});

const data = await response.json();
// data.restoredImageUrl - URL của ảnh đã phục chế
```

---

## 📊 So Sánh 2 APIs

| Tính năng | `/api/photo-restoration` (Gemini) | `/api/restore-image` (Replicate) |
|-----------|-----------------------------------|----------------------------------|
| **Phân tích ảnh** | ✅ Rất tốt | ❌ Không có |
| **Tư vấn phục chế** | ✅ Chi tiết | ❌ Không có |
| **Phục chế ảnh thực tế** | ❌ Không thể | ✅ Có |
| **Trả về** | Text (phân tích) | Image URL |
| **Chi phí** | Free (Gemini) | $0.0002-0.001/giây |
| **Setup** | Đã có | Cần thêm token |

---

## 🎨 Workflow Đề Xuất

### Workflow 1: Chỉ Phân Tích (hiện tại)
```
User upload ảnh 
  → API: /api/photo-restoration (Gemini)
  → Nhận: Phân tích chi tiết, gợi ý phục chế
  → User tự phục chế bằng Photoshop
```

### Workflow 2: Phục Chế Tự Động (mới)
```
User upload ảnh 
  → API: /api/restore-image (Replicate)
  → Nhận: Ảnh đã được phục chế tự động
  → User download ảnh
```

### Workflow 3: Kết Hợp (tối ưu nhất) ⭐
```
User upload ảnh 
  → Step 1: API /api/photo-restoration (Gemini)
      → Hiển thị: Phân tích chi tiết về tình trạng ảnh
  
  → Step 2: User click "Phục Chế Tự Động"
      → API: /api/restore-image (Replicate)
      → Hiển thị: Ảnh trước/sau, cho phép download
```

---

## 💰 Chi Phí

### Replicate Pricing
- **Free Tier:** 50 predictions/tháng (đủ để test)
- **Paid:** ~$0.0002-0.001/giây
- **Ước tính:** ~$0.01-0.05/ảnh (10-30 giây xử lý)

### Ví dụ chi phí thực tế
- 50 ảnh đầu: **FREE**
- 100 ảnh/tháng: ~$2-5
- 1000 ảnh/tháng: ~$20-50

---

## 🔥 Models Khuyến Nghị

### 1. CodeFormer (Default)
- ✅ **Tốt nhất cho:** Ảnh chân dung, khuôn mặt
- ✅ Xử lý tốt: Ảnh cũ, mờ, hỏng
- ⚡ Tốc độ: Trung bình (15-25 giây)

### 2. GFPGAN
- ✅ **Tốt nhất cho:** Ảnh đa năng, chất lượng cao
- ✅ Xử lý tốt: Nhiều loại ảnh khác nhau
- ⚡ Tốc độ: Nhanh (10-20 giây)

### 3. Real-ESRGAN
- ✅ **Tốt nhất cho:** Tăng độ phân giải
- ✅ Xử lý tốt: Ảnh phong cảnh, tổng quát
- ⚡ Tốc độ: Chậm (20-40 giây)

---

## 🐛 Troubleshooting

### Lỗi: "Chưa cấu hình REPLICATE_API_TOKEN"
**Nguyên nhân:** Chưa thêm token vào `.env.local`

**Giải pháp:**
1. Tạo file `.env.local`
2. Thêm: `REPLICATE_API_TOKEN=your_token`
3. Restart server

### Lỗi: "Cannot find module 'replicate'"
**Nguyên nhân:** Chưa cài package

**Giải pháp:**
```bash
npm install replicate
```

### Lỗi: "API token không hợp lệ"
**Nguyên nhân:** Token sai hoặc hết hạn

**Giải pháp:**
1. Vào https://replicate.com/account/api-tokens
2. Tạo token mới
3. Update `.env.local`
4. Restart server

### Lỗi: Processing quá lâu
**Nguyên nhân:** Model đang xử lý ảnh lớn

**Giải pháp:**
- Resize ảnh nhỏ hơn trước khi upload
- Chọn model nhanh hơn (GFPGAN)
- Tăng timeout trong code

---

## 📚 Tài Liệu Tham Khảo

- **Replicate Docs:** https://replicate.com/docs
- **CodeFormer Model:** https://replicate.com/sczhou/codeformer
- **GFPGAN Model:** https://replicate.com/tencentarc/gfpgan
- **Real-ESRGAN Model:** https://replicate.com/nightmareai/real-esrgan

---

## 🎯 Kết Luận

### API hiện tại (`/api/photo-restoration`)
- ✅ Giữ nguyên, vẫn hữu ích cho phân tích
- ✅ Sử dụng Gemini AI (free, mạnh về phân tích)
- ℹ️ Không thể trả về ảnh đã phục chế

### API mới (`/api/restore-image`)
- ✅ Phục chế ảnh thực tế
- ✅ Trả về file ảnh đã xử lý
- ✅ Sử dụng Replicate AI (có phí nhưng free tier tốt)
- ⚠️ Cần cấu hình thêm REPLICATE_API_TOKEN

### Khuyến nghị
**Sử dụng cả 2 APIs để có trải nghiệm tốt nhất:**
1. Dùng Gemini phân tích → Hiểu rõ vấn đề
2. Dùng Replicate phục chế → Nhận kết quả thực tế

---

## 📞 Support

Nếu cần hỗ trợ:
1. Đọc file này
2. Xem `PHOTO_RESTORATION_API_GUIDE.md`
3. Xem `ENV_SETUP.md`
4. Check console logs
5. Test endpoint: `GET /api/restore-image`

