"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Product {
  id: string;
  sku: string;
  name: string;
  hsnCode: string;
  gst: number;
  caseSize: number;
  mrp: number;
  distributorRate: number;
  retailerRate: number;
  reorderLevel: number;
  shelfLifeDays: number | null;
  trackBatch: boolean;
  trackMfgDate: boolean;
  imageUrl: string | null;
  isActive: boolean;
}

interface EditProductFormProps {
  product: Product;
}

export default function EditProductForm({
  product,
}: EditProductFormProps) {
  const [formData, setFormData] = useState({
    sku: product.sku,
    name: product.name,
    hsnCode: product.hsnCode,
    gst: product.gst,
    caseSize: product.caseSize,
    mrp: product.mrp,
    distributorRate: product.distributorRate,
    retailerRate: product.retailerRate,
    reorderLevel: product.reorderLevel,
    shelfLifeDays: product.shelfLifeDays ?? "",
    trackBatch: product.trackBatch,
    trackMfgDate: product.trackMfgDate,
    imageUrl: product.imageUrl ?? "",
    isActive: product.isActive,
  });

  const router = useRouter();

  const updateProduct = async () => {
    const response = await fetch(
      `/api/products/${product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      alert("Product Updated Successfully");
       router.push("/products");
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <div className="bg-white border shadow-lg rounded-lg p-6 mt-4">

      <h2 className="text-2xl font-semibold mb-6">
        Edit Product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {formData.imageUrl && (
          <div className="mb-6">
            <img
              src={formData.imageUrl}
              alt={formData.name}
              className="w-32 h-32 object-cover border rounded shadow"
            />
          </div>
        )}

        <div className="mt-4">
          <label className="block mb-2">
            Change Product Image
          </label>

          <label className="cursor-pointer bg-grey-600 text-white px-4 py-2 rounded inline-block hover:bg-blue-700">
            Upload Product Image

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  const imagePath = `/products/${file.name}`;

                  setFormData({
                    ...formData,
                    imageUrl: imagePath,
                  });
                }
              }}
            />
          </label>
        </div>

        <div>
          <label className="block mb-1">
            SKU
          </label>

          <input
            type="text"
            value={formData.sku}
            onChange={(e) =>
              setFormData({
                ...formData,
                sku: e.target.value,
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Product Name
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            HSN Code
          </label>

          <input
            type="text"
            value={formData.hsnCode}
            onChange={(e) =>
              setFormData({
                ...formData,
                hsnCode: e.target.value,
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            GST %
          </label>

          <input
            type="number"
            value={formData.gst}
            onChange={(e) =>
              setFormData({
                ...formData,
                gst: Number(e.target.value),
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Case Size
          </label>

          <input
            type="number"
            value={formData.caseSize}
            onChange={(e) =>
              setFormData({
                ...formData,
                caseSize: Number(e.target.value),
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            MRP
          </label>

          <input
            type="number"
            step="0.01"
            value={formData.mrp}
            onChange={(e) =>
              setFormData({
                ...formData,
                mrp: Number(e.target.value),
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Distributor Rate
          </label>

          <input
            type="number"
            step="0.01"
            value={formData.distributorRate}
            onChange={(e) =>
              setFormData({
                ...formData,
                distributorRate: Number(e.target.value),
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Retailer Rate
          </label>

          <input
            type="number"
            step="0.01"
            value={formData.retailerRate}
            onChange={(e) =>
              setFormData({
                ...formData,
                retailerRate: Number(e.target.value),
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Reorder Level
          </label>

          <input
            type="number"
            value={formData.reorderLevel}
            onChange={(e) =>
              setFormData({
                ...formData,
                reorderLevel: Number(e.target.value),
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Shelf Life Days
          </label>

          <input
            type="number"
            value={formData.shelfLifeDays}
            onChange={(e) =>
              setFormData({
                ...formData,
                shelfLifeDays: Number(e.target.value),
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

      </div>

      <div className="mt-4 flex flex-wrap gap-6">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.trackBatch}
            onChange={(e) =>
              setFormData({
                ...formData,
                trackBatch: e.target.checked,
              })
            }
          />
          Track Batch
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.trackMfgDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                trackMfgDate: e.target.checked,
              })
            }
          />
          Track Mfg Date
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({
                ...formData,
                isActive: e.target.checked,
              })
            }
          />
          Active Product
        </label>

      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="mt-6 bg-gray-500 text-white px-6 py-2 rounded cursor-pointer"
        >
          Back
        </button>

        <button
          onClick={updateProduct}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-green-700"
        >
          Update Product
        </button>
      </div>

    </div>
  );
}