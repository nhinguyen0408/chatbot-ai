import { NextRequest, NextResponse } from "next/server";

/**
 * API phục chế ảnh thực tế sử dụng Replicate AI
 * Model: CodeFormer - chuyên phục chế ảnh khuôn mặt
 * Hoặc GFPGAN - phục chế ảnh chất lượng cao
 */

export async function POST(request: NextRequest) {
  try {
    const { image, model = "codeformer" } = await request.json();

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          error: "Không có ảnh được gửi lên",
        },
        { status: 400 }
      );
    }

    // Option 1: Sử dụng Replicate API
    const replicateApiKey = process.env.REPLICATE_API_TOKEN || 'r8_4Nvy4IKMuwEzqveiqseVfZQ2751m6r74EJbmu';
    
    if (!replicateApiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Cần cấu hình REPLICATE_API_TOKEN để sử dụng tính năng này",
          setupInstructions: {
            step1: "Đăng ký tài khoản tại https://replicate.com",
            step2: "Lấy API token từ https://replicate.com/account/api-tokens",
            step3: "Thêm REPLICATE_API_TOKEN vào file .env.local",
            step4: "Cài đặt: npm install replicate",
          }
        },
        { status: 503 }
      );
    }

    // Gọi Replicate API
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${replicateApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: model === "codeformer" 
          ? "7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56" // CodeFormer
          : "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3", // GFPGAN
        input: {
          image: image, // base64 image
          upscale: 2,
          face_upsample: true,
          background_enhance: true,
          codeformer_fidelity: 0.8,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Lỗi khi gọi Replicate API");
    }

    const prediction = await response.json();

    // Poll cho kết quả (vì Replicate xử lý bất đồng bộ)
    let result = prediction;
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds timeout

    while (
      result.status !== "succeeded" &&
      result.status !== "failed" &&
      attempts < maxAttempts
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const statusResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: {
            "Authorization": `Token ${replicateApiKey}`,
          },
        }
      );

      result = await statusResponse.json();
      attempts++;
    }

    if (result.status === "failed") {
      throw new Error("Quá trình phục chế ảnh thất bại");
    }

    if (result.status !== "succeeded") {
      throw new Error("Timeout: Quá trình xử lý mất quá nhiều thời gian");
    }

    // Trả về URL của ảnh đã phục chế
    return NextResponse.json({
      success: true,
      restoredImageUrl: result.output, // URL của ảnh đã phục chế
      processingTime: `${attempts} seconds`,
    });

  } catch (error: any) {
    console.error("Error restoring image:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Có lỗi xảy ra khi phục chế ảnh. Vui lòng thử lại.",
      },
      { status: 500 }
    );
  }
}

