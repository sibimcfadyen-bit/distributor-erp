import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      sku: body.sku,
      name: body.name,
      hsnCode: body.hsnCode,
      gst: Number(body.gst),
      caseSize: Number(body.caseSize),
      mrp: Number(body.mrp),
      distributorRate: Number(body.distributorRate),
      retailerRate: Number(body.retailerRate),
      reorderLevel: Number(body.reorderLevel),
      shelfLifeDays: body.shelfLifeDays
        ? Number(body.shelfLifeDays)
        : null,
      trackBatch: body.trackBatch,
      trackMfgDate: body.trackMfgDate,
      imageUrl: body.imageUrl,
      isActive: true,
    },
  });

  return NextResponse.json(product);
}