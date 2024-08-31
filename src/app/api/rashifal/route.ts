import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await axios.get(
      "https://www.ashesh.com.np/rashifal/widget.php"
    );
    const $ = cheerio.load(data);
    const rashifalData: { name: string; value: string }[] = [];

    $(".row").each((i, element) => {
      const rashifal = $(element).find(".rashifal");
      const name = rashifal.find(".rashifal_name").text().trim();
      const value = rashifal.find(".rashifal_value").text().trim();

      rashifalData.push({ name, value });
    });
    return NextResponse.json(rashifalData);
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
