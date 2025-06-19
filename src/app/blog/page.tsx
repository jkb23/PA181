"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  reactions: {
    id: string;
    type: string;
    userId: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
  replies: {
    id: string;
    content: string;
    createdAt: string;
    author: {
      id: string;
      name: string;
      email: string;
    };
  }[];
}

const REACTION_EMOJIS: Record<string, string> = {
  LIKE: "👍",
  LOVE: "❤️",
  LAUGH: "😂",
  WOW: "😮",
  SAD: "😢",
  ANGRY: "😡",
};

export default function BlogPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/posts?page=${page}&limit=10`);
      if (!response.ok) {
        throw new Error("Nepodařilo se načíst příspěvky");
      }
      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Nepodařilo se načíst příspěvky");
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      setError(null);
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Nepodařilo se vytvořit příspěvek");
      }

      setNewPost({ title: "", content: "" });
      setShowNewPostForm(false);
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Nepodařilo se vytvořit příspěvek");
    }
  };

  const handleReaction = async (postId: string, type: string) => {
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      setError(null);
      const response = await fetch(`/api/posts/${postId}/reactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });
      if (!response.ok) {
        throw new Error("Nepodařilo se přidat reakci");
      }
      fetchPosts();
    } catch (error) {
      console.error("Error adding reaction:", error);
      setError("Nepodařilo se přidat reakci");
    }
  };

  const handleReply = async (postId: string, content: string) => {
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      setError(null);
      const response = await fetch(`/api/posts/${postId}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        throw new Error("Nepodařilo se přidat odpověď");
      }
      fetchPosts();
    } catch (error) {
      console.error("Error adding reply:", error);
      setError("Nepodařilo se přidat odpověď");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Načítání...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Blog</h1>
        {session && (
          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            {showNewPostForm ? "Zrušit" : "Nový příspěvek"}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {session && showNewPostForm && (
        <form onSubmit={handleCreatePost} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Vytvořit nový příspěvek</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Název příspěvku"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Obsah příspěvku"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full p-2 border rounded h-32"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowNewPostForm(false)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Zrušit
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              Publikovat
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Zatím nejsou žádné příspěvky. Buďte první, kdo něco napíše!
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4 whitespace-pre-wrap">{post.content}</p>
              <div className="text-sm text-gray-500 mb-4">
                Autor: {post.author.name} • {new Date(post.createdAt).toLocaleDateString("cs-CZ")}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {["LIKE", "LOVE", "LAUGH", "WOW", "SAD", "ANGRY"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleReaction(post.id, type)}
                    className={`px-3 py-1 rounded transition-colors ${
                      post.reactions.some(
                        (r) => r.type === type && r.userId === session?.user?.id
                      )
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {REACTION_EMOJIS[type]} ({post.reactions.filter(r => r.type === type).length})
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="font-bold mb-2">Odpovědi ({post.replies.length})</h4>
                {post.replies.length === 0 ? (
                  <p className="text-gray-500 text-sm">Zatím nejsou žádné odpovědi.</p>
                ) : (
                  post.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50 p-3 rounded mb-2">
                      <p className="whitespace-pre-wrap">{reply.content}</p>
                      <div className="text-sm text-gray-500">
                        {reply.author.name} • {new Date(reply.createdAt).toLocaleDateString("cs-CZ")}
                      </div>
                    </div>
                  ))
                )}
                {session && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const content = (e.target as HTMLFormElement).reply.value;
                      handleReply(post.id, content);
                      (e.target as HTMLFormElement).reply.value = "";
                    }}
                    className="mt-2"
                  >
                    <textarea
                      name="reply"
                      placeholder="Napište odpověď..."
                      className="w-full p-2 border rounded"
                      required
                    />
                    <button
                      type="submit"
                      className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                    >
                      Odeslat odpověď
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-4 py-2 rounded ${
                page === pageNum
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 