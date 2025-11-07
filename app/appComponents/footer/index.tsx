"use client";

import { Menu } from "@/app/types/menu";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { newsletterApi } from "@/app/lib/api-client";
import toast from "react-hot-toast";

const Footer = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMenuClick = (menu: string, event: React.MouseEvent) => {
    if (menu) {
      return;
    }
    event.preventDefault();
    const targetId = menu || "";
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(targetId);
    }

    setOpenMenu(null);
    setIsMobileMenuOpen(false);
  };

  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Email is required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await newsletterApi.subscribe(formData.email);
      toast.success("Successfully subscribed to our newsletter!");
      setFormData({ email: "" });
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="bg-secondary text-white font-sans">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2">
          <div className="border-b border-gray-100 py-8 lg:order-last lg:border-b-0 lg:border-s lg:py-16 lg:ps-16">
            <div className="mt-8 space-y-4 lg:mt-0">
              <span className="hidden h-1 w-10 rounded bg-white lg:block"></span>

              <div>
                <h2 className="text-2xl font-medium text-white">
                  Stay Alerted
                </h2>

                <p className="mt-4 max-w-lg text-white">
                  Stay informed about our latest initiatives, success stories,
                  and community impact. Subscribe to our newsletter and be part
                  of our journey in transforming communities through innovative
                  development solutions. We'll keep you updated with monthly
                  insights, project highlights, and opportunities to get
                  involved.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 w-full">
                <label className="sr-only"> Email </label>

                <div className="rounded-md border border-primary p-2 focus-within:ring sm:flex sm:items-center sm:gap-4">
                  <input
                    type="email"
                    required
                    id="UserEmail"
                    placeholder="Alexandre@afor.rw"
                    className="rounded-md text-black p-2 focus-within:ring sm:flex sm:items-center sm:gap-4 w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />

                  <button
                    type="submit"
                    className="mt-1 w-full rounded bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-secondary duration-300 transition-all sm:mt-0 sm:w-auto sm:shrink-0"
                    disabled={loading}
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </form>
            </div>
          </div>

          <div className="py-8 lg:py-16 lg:pe-16">
            <div className="hidden text-teal-600 lg:block">
              <img src="/logos/cpgLogo.webp" alt="" width={100} height={100} />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <p className="font-medium text-white">Services</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      onClick={(e) => handleMenuClick("#", e)}
                      href={`/#`}
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      {" "}
                      Home
                    </a>
                  </li>

                  <li>
                    <a
                      href="/blogs"
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      Blogs
                    </a>
                  </li>

                  <li>
                    <a
                      href="/articles"
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      News & Articles
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white">AFOR NGO</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      onClick={(e) => handleMenuClick("#about", e)}
                      href={"#about"}
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      {" "}
                      About{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      onClick={(e) => handleMenuClick("#expertise", e)}
                      href={"#expertise"}
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      What We Do
                    </a>
                  </li>

                  <li>
                    <a
                      onClick={(e) => handleMenuClick("/latest-projects", e)}
                      href={"/latest-projects"}
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      Our Cases
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white">Helpful Links</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#contact"
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      {" "}
                      Contact{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <p className="mt-8 text-xs text-white">
                &copy; 2022. AFOR RWANDA. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
