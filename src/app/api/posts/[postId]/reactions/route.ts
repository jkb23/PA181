import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { type } = await req.json();
    const url = new URL(req.url);
    const postId = url.pathname.split("/")[3];
    console.log(url.pathname);

    if (!type) {
      return new NextResponse("Chybí typ reakce", { status: 400 });
    }

    // Check if user already reacted to this post
    const existingReaction = await prisma.reaction.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    if (existingReaction) {
      // If same reaction type, remove it
      if (existingReaction.type === type) {
        await prisma.reaction.delete({
          where: {
            id: existingReaction.id,
          },
        });
        return new NextResponse("Reakce odstraněna", { status: 200 });
      }

      // If different reaction type, update it
      const updatedReaction = await prisma.reaction.update({
        where: {
          id: existingReaction.id,
        },
        data: {
          type,
        },
      });

      return NextResponse.json(updatedReaction);
    }

    // Create new reaction
    const reaction = await prisma.reaction.create({
      data: {
        type,
        userId: session.user.id,
        postId,
      },
    });

    return NextResponse.json(reaction);
  } catch (error) {
    console.error("[REACTIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
