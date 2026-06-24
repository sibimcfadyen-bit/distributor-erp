"use client";

import { useRouter } from "next/navigation";
import { Route } from "@/lib/types";
import { useState } from "react";

export default function RouteForm() {
  const router = useRouter();

  const [routeName, setRouteName] =
    useState("");

  const saveRoute = async () => {
    const route = routeName.trim();

    if (!route) {
        alert("Route Name Required");
        return;
    }

    if (route.length < 3) {
        alert(
        "Route Name must be at least 3 characters"
        );
        return;
    }

    if (route.length > 100) {
        alert(
        "Route Name cannot exceed 100 characters"
        );
        return;
    }

    const response = await fetch(
        "/api/routes",
        {
        method: "POST",
        headers: {
            "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
            name: route,
        }),
        }
    );

    const data = await response.json();

    if (response.ok) {
        alert("Route Saved");

        router.push("/routes");
    } else {
        alert(
        data.message ||
        "Failed to save route"
        );
    }
  };

  return (
    <div className="bg-white p-6 border rounded shadow">

      <h1 className="text-2xl font-bold mb-6">
        Add Route
      </h1>

      <div>
        <label className="block mb-2">
          Route Name *
        </label>

        <input
          type="text"
          value={routeName}
          onChange={(e) =>
            setRouteName(
                e.target.value.toUpperCase()
            )
            }
          className="w-full border p-2 rounded"
        />
      </div>

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
          onClick={saveRoute}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Save Route
        </button>
      </div>

    </div>
  );
}