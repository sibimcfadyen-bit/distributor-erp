"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();

    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

const disableProduct = async (id: string) => {
  await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isActive: false,
    }),
  });

  loadProducts();
};

const activateProduct = async (id: string) => {
  await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isActive: true,
    }),
  });

  loadProducts();
};

const filteredProducts = products.filter(
  (product) =>
    (product.name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (product.sku ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
);

return (
  <div className="bg-white border shadow-lg rounded-lg p-6 mt-6">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
      <h2 className="text-2xl font-semibold">
        Product List
      </h2>

      <Link
        href="/products/new"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Product
      </Link>

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 mt-3 md:mt-0"
      />
    </div>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse border">

        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">HSN</th>
            <th className="border p-2">GST %</th>
            <th className="border p-2">MRP</th>
            <th className="border p-2">Distributor</th>
            <th className="border p-2">Retailer</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="border p-4 text-center"
              >
                No Products Found
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50"
              >
                <td className="border p-2">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border p-2">
                  {product.sku ?? "-"}
                </td>

                <td className="border p-2">
                  {product.name ?? "-"}
                </td>

                <td className="border p-2">
                  {product.hsnCode ?? "-"}
                </td>

                <td className="border p-2">
                  {product.gst ?? 0}%
                </td>

                <td className="border p-2">
                  ₹{product.mrp ?? 0}
                </td>

                <td className="border p-2">
                  ₹{product.distributorRate ?? 0}
                </td>

                <td className="border p-2">
                  ₹{product.retailerRate ?? 0}
                </td>

                <td className="border p-2 text-center">
                  {product.isActive ? (
                    <span className="text-green-600 font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="border p-2">
                  <div className="flex gap-2 justify-center">
                    <Link
                      href={`/products/edit/${product.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </Link>

                    {
                      product.isActive ? (
                        <button
                          onClick={() => disableProduct(product.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Disable
                        </button>
                      ) : (
                        <button
                          onClick={() => activateProduct(product.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Activate
                        </button>
                      )
                    }
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  </div>
);
}