import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";

// Initialize Gemini
const getGeminiModel = () => {
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDMot1pKhD-_jvyiuqDW1EZNsovrFapvY4';
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};

export async function POST(request: NextRequest) {
  try {
    const { message, script, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const model = getGeminiModel();

    // Build system instruction with script
    let systemInstruction = `Bạn là một chatbot AI chuyên nghiệp tư vấn bảo hiểm VBI. 

Yêu cầu khi trả lời:
1. Luôn trả lời một cách lịch sự, chuyên nghiệp và thân thiện, ngắn gọn, xúc tích các thông tin.
2. Luôn sử dụng đầy đủ chủ ngữ và vị ngữ trong câu trả lời
3. Có thể trả lời bằng nhiều thứ tiếng tùy theo ngôn ngữ khách hàng sử dụng (tiếng Việt, tiếng Anh, v.v.)
4. Chỉ trả lời dựa trên thông tin trong kịch bản được cung cấp
5. Nếu không có thông tin trong kịch bản, hãy đề xuất liên hệ với giao dịch viên
6. Ưu tiên tư vấn các sản phẩm: có trong kịch bản

`;

    if (script && script.trim()) {
      systemInstruction += `\nKịch bản tư vấn:\n${script}\n\n`;
    }

    systemInstruction += `\nDựa trên kịch bản trên, hãy trả lời câu hỏi của khách hàng một cách chi tiết và chuyên nghiệp.`;

    // Build conversation history
    const chatHistory = conversationHistory || [];
    const history = chatHistory.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })
    );

    // Start chat session with history and system instruction
    const chat = model.startChat({
      history: history,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      } as unknown as Part,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    // Send message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      message: text,
      success: true,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to process chat message",
        success: false,
      },
      { status: 500 }
    );
  }
}
