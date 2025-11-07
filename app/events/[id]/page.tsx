"use client";

import { useEffect, useState } from "react";
import { eventsApi, Event } from "../../api/events";
import toast from "react-hot-toast";
import EventRegistrationForm from "../../appComponents/forms/EventRegistrationForm";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsApi.getAll();
      setEvents(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = (event: Event) => {
    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistrationForm(false);
    setSelectedEvent(null);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">
          CPG Rwanda Events
        </h1>

        {showRegistrationForm && selectedEvent && (
          <EventRegistrationForm
            event={selectedEvent}
            onSuccess={handleRegistrationSuccess}
            onCancel={() => {
              setShowRegistrationForm(false);
              setSelectedEvent(null);
            }}
          />
        )}

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No events available at the moment.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-black">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-black">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-black">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-black">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-black">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-black">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-black">
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap border-r border-black">
                      <div className="text-sm font-medium text-black">
                        {event.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r border-black">
                      <div className="text-sm text-black max-w-md truncate">
                        {event.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-black">
                      <div className="text-sm text-black">
                        {formatDate(event.startingDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-black">
                      <div className="text-sm text-black">
                        {formatDate(event.endingDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-black">
                      <div className="text-sm text-black">{event.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEnroll(event)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border border-black"
                      >
                        Enroll
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
