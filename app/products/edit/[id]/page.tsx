import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/product/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return <EditProductForm product={product} />;
}