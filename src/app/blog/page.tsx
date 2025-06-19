"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "../providers";

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
  const { t } = useTranslation();
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
        throw new Error(t("loading"));
      }
      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (error) {
      setError(t("loading"));
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
        throw new Error(t("create_post"));
      }
      setNewPost({ title: "", content: "" });
      setShowNewPostForm(false);
      fetchPosts();
    } catch (error) {
      setError(t("create_post"));
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
        throw new Error(t("like"));
      }
      fetchPosts();
    } catch (error) {
      setError(t("like"));
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
        throw new Error(t("send_reply"));
      }
      fetchPosts();
    } catch (error) {
      setError(t("send_reply"));
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">{t("loading")}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('blog')}</h1>
        {session && (
          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600"
          >
            {showNewPostForm ? t('cancel') : t('new_post')}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}

      {session && showNewPostForm && (
        <form onSubmit={handleCreatePost} className="mb-8 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{t('create_post')}</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder={t('post_title')}
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder={t('post_content')}
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full p-2 border rounded h-32 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowNewPostForm(false)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              {t('publish')}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {t('no_posts')}
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4 whitespace-pre-wrap dark:text-gray-200">{post.content}</p>
              <div className="text-sm text-gray-500 mb-4 dark:text-gray-300">
                {t('author')}: {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
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
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {REACTION_EMOJIS[type]} ({post.reactions.filter(r => r.type === type).length})
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="font-bold mb-2">{t('replies')} ({post.replies.length})</h4>
                {post.replies.length === 0 ? (
                  <p className="text-gray-500 text-sm dark:text-gray-300">{t('no_replies')}</p>
                ) : (
                  post.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50 p-3 rounded mb-2 dark:bg-gray-700 dark:text-gray-200">
                      <p className="whitespace-pre-wrap">{reply.content}</p>
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {reply.author.name} • {new Date(reply.createdAt).toLocaleDateString()}
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
                      placeholder={t('write_reply')}
                      className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                      required
                    />
                    <button
                      type="submit"
                      className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600"
                    >
                      {t('send_reply')}
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