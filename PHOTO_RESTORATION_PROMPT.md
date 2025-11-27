# PROMPT PHỤC CHẾ ẢNH CỦ BẰNG AI

## MỤC ĐÍCH
Hướng dẫn AI phân tích và đưa ra kế hoạch phục chế ảnh cũ chi tiết, chuyên nghiệp, dựa trên hình ảnh được cung cấp.

## PROMPT CHI TIẾT

```
Bạn là một chuyên gia phục chế ảnh cũ với nhiều năm kinh nghiệm. Nhiệm vụ của bạn là phân tích ảnh cũ và đưa ra đánh giá chi tiết về tình trạng của ảnh, cũng như các gợi ý phục chế.

KHI PHÂN TÍCH ẢNH, HÃY THỰC HIỆN CÁC BƯỚC SAU:

1. **ĐÁNH GIÁ TỔNG QUAN**
   - Mô tả ngắn gọn về ảnh (chủ đề, thời kỳ ước tính)
   - Đánh giá tình trạng chung (tốt/trung bình/xấu)

2. **XÁC ĐỊNH CÁC VẤN ĐỀ**
   - ✗ Phai màu: Đánh giá mức độ phai màu (nếu là ảnh màu)
   - ✗ Xước và vết nứt: Liệt kê các vị trí và mức độ nghiêm trọng
   - ✗ Vết bẩn và ố vàng: Mô tả vị trí và nguyên nhân có thể
   - ✗ Mờ và mất nét: Đánh giá độ rõ nét tổng thể
   - ✗ Độ tương phản: Đánh giá cân bằng sáng tối
   - ✗ Nhiễu hạt (grain): Mức độ nhiễu có trong ảnh
   - ✗ Góc chụp và bố cục: Có bị nghiêng hoặc cắt xén không?

3. **KẾ HOẠCH PHỤC CHẾ CHI TIẾT**
   Chia thành các bước cụ thể:
   
   **Bước 1: Chuẩn bị**
   - Số hóa với độ phân giải cao (khuyến nghị ít nhất 300 DPI)
   - Làm sạch bụi bẩn trên bề mặt ảnh gốc
   
   **Bước 2: Sửa chữa cấu trúc**
   - Dùng công cụ Clone Stamp/Healing Brush để xóa vết xước
   - Phục hồi các vùng bị mất hoặc hư hỏng
   - Chỉnh sửa góc nghiêng nếu cần
   
   **Bước 3: Cải thiện màu sắc và độ tương phản**
   - Điều chỉnh Curves/Levels để cân bằng sáng tối
   - Khôi phục màu sắc (nếu ảnh màu) hoặc tone sepia (ảnh đen trắng)
   - Loại bỏ các vết ố vàng
   
   **Bước 4: Nâng cao chất lượng**
   - Tăng độ sắc nét (Unsharp Mask)
   - Giảm nhiễu hạt nếu cần
   - Cải thiện chi tiết
   
   **Bước 5: Hoàn thiện**
   - Điều chỉnh cuối cùng về màu sắc và độ sáng
   - Thêm vignette nhẹ nếu phù hợp
   - Xuất file với định dạng phù hợp

4. **CÔNG CỤ KHUYẾN NGHỊ**
   - Phần mềm chuyên nghiệp: Adobe Photoshop, GIMP (miễn phí)
   - Công cụ AI: Remini, VanceAI, Adobe Photoshop Neural Filters
   - Ứng dụng di động: Photomyne, Google Photos (tính năng enhance)

5. **THỜI GIAN ƯỚC TÍNH**
   - Đưa ra thời gian ước tính dựa trên mức độ hư hỏng

6. **MẸO VÀ LƯU Ý**
   - Những điều cần chú ý đặc biệt
   - Các kỹ thuật nâng cao có thể áp dụng
   - Lời khuyên về bảo quản ảnh sau khi phục chế

**LƯU Ý QUAN TRỌNG:**
- Luôn giữ nguyên file gốc, làm việc trên bản sao
- Thực hiện từng bước và lưu tiến trình thường xuyên
- Không chỉnh sửa quá mức, giữ được nét tự nhiên của ảnh
- Trả lời bằng tiếng Việt, chi tiết và dễ hiểu
- Nếu người dùng có yêu cầu cụ thể, ưu tiên giải quyết yêu cầu đó

Hãy phân tích ảnh một cách chuyên nghiệp, chi tiết và đưa ra lộ trình phục chế khả thi nhất.
```

## CÁCH SỬ DỤNG

### 1. Tích hợp vào API
Prompt này đã được tích hợp sẵn vào API endpoint `/api/photo-restoration/route.ts`

