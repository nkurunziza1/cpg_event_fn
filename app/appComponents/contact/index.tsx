"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { messagesApi } from "@/app/lib/api-client";
import { CreateMessageData } from "@/app/types/dtos";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState<CreateMessageData>({
    name: "",
    telephone: "",
    email: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.telephone) newErrors.telephone = "Phone number is required";
    if (!formData.description) newErrors.description = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await messagesApi.create(formData);
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        telephone: "",
        email: "",
        description: "",
      });
    } catch (err) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      id="contact"
      className="relative flex flex-wrap lg:items-center pb-36"
    >
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 lg:h-[350px] flex items-center">
        <div className="mx-auto max-w-lg w-full">
          <h1 className="text-2xl font-bold sm:text-3xl">Get in Touch</h1>
          <p className="mt-4 text-gray-500">
            Fill out the form to send us a message.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Name"
                required
                disabled={loading}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Phone Number"
                required
                disabled={loading}
              />
              {errors.telephone && (
                <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Email"
                required
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                rows={4}
                placeholder="Message"
                disabled={loading}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex text-xl items-center gap-4 rounded-lg w-[50%] bg-primary px-5 py-3 font-serif font-medium text-white"
              disabled={loading}
            >
              {loading ? "Sending..." : "Message us"} <Send />
            </button>
          </form>
        </div>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-[350px] lg:w-1/2 flex items-center">
        <iframe
          src="https://www.google.com/maps?q=KK+317+St&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map - KK 317 St"
        />
      </div>
    </section>
  );
};

export default Contact;
