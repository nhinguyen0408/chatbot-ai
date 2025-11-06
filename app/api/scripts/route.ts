import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const textScript = formData.get('textScript') as string;

    let scriptContent = '';

    if (file && file.name) {
      // Handle DOCX file
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const result = await mammoth.extractRawText({ buffer });
      scriptContent = result.value;
    } else if (textScript) {
      // Handle text input
      scriptContent = textScript;
    } else {
      return NextResponse.json(
        { error: 'Either file or textScript is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      script: scriptContent,
      success: true 
    });

  } catch (error: any) {
    console.error('Script upload error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to process script',
        success: false 
      },
      { status: 500 }
    );
  }
}

