import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const routes = await prisma.route.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(routes);
}

export async function POST(request: Request) {
  const body = await request.json();

  const routeName = body.name?.trim();

  if (!routeName) {
    return NextResponse.json(
      {
        message: "Route Name Required",
      },
      {
        status: 400,
      }
    );
  }

  const existingRoute = await prisma.route.findFirst({
    where: {
      name: routeName,
    },
  });

  if (existingRoute) {
    return NextResponse.json(
      {
        message: "Route already exists",
      },
      {
        status: 400,
      }
    );
  }

  const route = await prisma.route.create({
    data: {
      name: routeName,
      isActive: true,
    },
  });

  return NextResponse.json(route);
}