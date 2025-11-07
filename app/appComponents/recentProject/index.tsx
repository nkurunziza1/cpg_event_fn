"use client";
import React, { useEffect, useState } from "react";
import Card from "../atoms/card";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "../molecules/emblaCarousel";
import InMotion from "@/utils/inMotion";
import { projectsApi } from "@/app/lib/api-client";
import { Project } from "@/app/types/dtos";

const OPTIONS: EmblaOptionsType = { loop: true };
const RecentProjects = () => {
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const data = await projectsApi.getRecentProjects();
        setRecentProjects(data);
      } catch (err) {
        setError("Failed to fetch recent projects.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex justify-center items-center">
        Loading recent projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex justify-center items-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="container w-full mb-10 px-4 lg:px-0   justify-center mx-auto font-serif mt-20 flex flex-col lg:flex-row gap-4">
      <div>
        <InMotion>
          <h1 className="text-center text-4xl text-primary pb-4">
            Our Recent Projects
          </h1>
        </InMotion>
        <InMotion delay={0.3}>
          <p className="max-w-3xl mx-auto text-center text-gray-700 text-lg mb-12">
            Our innovative projects are designed to create sustainable,
            transformative change across communities. We focus on holistic
            solutions that address critical challenges in education, technology,
            agriculture, and social equity, empowering individuals and
            strengthening local ecosystems.
          </p>
        </InMotion>
        <InMotion>
          {recentProjects.length === 0 ? (
            <p className="text-center text-gray-600">No recent projects found.</p>
          ) : (
            <EmblaCarousel slides={recentProjects.map(project => ({ ...project, id: project._id }))} options={OPTIONS} />
          )}
        </InMotion>
      </div>
    </div>
  );
};

export default RecentProjects;
