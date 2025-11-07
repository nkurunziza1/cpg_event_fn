"use client";

import { useEffect, useState, useMemo } from "react";
import { eventsApi, Event } from "@/app/api/events";
import { newsletterApi } from "@/app/lib/api-client";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  Search,
  X,
  Mail,
  CheckCircle,
  ArrowRight,
  Users,
  Filter,
  Plus,
} from "lucide-react";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");

  // Load More functionality
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsApi.getAll();
      setEvents(
        data.filter(
          (event) => event.status === "active" || event.status === "upcoming"
        )
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesStatus =
        statusFilter === "all" || event.status === statusFilter;
      const matchesTitle =
        !titleFilter ||
        event.title.toLowerCase().includes(titleFilter.toLowerCase());

      let matchesDate = true;
      if (dateFilter) {
        const filterDate = new Date(dateFilter);
        filterDate.setHours(0, 0, 0, 0);

        const eventStartDate = new Date(event.startingDate);
        eventStartDate.setHours(0, 0, 0, 0);

        const eventEndDate = new Date(event.endingDate);
        eventEndDate.setHours(0, 0, 0, 0);

        matchesDate =
          (filterDate >= eventStartDate && filterDate <= eventEndDate) ||
          filterDate.getTime() === eventStartDate.getTime() ||
          filterDate.getTime() === eventEndDate.getTime();
      }

      return matchesStatus && matchesTitle && matchesDate;
    });
  }, [events, statusFilter, titleFilter, dateFilter]);

  // Get displayed events based on displayCount
  const displayedEvents = filteredEvents.slice(0, displayCount);
  const hasMoreEvents = displayCount < filteredEvents.length;

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(5);
  }, [statusFilter, titleFilter, dateFilter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
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
        return <CheckCircle className="w-3 h-3" />;
      case "upcoming":
        return <Clock className="w-3 h-3" />;
      default:
        return <Tag className="w-3 h-3" />;
    }
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 5);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/assets/noiseImages/home_bg.jpg)" }}
      >
        <div className="bg-white bg-opacity-95 px-8 py-6 rounded-xl shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <div className="text-black text-xl font-semibold">
              Loading events...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url(/assets/noiseImages/home_bg.jpg)" }}
    >
      <div className="min-h-screen bg-gradient-to-br from-black/60 via-black/50 to-black/60">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              CPG Rwanda Events
            </h1>
            <p className="text-xl text-white/90 drop-shadow-lg">
              Discover and enroll in our upcoming training programs
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-black">Filter Events</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2">
                  <Tag className="w-4 h-4" />
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white text-black font-medium focus:ring-2 focus:ring-red-600 focus:outline-none shadow-sm border border-gray-200"
                >
                  <option value="all">All Status</option>
                  {/* <option value="pending">Pending</option> */}
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  {/* <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option> */}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2">
                  <Search className="w-4 h-4" />
                  Search Title
                </label>
                <input
                  type="text"
                  value={titleFilter}
                  onChange={(e) => setTitleFilter(e.target.value)}
                  placeholder="Search events..."
                  className="w-full px-4 py-2.5 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-red-600 focus:outline-none shadow-sm border border-gray-200"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2">
                  <Calendar className="w-4 h-4" />
                  Filter by Date
                </label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white text-black focus:ring-2 focus:ring-red-600 focus:outline-none shadow-sm border border-gray-200"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter("all");
                    setTitleFilter("");
                    setDateFilter("");
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Events Table */}
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <div className="flex flex-col items-center">
                <Calendar className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-black text-xl font-semibold mb-2">
                  No Events Found
                </p>
                <p className="text-gray-600">
                  {statusFilter !== "all" || titleFilter || dateFilter
                    ? "Try adjusting your filters to find more events."
                    : "No events available at the moment. Check back soon!"}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Title
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Category
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Status
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Start Date
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          End Date
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Action
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedEvents.map((event, index) => (
                      <tr
                        key={event._id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100 transition-colors`}
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-700">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-black">
                            {event.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700 capitalize">
                            {event.eventCategory}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(
                              event.status
                            )}`}
                          >
                            {getStatusIcon(event.status)}
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">
                            <div className="font-medium">
                              {formatDate(event.startingDate)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatTime(event.startingDate)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">
                            <div className="font-medium">
                              {formatDate(event.endingDate)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatTime(event.endingDate)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-gray-700">
                            <MapPin className="w-3.5 h-3.5 text-red-600" />
                            {event.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/events/${event._id}`}
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all hover:shadow-lg"
                          >
                            <Users className="w-4 h-4" />
                            Enroll Now
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Load More Button */}
              {hasMoreEvents && (
                <div className="bg-gray-50 px-6 py-6 flex flex-col items-center gap-3">
                  <div className="text-sm text-gray-700 font-semibold">
                    Showing {displayedEvents.length} of {filteredEvents.length}{" "}
                    events
                  </div>
                  <button
                    onClick={handleLoadMore}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all hover:shadow-lg flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Load More Events
                  </button>
                </div>
              )}

              {/* Show all loaded message */}
              {!hasMoreEvents && filteredEvents.length > 5 && (
                <div className="bg-gray-50 px-6 py-4 text-center">
                  <div className="text-sm text-gray-700 font-semibold">
                    Showing all {filteredEvents.length} events
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Newsletter Subscription Section */}
          <div className="bg-white h-full rounded-2xl shadow-2xl p-8 mt-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-black mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                Stay updated with our latest news, training updates, and
                upcoming events!
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email) {
                    toast.error("Please enter your email address");
                    return;
                  }
                  try {
                    setIsSubscribing(true);
                    await newsletterApi.subscribe(email);
                    toast.success("Successfully subscribed to our newsletter!");
                    setEmail("");
                  } catch (error: any) {
                    toast.error(
                      error.response?.data?.message ||
                        "Failed to subscribe. Please try again."
                    );
                  } finally {
                    setIsSubscribing(false);
                  }
                }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center"
              >
                <div className="relative flex-1 max-w-md w-full">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={isSubscribing}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-red-600 focus:outline-none disabled:opacity-50 shadow-sm border border-gray-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
                >
                  {isSubscribing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
