import { NextResponse } from "next/server";

export const runtime = "nodejs"; // or "edge" if preferred

export async function GET() {
  return NextResponse.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
