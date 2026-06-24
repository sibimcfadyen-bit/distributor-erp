"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  route: {
    id: string;
    name: string;
    isActive: boolean;
  };
}

export default function EditRouteForm({
  route,
}: Props) {
  const router = useRouter();

  const [routeName, setRouteName] =
    useState(route.name);

  const updateRoute = async () => {
    const response = await fetch(
      `/api/routes/${route.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name: routeName,
        }),
      }
    );

    if (response.ok) {
      alert("Route Updated");

      router.push("/routes");
    }
  };

  return (
    <div className="bg-white border rounded shadow p-6">

      <h1 className="text-2xl font-bold mb-6">
        Edit Route
      </h1>

      <label className="block mb-2">
        Route Name
      </label>

      <input
        type="text"
        value={routeName}
        onChange={(e) =>
          setRouteName(e.target.value)
        }
        className="w-full border p-2 rounded"
      />

      <div className="mt-6 flex gap-4">

        <button
          type="button"
          onClick={() =>
            router.push("/routes")
          }
          className="bg-gray-600 text-white px-6 py-2 rounded"
        >
          Back
        </button>

        <button
          onClick={updateRoute}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Update Route
        </button>

      </div>

    </div>
  );
}