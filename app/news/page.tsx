"use client";

import { useEffect, useState } from "react";
import { newsApi } from "../lib/api-client";
import toast from "react-hot-toast";
import Link from "next/link";

interface News {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await newsApi.getAll();
      setNews(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch news");
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
    });
  };

  // Strip HTML tags for preview
  const stripHtml = (html: string) => {
    if (typeof window === 'undefined') return html;
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Get preview of description (first 150 characters)
  const getPreview = (html: string) => {
    const text = stripHtml(html);
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-xl">Loading news...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">CPG News</h1>
        
        {news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No news available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link 
                key={item._id}
                href={`/news/${item._id}`}
                className="block"
              >
                <div className="bg-white border-2 border-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
                  {item.image && (
                    <div className="relative w-full h-48">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-black mb-2">{item.title}</h2>
                    <p className="text-gray-700 mb-4 line-clamp-3 flex-1">
                      {getPreview(item.description)}
                    </p>
                    <p className="text-sm text-gray-500 mt-auto">{formatDate(item.createdAt)}</p>
                    <span className="text-red-600 font-semibold text-sm mt-2 inline-block">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
