"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { newsApi } from "@/app/lib/api-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

interface News {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export default function SingleNewsPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchNews();
    }
  }, [params.id]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await newsApi.getById(params.id as string);
      // API returns { message: {...} } structure
      const newsData = (response as any).message || response;
      setNews(newsData as News);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch news");
      router.push("/news");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-xl">Loading news...</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-black text-xl mb-4">News not found</p>
          <Link
            href="/news"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-black hover:text-red-600 mb-6 font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to News
        </Link>

        {/* News Content */}
        <article className="bg-white rounded-lg overflow-hidden shadow-lg">
          {news.image && (
            <div className="relative w-full h-96">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-black mb-4">{news.title}</h1>

            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">{formatDate(news.createdAt)}</span>
            </div>

            <div
              className="prose prose-lg max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black prose-a:text-red-600"
              dangerouslySetInnerHTML={{ __html: news.description }}
              style={{
                wordWrap: 'break-word',
                overflowWrap: 'break-word'
              }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
