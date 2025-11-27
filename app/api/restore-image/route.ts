import { NextRequest, NextResponse } from "next/server";

/**
 * API phục chế ảnh thực tế - phiên bản đơn giản với Replicate
 * Cài đặt: npm install replicate
 * Config: Thêm REPLICATE_API_TOKEN vào .env.local
 */

export async function POST(request: NextRequest) {
  try {
    const { image, options } = await request.json();

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Không có ảnh được gửi lên" },
        { status: 400 }
      );
    }

    // Kiểm tra API key
    // CẢNH BÁO: Không nên hardcode API token trong code
    // Nên dùng environment variable: REPLICATE_API_TOKEN trong .env.local
    const apiToken = process.env.REPLICATE_API_TOKEN || 'r8_MMLdpVjJ2MUe6KpL6FPiLBRSey90GOn2i6aCP';
    if (!apiToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Chưa cấu hình REPLICATE_API_TOKEN",
          setupGuide: {
            step1: "Đăng ký tại https://replicate.com",
            step2: "Lấy token tại https://replicate.com/account/api-tokens",
            step3: "Thêm REPLICATE_API_TOKEN=your_token vào .env.local",
            step4: "Cài đặt: npm install replicate",
            step5: "Restart dev server: npm run dev",
          },
        },
        { status: 503 }
      );
    }

    // Import động module Replicate (chỉ khi cần)
    let Replicate;
    try {
      const replicateModule = await import("replicate");
      Replicate = replicateModule.default;
    } catch (err: any) {
      console.error("Failed to import replicate module:", err);
      return NextResponse.json(
        {
          success: false,
          error: "Module 'replicate' chưa được cài đặt. Vui lòng chạy: npm install replicate",
          details: err.message,
        },
        { status: 500 }
      );
    }

    // Khởi tạo Replicate client
    const replicate = new Replicate({ auth: apiToken });

    // Chọn model phù hợp
    const modelType = options?.modelType || "codeformer";
    
    let model: string;
    let input: any;
    
    if (modelType === "codeformer") {
      // CodeFormer - Tốt cho ảnh khuôn mặt/chân dung
      model = "sczhou/codeformer:7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56";
      input = {
        image: image,
        upscale: options?.upscale || 2,
        face_upsample: options?.faceUpsample !== false,
        background_enhance: options?.backgroundEnhance !== false,
        codeformer_fidelity: options?.fidelity || 0.8,
      };
    } else if (modelType === "gfpgan") {
      // GFPGAN - Phục chế ảnh chất lượng cao
      model = "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3";
      input = {
        img: image,
        version: "v1.4",
        scale: options?.scale || 2,
      };
    } else if (modelType === "realesrgan") {
      // Real-ESRGAN - Tăng độ phân giải, phục chế ảnh tổng quát
      model = "nightmareai/real-esrgan:42fe626e41cc811eaf02c8b5a169038f1fb03f3cdcd7d4a2e75a2b19e29ce0c7";
      input = {
        image: image,
        scale: options?.scale || 2,
        face_enhance: options?.faceEnhance !== false,
      };
    } else {
      return NextResponse.json(
        {
          success: false,
          error: `Model không hợp lệ: ${modelType}`,
          availableModels: ["codeformer", "gfpgan", "realesrgan"],
        },
        { status: 400 }
      );
    }

    // Tạo prediction và đợi kết quả
    console.log("Creating prediction with model:", model);
    const prediction = await replicate.predictions.create({
      version: model.split(":")[1],
      input: input,
    });

    console.log("Prediction created:", prediction.id);
    console.log("Waiting for prediction to complete...");

    // Đợi cho prediction hoàn thành
    const finalPrediction = await replicate.wait(prediction);
    console.log("Prediction completed, status:", finalPrediction.status);
    console.log("Output:", finalPrediction.output);

    const output = finalPrediction.output;
    console.log("Output:", JSON.stringify(output));

    // Xử lý output dựa trên định dạng
    let restoredImageUrl;
    
    if (Array.isArray(output)) {
      restoredImageUrl = output[0];
    } else if (typeof output === 'string') {
      restoredImageUrl = output;
    } else if (output && typeof output === 'object') {
      if (output.output) {
        restoredImageUrl = Array.isArray(output.output) ? output.output[0] : output.output;
      } else if (output.url) {
        restoredImageUrl = output.url;
      } else if (output.image) {
        restoredImageUrl = output.image;
      } else if (output.result) {
        restoredImageUrl = Array.isArray(output.result) ? output.result[0] : output.result;
      } else {
        const firstKey = Object.keys(output)[0];
        restoredImageUrl = output[firstKey];
      }
    } else {
      restoredImageUrl = output;
    }

    if (!restoredImageUrl) {
      return NextResponse.json({
        success: false,
        error: "Không thể lấy URL ảnh từ output",
        debug: {
          outputType: typeof output,
          isArray: Array.isArray(output),
          outputKeys: output && typeof output === 'object' ? Object.keys(output) : null,
          rawOutput: output,
        }
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      restoredImageUrl: restoredImageUrl,
      model: modelType,
      options: options || {},
    });
    
  } catch (error: any) {
    console.error("Error restoring image:", error);

    // Xử lý lỗi cụ thể
    if (error.message?.includes("401")) {
      return NextResponse.json(
        {
          success: false,
          error: "API token không hợp lệ. Vui lòng kiểm tra REPLICATE_API_TOKEN",
        },
        { status: 401 }
      );
    }

    if (error.message?.includes("Cannot find module 'replicate'")) {
      return NextResponse.json(
        {
          success: false,
          error: "Chưa cài đặt package replicate. Chạy: npm install replicate",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Có lỗi xảy ra khi phục chế ảnh",
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint - Hiển thị thông tin về API
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/restore-image",
    description: "API phục chế ảnh sử dụng Replicate AI",
    method: "POST",
    requiredEnv: "REPLICATE_API_TOKEN",
    body: {
      image: "base64 string hoặc URL của ảnh",
      options: {
        modelType: "codeformer | gfpgan | realesrgan (mặc định: codeformer)",
        upscale: "2-4 (mặc định: 2)",
        faceUpsample: "true/false (mặc định: true)",
        backgroundEnhance: "true/false (mặc định: true)",
        fidelity: "0-1 (mặc định: 0.8)",
      },
    },
    example: {
      image: "data:image/jpeg;base64,...",
      options: {
        modelType: "codeformer",
        upscale: 2,
        fidelity: 0.8,
      },
    },
    models: {
      codeformer: "Tốt nhất cho ảnh khuôn mặt và chân dung",
      gfpgan: "Phục chế ảnh chất lượng cao, đa năng",
      realesrgan: "Tăng độ phân giải, phục chế ảnh tổng quát",
    },
    setup: {
      step1: "Đăng ký tại https://replicate.com",
      step2: "Lấy API token",
      step3: "npm install replicate",
      step4: "Thêm REPLICATE_API_TOKEN vào .env.local",
      step5: "npm run dev",
    },
  });
}

