import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: body,
  });

  return NextResponse.json(product);
}