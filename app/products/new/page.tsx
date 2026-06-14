import ProductForm from "@/components/ProductForm";

export default function AddProductPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Add Product
      </h1>

      <ProductForm />
    </div>
  );
}