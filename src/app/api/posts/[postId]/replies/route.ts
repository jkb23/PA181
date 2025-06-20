import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { content } = await req.json();
    const { postId } = params;

    if (!content) {
      return new NextResponse("Chybí obsah odpovědi", { status: 400 });
    }

    const reply = await prisma.reply.create({
      data: {
        content,
        authorId: session.user.id,
        postId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(reply);
  } catch (error) {
    console.error("[REPLIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 