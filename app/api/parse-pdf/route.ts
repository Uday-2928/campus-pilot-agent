import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save buffer to a temp file
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `upload-${Date.now()}.pdf`);
    fs.writeFileSync(tempFilePath, buffer);

    // Execute the raw Node script to parse the PDF natively
    const scriptPath = path.join(process.cwd(), 'scripts', 'parse_pdf.js');
    
    try {
      const { stdout } = await execAsync(`node "${scriptPath}" "${tempFilePath}"`);
      // Cleanup temp file
      fs.unlinkSync(tempFilePath);
      
      const cleanText = stdout.trim();
      return NextResponse.json({ text: cleanText });
    } catch (execError: any) {
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      console.error("Child process error:", execError);
      return NextResponse.json({ error: 'Failed to parse PDF content natively', details: execError.message }, { status: 500 });
    }

  } catch (error: any) {
    console.error("PDF Parsing Error:", error);
    return NextResponse.json({ error: 'Failed to parse PDF', details: error.message }, { status: 500 });
  }
}
