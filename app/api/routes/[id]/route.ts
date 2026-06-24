import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const route = await prisma.route.update({
    where: {
      id,
    },
    data: body,
  });

  return NextResponse.json(route);
}