"use client";

import { useState } from "react";
import { eventRegistrationsApi, Event } from "../../api/events";
import toast from "react-hot-toast";

interface EventRegistrationFormProps {
  event: Event;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EventRegistrationForm({
  event,
  onSuccess,
  onCancel,
}: EventRegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    additionalInfo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await eventRegistrationsApi.register({
        eventId: event._id,
        ...formData,
      });
      onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to register for event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-black mb-4">
          Register for: {event.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded border-2 border-black"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
