import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adventureSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const adventure = await prisma.adventure.findUnique({
    where: { id: params.id },
  });
  if (!adventure) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(adventure);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = adventureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const adventure = await prisma.adventure.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      childFreeNote: parsed.data.childFreeNote ?? "",
      imageUrl: parsed.data.imageUrl ?? "",
      youtubeUrl: parsed.data.youtubeUrl ?? "",
    },
  });
  return NextResponse.json(adventure);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.adventure.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
