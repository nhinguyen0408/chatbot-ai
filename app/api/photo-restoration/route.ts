import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const getGeminiModel = () => {
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDMot1pKhD-_jvyiuqDW1EZNsovrFapvY4';
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};

// System prompt for photo restoration
const PHOTO_RESTORATION_PROMPT = `Bạn là một chuyên gia phục chế ảnh cũ với nhiều năm kinh nghiệm. Nhiệm vụ của bạn là phân tích ảnh cũ và đưa ra đánh giá chi tiết về tình trạng của ảnh, cũng như các gợi ý phục chế.

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

Hãy phân tích ảnh một cách chuyên nghiệp, chi tiết và đưa ra lộ trình phục chế khả thi nhất.`;

export async function POST(request: NextRequest) {
  try {
    const { image, instructions } = await request.json();

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          error: "Không có ảnh được gửi lên",
        },
        { status: 400 }
      );
    }

    const model = getGeminiModel();

    // Convert base64 image to the format Gemini expects
    const imagePart = {
      inlineData: {
        data: image.split(",")[1], // Remove data:image/xxx;base64, prefix
        mimeType: image.split(";")[0].split(":")[1], // Extract mime type
      },
    };

    // Combine system prompt with user instructions
    const fullPrompt = instructions
      ? `${PHOTO_RESTORATION_PROMPT}\n\nYÊU CẦU CỤ THỂ TỪ NGƯỜI DÙNG: ${instructions}`
      : PHOTO_RESTORATION_PROMPT;

    // Generate content with image
    const result = await model.generateContent([fullPrompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      analysis: text,
    });
  } catch (error: any) {
    console.error("Error processing image:", error);

    // Handle specific Gemini API errors
    if (error.message?.includes("API key")) {
      return NextResponse.json(
        {
          success: false,
          error: "API key không hợp lệ. Vui lòng kiểm tra cấu hình.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          error.message || "Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại.",
      },
      { status: 500 }
    );
  }
}
