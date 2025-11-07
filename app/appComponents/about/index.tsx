import React from "react";
import InMotion from "@/utils/inMotion";

const About = () => {
  return (
    <div id="about" className="flex relative lg:flex-row flex-col font-serif justify-around bg-gray-50 gap-[50px] container mx-auto pt-1">
      <InMotion>
        <div className="bg-white flex flex-col gap-4 shadow-none lg:shadow-sm py-6 px-10">
          <h1 className="text-primary text-4xl font-serif font-bold">
            About Little Heart
          </h1>
          <h3 className="text-black text-2xl lg:max-w-sm">
            A child's first home should be a place of love, not fear
          </h3>
          <div className="text-red-950 flex flex-col font-sans gap-6 w-full leading-relaxed lg:w-[400px] text-sm">
            <p>
              Every child deserves to wake up to warmth, sleep without worry, and grow in a home where they feel safe, valued, and loved. But for too many children, this is not the reality.
            </p>
            <ul className="space-y-2">
              <li>💔 Some children wake up in broken homes, where conflict and violence steal their laughter.</li>
              <li>💔 Some roam the streets, longing for a warm embrace, a meal, or simply someone who cares.</li>
              <li>💔 Some are forced to grow up too soon, burdened with struggles no child should ever carry.</li>
            </ul>
            <p>
              At Authentic Family Organization Rwanda (AFOR), we believe that no child should ever feel invisible, unloved, or unsafe. That's why we stand up for them—rescuing, protecting, and restoring the lives of vulnerable children.
            </p>
          </div>
          <button className="bg-primary rounded-sm text-white w-[50%] py-4 px-1">
            Donate
          </button>
        </div>
      </InMotion>
      <InMotion delay={0.5}>
        <div className="max-w-xl px-2 flex flex-col gap-6">
          <h1 className="capitalize text-left lg:text-right text-4xl text-primary">
            in mission since 2015
          </h1>
          <h3 className="capitalize mb-6 text-left lg:text-right text-black">
            Through education, family support, and advocacy, we help children find their voices, reclaim their childhoods, and dream without fear
          </h3>
          <img
            className="rounded-md"
            src="https://res.cloudinary.com/dexaxaqjx/image/upload/v1737412747/group-3137670_mxidfa.jpg"
            alt="Children being cared for"
          />
        </div>
      </InMotion>
    </div>
  );
};

export default About;