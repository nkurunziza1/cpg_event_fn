"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "../atoms/carousel/articles";
import InMotion from "@/utils/inMotion";
import { newsApi } from "@/app/lib/api-client";
import { News } from "@/app/types/dtos";

const Articles = () => {
  const [articles, setArticles] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await newsApi.getAll();
        setArticles(data);
      } catch (err) {
        setError("Failed to fetch articles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section id="media-articles" className="py-32 flex justify-center items-center">
        Loading articles...
      </section>
    );
  }

  if (error) {
    return (
      <section id="media-articles" className="py-32 flex justify-center items-center text-red-600">
        {error}
      </section>
    );
  }
  console.log("articles", articles)
  return (
    <section id="media-articles" className="py-32 ">
      <InMotion>
        <h3 className="text-center text-primary font-serif text-3xl py-4">
          Media & Articles
        </h3>
      </InMotion>
      {articles.length === 0 ? (
        <p className="text-center text-gray-600">No articles found.</p>
      ) : (
        <Carousel slides={articles} />
      )}
    </section>
  );
};

export default Articles;
