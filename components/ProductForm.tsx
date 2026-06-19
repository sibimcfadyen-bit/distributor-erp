"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    hsnCode: "",
    gst: "",
    caseSize: "",
    mrp: "",
    distributorRate: "",
    retailerRate: "",
    reorderLevel: "",
    shelfLifeDays: "",
    trackBatch: true,
    trackMfgDate: true,
    imageUrl: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({
    sku: "",
    name: "",
    hsnCode: "",
    gst: "",
    caseSize: "",
    mrp: "",
    distributorRate: "",
    retailerRate: "",
    reorderLevel: "",
    imageUrl: "",
  });

  const router = useRouter();

  const validateForm = () => {
  const newErrors = {
    sku: "",
    name: "",
    hsnCode: "",
    gst: "",
    caseSize: "",
    mrp: "",
    distributorRate: "",
    retailerRate: "",
    reorderLevel: "",
    imageUrl: "",
  };

  if (!formData.sku.trim()) newErrors.sku = "SKU is required";
  if (!formData.name.trim()) newErrors.name = "Product Name is required";
  if (!formData.hsnCode.trim()) newErrors.hsnCode = "HSN Code is required";
  if (!formData.gst) newErrors.gst = "GST is required";
  if (!formData.caseSize) newErrors.caseSize = "Case Size is required";
  if (!formData.mrp) newErrors.mrp = "MRP is required";
  if (!formData.distributorRate) newErrors.distributorRate = "Distributor Rate is required";
  if (!formData.retailerRate) newErrors.retailerRate = "Retailer Rate is required";
  if (!formData.reorderLevel) newErrors.reorderLevel = "Reorder Level is required";
  if (!formData.imageUrl) { newErrors.imageUrl = "Product image is required";
}

  setErrors(newErrors);

  return !Object.values(newErrors).some((error) => error !== "");
};
const [imagePreview, setImagePreview] = useState("");

  const saveProduct = async () => {
      if (!validateForm()) {
          return;
      }
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Product Saved Successfully");

        setFormData({
          sku: "",
          name: "",
          hsnCode: "",
          gst: "",
          caseSize: "",
          mrp: "",
          distributorRate: "",
          retailerRate: "",
          reorderLevel: "",
          shelfLifeDays: "",
          trackBatch: true,
          trackMfgDate: true,
          imageUrl: "",
          isActive: true,
        });

        router.push("/products");
      } else {
        alert("Failed to save product");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving product");
    }
  };

  return (
    <div className="bg-white border shadow-lg rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-semibold mb-6">
        Add Product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-1">
            SKU <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.sku}
            onChange={(e) => {
              setFormData({
                ...formData,
                sku: e.target.value,
              });

                setErrors({
                    ...errors,
                    sku: "",
                });
            }}
            className={`w-full border rounded p-2 ${
            errors.sku ? "border-red-500" : ""
            }`}
          />
          {errors.sku && (
            <p className="text-red-500 text-sm mt-1">
                {errors.sku}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
              setErrors({
                    ...errors,
                    name: "",
                });
            }}
            className={`w-full border rounded p-2 ${
            errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
                {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">
            HSN Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.hsnCode}
            onChange={(e) => {
              setFormData({
                ...formData,
                hsnCode: e.target.value,
              });
              setErrors({
                    ...errors,
                    hsnCode: "",
                });
            }}
            className={`w-full border rounded p-2 ${
            errors.hsnCode ? "border-red-500" : ""
            }`}
          />
          {errors.hsnCode && (
            <p className="text-red-500 text-sm mt-1">
                {errors.hsnCode}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">
            GST % <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.gst}
            onChange={(e) => {
              setFormData({
                ...formData,
                gst: e.target.value,
              });
              setErrors({
                    ...errors,
                    gst: "",
                });
            }}
            className={`w-full border rounded p-2 ${
            errors.gst ? "border-red-500" : ""
            }`}
          />
          {errors.gst && (
            <p className="text-red-500 text-sm mt-1">
                {errors.gst}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">
            Case Size <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.caseSize}
            onChange={(e) => {
              setFormData({
                ...formData,
                caseSize: e.target.value,
              });
              setErrors({
                    ...errors,
                    caseSize: "",
                });
            }}
            className={`w-full border rounded p-2 ${
            errors.caseSize ? "border-red-500" : ""
            }`}
          />
          {errors.caseSize && (
            <p className="text-red-500 text-sm mt-1">
                {errors.caseSize}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">
            MRP <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.mrp}
            onChange={(e) => {
              setFormData({
                ...formData,
                mrp: e.target.value,
              });
              setErrors({
                    ...errors,
                    mrp: "",
                });
            }}
            className={`w-full border rounded p-2 ${
            errors.mrp ? "border-red-500" : ""
            }`}
          />
          {errors.mrp && (
            <p className="text-red-500 text-sm mt-1">
                {errors.mrp}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">
            Distributor Rate <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.distributorRate}
            onChange={(e) => {
              setFormData({
                ...formData,
                distributorRate: e.target.value,
              });
              setErrors({
                    ...errors,
                    distributorRate: "",
                });
            }}
            className={`w-full border rounded p-2 ${
            errors.distributorRate ? "border-red-500" : ""
            }`}
          />
          {errors.distributorRate && (
            <p className="text-red-500 text-sm mt-1">
                {errors.distributorRate}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">
            Retailer Rate <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.retailerRate}
            onChange={(e) => {
              setFormData({
                ...formData,
                retailerRate: e.target.value,
              });
              setErrors({
                    ...errors,
                    retailerRate: "",
                });
            }}
            className={`w-full border rounded p-2 ${
            errors.retailerRate ? "border-red-500" : ""
            }`}
          />
          {errors.retailerRate && (
            <p className="text-red-500 text-sm mt-1">
                {errors.retailerRate}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">
            Reorder Level <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.reorderLevel}
            onChange={(e) => {
              setFormData({
                ...formData,
                reorderLevel: e.target.value,
              });
              setErrors({
                    ...errors,
                    reorderLevel: "",
                });
            }}
            className={`w-full border rounded p-2 ${
            errors.reorderLevel ? "border-red-500" : ""
            }`}
          />
          {errors.reorderLevel && (
            <p className="text-red-500 text-sm mt-1">
                {errors.reorderLevel}
            </p>
          )}
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
                shelfLifeDays: e.target.value,
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
        <label className="block mb-2">
            Product Image
        </label>

        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
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

                setImagePreview(
                  URL.createObjectURL(file)
                );

                setErrors({
                  ...errors,
                  imageUrl: "",
                });
              }
            }}
            />
        </label>

        {imagePreview && (
            <img
            src={imagePreview}
            alt="Preview"
            className="mt-3 w-24 h-24 object-cover border rounded"
            />
        )}

        {errors.imageUrl && (
          <p className="text-red-500 text-sm mt-1">
            {errors.imageUrl}
          </p>
        )}
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
          onClick={saveProduct}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-green-700"
        >
          Save Product
        </button>
      </div>

    </div>
  );
}