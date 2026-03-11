import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adventureSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get("active") === "true";
  const adventures = await prisma.adventure.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(adventures);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = adventureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const adventure = await prisma.adventure.create({
    data: {
      ...parsed.data,
      childFreeNote: parsed.data.childFreeNote ?? "",
      imageUrl: parsed.data.imageUrl ?? "",
      youtubeUrl: parsed.data.youtubeUrl ?? "",
    },
  });
  return NextResponse.json(adventure, { status: 201 });
}
