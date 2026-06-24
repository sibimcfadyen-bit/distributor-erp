import { prisma } from "@/lib/prisma";
import EditRouteForm from "@/components/route/EditRouteForm";

export default async function EditRoutePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const route = await prisma.route.findUnique({
    where: {
      id,
    },
  });

  if (!route) {
    return <div>Route Not Found</div>;
  }

  return (
    <EditRouteForm route={route} />
  );
}