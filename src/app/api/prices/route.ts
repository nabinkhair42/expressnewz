import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch("https://www.ashesh.com.np/gold/widget.php");
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
    
    const html = await res.text();
    
    const data: { name: string; price: string; unit: string }[] = [];
    const regex =
      /<div class="country">[\s\S]*?<div class="name">(.*?)<\/div>[\s\S]*?<div class="rate_buying">(.*?)<\/div>[\s\S]*?<div class="unit">(.*?)<\/div>[\s\S]*?<\/div>/g;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(html))) {
      data.push({
        name: match[1].trim(),
        price: match[2].trim(),
        unit: match[3].trim(),
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
