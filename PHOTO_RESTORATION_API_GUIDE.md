# Hướng dẫn Cài đặt API Phục chế Ảnh

## Tổng quan

API hiện tại (`/api/photo-restoration`) chỉ **phân tích và tư vấn** về ảnh sử dụng Gemini AI.

Để **phục chế ảnh thực sự** (trả về file ảnh đã được xử lý), bạn cần tích hợp với các dịch vụ AI chuyên về xử lý ảnh.

---

## Các Giải pháp Khả dụng

### ✅ 1. Replicate API (Khuyến nghị)

**Ưu điểm:**
- Nhiều model mạnh: CodeFormer, GFPGAN, Real-ESRGAN
- API đơn giản, dễ tích hợp
- Free tier: 50 predictions/tháng
- Chất lượng phục chế cao

**Cài đặt:**

```bash
# 1. Cài đặt package
npm install replicate

# 2. Đăng ký tài khoản
# https://replicate.com/

# 3. Lấy API token
# https://replicate.com/account/api-tokens

# 4. Thêm vào .env.local
REPLICATE_API_TOKEN=your_token_here
```

**Models phổ biến:**
- `sczhou/codeformer` - Tốt cho ảnh khuôn mặt
- `tencentarc/gfpgan` - Phục chế ảnh chất lượng cao
- `xinntao/realesrgan` - Tăng độ phân giải

**API đã tạo:** `/api/photo-restoration-process`

---

### ✅ 2. Stability AI (Stable Diffusion)

**Ưu điểm:**
- Mạnh về inpainting (sửa chữa vùng hỏng)
- Có thể tô màu ảnh đen trắng
- API mạnh mẽ

**Cài đặt:**

```bash
# 1. Đăng ký
# https://platform.stability.ai/

# 2. Lấy API key
# https://platform.stability.ai/account/keys

# 3. Thêm vào .env.local
STABILITY_API_KEY=your_key_here
```

**Endpoint:** `https://api.stability.ai/v1/generation/{engine_id}/image-to-image`

---

### ✅ 3. Clipdrop API

**Ưu điểm:**
- Nhiều công cụ: remove background, upscale, cleanup
- API đơn giản
- Giá rẻ

**Cài đặt:**

```bash
# 1. Đăng ký tại https://clipdrop.co/apis
# 2. Thêm API key vào .env.local
CLIPDROP_API_KEY=your_key_here
```

**Endpoints:**
- `/remove-background/v1` - Xóa nền
- `/image-upscaling/v1` - Tăng độ phân giải
- `/cleanup/v1` - Xóa vết xước

---

### ✅ 4. DeepAI

**Ưu điểm:**
- Đơn giản nhất
- Free tier
- Nhiều tools

**Cài đặt:**

```bash
# 1. Đăng ký tại https://deepai.org/
# 2. Lấy API key
DEEPAI_API_KEY=your_key_here
```

**APIs:**
- `https://api.deepai.org/api/torch-srgan` - Super resolution
- `https://api.deepai.org/api/colorizer` - Tô màu ảnh đen trắng
- `https://api.deepai.org/api/image-editor` - Chỉnh sửa ảnh

---

### ✅ 5. Giải pháp Tự host (Open Source)

Nếu muốn tự host và không phụ thuộc API bên thứ 3:

**Models mã nguồn mở:**
- [CodeFormer](https://github.com/sczhou/CodeFormer)
- [GFPGAN](https://github.com/TencentARC/GFPGAN)
- [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN)

**Cách triển khai:**
1. Chạy model trên server riêng (cần GPU)
2. Tạo API endpoint
3. Kết nối từ Next.js app

**Ưu điểm:**
- Không giới hạn requests
- Không phụ thuộc bên thứ 3
- Tùy chỉnh cao

**Nhược điểm:**
- Cần server có GPU
- Chi phí infrastructure cao
- Cần kiến thức DevOps

---

## So sánh Chi phí

| Dịch vụ | Free Tier | Giá trả phí | Khuyến nghị |
|---------|-----------|-------------|-------------|
| Replicate | 50 requests/tháng | $0.0002-0.001/giây | ⭐⭐⭐⭐⭐ |
| Stability AI | 25 credits | $10/1000 credits | ⭐⭐⭐⭐ |
| Clipdrop | 100 requests | $9/tháng | ⭐⭐⭐⭐ |
| DeepAI | 5000 requests/tháng | $5/tháng | ⭐⭐⭐ |
| Self-hosted | ∞ | GPU server cost | ⭐⭐⭐ |

---

## Ví dụ Code - Replicate API

```typescript
// app/api/photo-restoration-process/route.ts
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  const { image } = await request.json();
  
  const output = await replicate.run(
    "sczhou/codeformer:7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
    {
      input: {
        image: image, // base64 hoặc URL
        upscale: 2,
        face_upsample: true,
        background_enhance: true,
        codeformer_fidelity: 0.8,
      }
    }
  );

  return Response.json({
    success: true,
    restoredImage: output, // URL của ảnh đã phục chế
  });
}
```

---

## Cách sử dụng trong Frontend

```typescript
// Gọi API phục chế ảnh
const restoreImage = async (imageBase64: string) => {
  const response = await fetch('/api/photo-restoration-process', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imageBase64 }),
  });
  
  const data = await response.json();
  
  if (data.success) {
    // data.restoredImageUrl - URL của ảnh đã phục chế
    // Hiển thị ảnh cho người dùng
    setRestoredImage(data.restoredImageUrl);
  }
};
```

---

## Workflow Đề xuất

1. **Phân tích ảnh** → `/api/photo-restoration` (Gemini AI)
   - Nhận đánh giá và gợi ý chi tiết
   
2. **Phục chế ảnh** → `/api/photo-restoration-process` (Replicate/Stability)
   - Nhận ảnh đã được xử lý

3. **Hiển thị kết quả**
   - So sánh trước/sau
   - Download ảnh đã phục chế

---

## Lưu ý Quan trọng

⚠️ **Gemini API không thể tạo/chỉnh sửa ảnh**, chỉ có thể:
- Phân tích nội dung ảnh
- Đưa ra mô tả và gợi ý
- Trả lời câu hỏi về ảnh

✅ **Để phục chế ảnh thực sự**, phải dùng:
- Replicate (CodeFormer, GFPGAN)
- Stability AI (Stable Diffusion)
- Clipdrop
- DeepAI
- Hoặc tự host model AI

---

## Khuyến nghị cho Dự án

**Nếu mới bắt đầu:**
1. Dùng Replicate API (đơn giản, free tier tốt)
2. Model: CodeFormer cho ảnh chân dung, GFPGAN cho ảnh tổng quát

**Nếu scale lớn:**
1. Self-host models trên server riêng
2. Kết hợp nhiều models khác nhau
3. Cache kết quả để tiết kiệm chi phí

**Workflow tối ưu:**
```
Upload ảnh → Gemini phân tích → Hiển thị đánh giá → 
User chọn "Phục chế" → Replicate xử lý → Hiển thị kết quả
```

