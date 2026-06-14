import { prisma } from "@/lib/prisma";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Edit Product
      </h1>

      <div className="bg-white border rounded p-4">
        <p><strong>SKU:</strong> {product?.sku}</p>
        <p><strong>Name:</strong> {product?.name}</p>
        <p><strong>HSN:</strong> {product?.hsnCode}</p>
        <p><strong>GST:</strong> {product?.gst}%</p>
        <p><strong>MRP:</strong> ₹{product?.mrp}</p>
      </div>
    </div>
  );
}