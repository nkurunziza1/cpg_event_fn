"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { eventsApi, Event } from "../../../api/events";
import toast from "react-hot-toast";
import EventRegistrationForm from "../../../appComponents/forms/EventRegistrationForm";
import { ArrowLeft, Calendar, MapPin, Clock, Tag, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchEvent();
    }
  }, [params.id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const data = await eventsApi.getById(params.id as string);
      setEvent(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch event");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    if (event) {
      setShowRegistrationForm(true);
    }
  };

  const handleRegistrationSuccess = () => {
    setShowRegistrationForm(false);
    toast.success("Successfully registered for the event!");
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "upcoming":
        return <Clock className="w-4 h-4" />;
      default:
        return <Tag className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-xl">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-black text-xl mb-4">Event not found</p>
          <Link
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Events
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
          href="/"
          className="inline-flex items-center gap-2 text-black hover:text-red-600 mb-6 font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Events
        </Link>

        {/* Event Content */}
        <article className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="p-8">
            {/* Header Section */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-bold text-black flex-1">{event.title}</h1>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(
                    event.status
                  )}`}
                >
                  {getStatusIcon(event.status)}
                  {event.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">
                  <Tag className="w-4 h-4" />
                  {event.eventCategory}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                  <Tag className="w-4 h-4" />
                  {event.language}
                </span>
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Start Date</p>
                  <p className="text-black font-medium">{formatDate(event.startingDate)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">End Date</p>
                  <p className="text-black font-medium">{formatDate(event.endingDate)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Location</p>
                  <p className="text-black font-medium">{event.location}</p>
                </div>
              </div>

              {event.maxParticipants && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Max Participants</p>
                    <p className="text-black font-medium">{event.maxParticipants}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">About This Event</h2>
              <div
                className="prose prose-lg max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black prose-a:text-red-600"
                dangerouslySetInnerHTML={{ __html: event.description }}
                style={{
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
                }}
              />
            </div>

            {/* Enroll Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleEnroll}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all hover:shadow-lg flex items-center gap-2 text-lg"
              >
                <Users className="w-5 h-5" />
                Enroll Now
              </button>
            </div>
          </div>
        </article>

        {/* Registration Form Modal */}
        {showRegistrationForm && event && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <EventRegistrationForm
                event={event}
                onSuccess={handleRegistrationSuccess}
                onCancel={() => {
                  setShowRegistrationForm(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
