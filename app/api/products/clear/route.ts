import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.product.deleteMany();

  return NextResponse.json({
    success: true,
    deleted: result.count,
  });
}