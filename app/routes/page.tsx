import RouteList from "@/components/route/RouteList";

export default function RoutesPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Route Master
      </h1>

      <RouteList />
    </div>
  );
}