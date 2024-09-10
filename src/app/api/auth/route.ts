import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Unauthorized" },
    {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
    }
  );
}
