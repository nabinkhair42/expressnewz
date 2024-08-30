import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch("https://www.ashesh.com.np/rashifal/widget.php");
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
    
    const html = await res.text();
    
    const data: { name: string; value: string }[] = [];
    const regex =
      /<div class="rashifal_name">([\s\S]*?)<\/div>[\s\S]*?<div class="rashifal_value">([\s\S]*?)<\/div>/g;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(html))) {
      data.push({
        name: match[1].trim(),
        value: match[2].trim(),
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
