"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Route {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
}

export default function RouteList() {
  const router = useRouter();

  const [routes, setRoutes] = useState<Route[]>([]);
  const [search, setSearch] = useState("");

  const loadRoutes = async () => {
    const response = await fetch("/api/routes");
    const data = await response.json();

    setRoutes(data);
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  const filteredRoutes = routes.filter((route) =>
    route.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const disableRoute = async (id: string) => {
    await fetch(`/api/routes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isActive: false,
      }),
    });

    loadRoutes();
  };

  const activateRoute = async (id: string) => {
    await fetch(`/api/routes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isActive: true,
      }),
    });

    loadRoutes();
  };

  return (
    <div className="bg-white border rounded shadow p-6">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-semibold mr-6">
            Route List
        </h2>

        <div className="flex gap-2">

            <input
            type="text"
            placeholder="Search Route..."
            value={search}
            onChange={(e) =>
                setSearch(e.target.value)
            }
            className="border p-2 rounded"
            />

            <button
            onClick={() =>
                router.push("/routes/new")
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Add Route
            </button>

        </div>
      </div>

      <table className="w-full border-collapse border">

        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">
              Route Name
            </th>

            <th className="border p-2">
              Status
            </th>

            <th className="border p-2">
              Action
            </th>
          </tr>
        </thead>

        <tbody>

          {filteredRoutes.map((route) => (
            <tr key={route.id}>

              <td className="border p-2">
                {route.name}
              </td>

              <td className="border p-2">
                {route.isActive ? (
                  <span className="text-green-600">
                    Active
                  </span>
                ) : (
                  <span className="text-red-600">
                    Inactive
                  </span>
                )}
              </td>

              <td className="border p-2 text-center">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() =>
                      router.push(
                        `/routes/edit/${route.id}`
                      )
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  {route.isActive ? (
                    <button
                      onClick={() =>
                        disableRoute(route.id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        activateRoute(route.id)
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Activate
                    </button>
                  )}

                </div>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}