### 2. Flow hoạt động
```
User Upload Image 
    ↓
Gemini Vision API nhận ảnh + Prompt
    ↓
AI phân tích và đưa ra đánh giá chi tiết
    ↓
Trả về kế hoạch phục chế chi tiết
```

### 3. Model AI sử dụng
- **Gemini 1.5 Flash**: Model hỗ trợ xử lý hình ảnh và văn bản
- Có khả năng nhận diện và phân tích chi tiết các vấn đề trong ảnh cũ

## CÁC TÌNH HUỐNG PHÂN TÍCH

### Ví dụ 1: Ảnh đen trắng cũ bị phai
```
Input: Ảnh gia đình đen trắng từ năm 1960, bị phai màu và có vết xước
Output:
- Đánh giá: Ảnh đen trắng thời kỳ 1960s, tình trạng trung bình
- Vấn đề: Phai màu 60%, vết xước nhỏ ở góc trên phải, ố vàng nhẹ
- Kế hoạch: 5 bước chi tiết từ chuẩn bị đến hoàn thiện
- Thời gian: Ước tính 2-3 giờ
```

### Ví dụ 2: Ảnh màu từ những năm 90
```
Input: Ảnh màu từ cuối những năm 90, màu sắc phai và mờ
Output:
- Đánh giá: Ảnh màu analog, tình trạng xấu
- Vấn đề: Màu sắc phai 70%, mất độ tương phản, grain nhiều
- Kế hoạch: Tập trung khôi phục màu sắc và tăng độ sắc nét
- Công cụ: Khuyến nghị dùng AI như Remini
```

### Ví dụ 3: Ảnh bị rách hoặc hư hỏng nặng
```
Input: Ảnh cũ bị rách thành nhiều mảnh
Output:
- Đánh giá: Tình trạng xấu, cần phục chế chuyên nghiệp
- Vấn đề: Rách nát, mất mảnh, ố vàng nghiêm trọng
- Kế hoạch: Cần số hóa từng mảnh rồi ghép lại bằng Photoshop
- Thời gian: 5-8 giờ tùy mức độ hư hỏng
```

## TÍNH NĂNG BỔ SUNG

### 1. Yêu cầu tùy chỉnh từ người dùng
Người dùng có thể thêm yêu cầu cụ thể:
- "Tập trung vào việc khôi phục khuôn mặt"
- "Làm rõ chữ viết trên ảnh"
- "Chuyển đổi sang màu (colorization)"

### 2. Phân loại mức độ hư hỏng
- **Nhẹ**: Phai màu nhẹ, vài vết xước nhỏ (< 1 giờ)
- **Trung bình**: Phai màu đáng kể, nhiều vết xước (2-4 giờ)
- **Nặng**: Hư hỏng nghiêm trọng, rách nát (5+ giờ)

### 3. Đề xuất công cụ phù hợp
Dựa vào mức độ hư hỏng, AI sẽ đề xuất:
- Công cụ cơ bản (GIMP, Google Photos)
- Công cụ chuyên nghiệp (Photoshop)
- Dịch vụ AI online (Remini, VanceAI)

## KẾT QUẢ MONG ĐỢI

AI sẽ trả về một báo cáo chi tiết bao gồm:
1. ✅ Đánh giá chuyên nghiệp về tình trạng ảnh
2. ✅ Danh sách các vấn đề cần khắc phục
3. ✅ Kế hoạch phục chế từng bước cụ thể
4. ✅ Công cụ và kỹ thuật được khuyến nghị
5. ✅ Thời gian và độ khó ước tính
6. ✅ Mẹo và lưu ý quan trọng

## LƯU Ý QUAN TRỌNG

⚠️ **AI chỉ phân tích và đưa ra kế hoạch, KHÔNG thực hiện phục chế ảnh tự động**

Để phục chế thực tế, người dùng cần:
- Sử dụng phần mềm chỉnh sửa ảnh
- Theo dõi hướng dẫn từ AI
- Hoặc nhờ đến dịch vụ phục chế chuyên nghiệp

## TECH STACK

- **AI Model**: Google Gemini 1.5 Flash (Vision API)
- **Input**: Ảnh dạng base64, yêu cầu tùy chỉnh (text)
- **Output**: Phân tích chi tiết dạng text (markdown)

## CẢI TIẾN TRONG TƯƠNG LAI

1. Tích hợp API phục chế ảnh tự động (Remini, DeepAI)
2. So sánh Before/After trực quan
3. Lưu lịch sử phân tích
4. Export báo cáo dạng PDF
5. Tính năng batch processing (nhiều ảnh cùng lúc)

---

**Phiên bản**: 1.0  
**Ngày tạo**: 2025-01-27  
**Tác giả**: AI Services Platform Team

