import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, content } = await req.json();

    if (!title || !content) {
      return new NextResponse("Chybí název nebo obsah příspěvku", { status: 400 });
    }

    // First verify the user exists
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      }
    });

    if (!user) {
      return new NextResponse("Uživatel nenalezen", { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
        published: true,
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

    return NextResponse.json(post);
  } catch (error) {
    console.error("[POSTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        reactions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    const total = await prisma.post.count({
      where: {
        published: true,
      },
    });

    return NextResponse.json({
      posts,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[POSTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 