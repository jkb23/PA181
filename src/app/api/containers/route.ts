import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'containers.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data, {
      status: 200,
      headers: { 'Cache-Control': 'public, max-age=3600' },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to read local GeoJSON' }, { status: 500 });
  }
} 