import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const data = await req.formData();

  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json(
      { error: "No file uploaded" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const extension = file.name.split(".").pop();

  const fileName = `${uuidv4()}.${extension}`;

  const uploadPath = path.join(
    process.cwd(),
    "public",
    "uploads",
    "products",
    fileName
  );

  await writeFile(uploadPath, buffer);

  return NextResponse.json({
    imageUrl: `/uploads/products/${fileName}`,
  });
}