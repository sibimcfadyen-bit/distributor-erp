import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const countBefore = await prisma.route.count();

    const result = await prisma.route.deleteMany();

    return NextResponse.json({
      success: true,
      before: countBefore,
      deleted: result.count,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}