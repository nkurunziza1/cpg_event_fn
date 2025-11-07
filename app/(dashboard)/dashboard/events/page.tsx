"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight, Tag, CheckCircle, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RichTextEditor from "@/app/appComponents/dashboard/RichTextEditor";
import {
  eventsApi,
  Event,
  CreateEventData,
  UpdateEventData,
} from "@/app/api/events";
import toast from "react-hot-toast";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState<CreateEventData>({
    title: "",
    description: "",
    eventCategory: "training",
    language: "english",
    status: "pending",
    startingDate: "",
    endingDate: "",
    location: "",
    maxParticipants: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsApi.getAll();
      setEvents(data);
    } catch (error: any) {
      toast.error("Failed to fetch events: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesStatus =
        statusFilter === "all" || event.status === statusFilter;
      const matchesTitle =
        !titleFilter ||
        event.title.toLowerCase().includes(titleFilter.toLowerCase());
      const matchesDate =
        !dateFilter ||
        new Date(event.startingDate)
          .toLocaleDateString()
          .includes(dateFilter) ||
        new Date(event.endingDate).toLocaleDateString().includes(dateFilter);

      return matchesStatus && matchesTitle && matchesDate;
    });
  }, [events, statusFilter, titleFilter, dateFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, titleFilter, dateFilter]);

  // Validate form data
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required.";
    }
    if (!formData.startingDate) {
      errors.startingDate = "Starting date is required.";
    }
    // Validate that starting date is not in the past
    if (formData.startingDate) {
      const startDate = new Date(formData.startingDate);
      const now = new Date();
      now.setSeconds(0, 0); // Reset seconds and milliseconds for comparison
      if (startDate < now) {
        errors.startingDate = "Starting date cannot be in the past.";
      }
    }
    if (!formData.endingDate) {
      errors.endingDate = "Ending date is required.";
    }
    if (
      formData.startingDate &&
      formData.endingDate &&
      new Date(formData.startingDate) >= new Date(formData.endingDate)
    ) {
      errors.endingDate = "Ending date must be after starting date.";
    }
    if (!formData.location.trim()) {
      errors.location = "Location is required.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (editingEvent) {
        await eventsApi.update(editingEvent._id, formData);
        toast.success("Event updated successfully");
        setIsEditDialogOpen(false);
      } else {
        await eventsApi.create(formData);
        toast.success("Event created successfully");
        setIsCreateDialogOpen(false);
      }
      resetForm();
      fetchEvents();
    } catch (error: any) {
      toast.error("Failed to save event: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setDeletingId(id);
      try {
        await eventsApi.delete(id);
        toast.success("Event deleted successfully");
        fetchEvents();
      } catch (error: any) {
        toast.error("Failed to delete event: " + error.message);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Handle edit
  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      eventCategory: event.eventCategory,
      language: event.language,
      status: event.status,
      startingDate: new Date(event.startingDate).toISOString().slice(0, 16),
      endingDate: new Date(event.endingDate).toISOString().slice(0, 16),
      location: event.location,
      maxParticipants: event.maxParticipants,
    });
    setFormErrors({});
    setIsEditDialogOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      eventCategory: "training",
      language: "english",
      status: "pending",
      startingDate: "",
      endingDate: "",
      location: "",
      maxParticipants: undefined,
    });
    setEditingEvent(null);
    setFormErrors({});
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              disabled={isSubmitting}
              variant="default"
              className="font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
            >
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter event title"
                  required
                  disabled={isSubmitting}
                  data-gramm="false"
                  data-gramm_editor="false"
                  data-enable-grammarly="false"
                  autoComplete="off"
                />
                {formErrors.title && (
                  <p className="text-red-600 text-sm font-semibold mt-1">
                    {formErrors.title}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <RichTextEditor
                  content={formData.description}
                  onChange={(content) =>
                    setFormData({ ...formData, description: content })
                  }
                  placeholder="Write your event description..."
                  editable={!isSubmitting}
                />
                {formErrors.description && (
                  <p className="text-red-600 text-sm font-semibold mt-1">
                    {formErrors.description}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventCategory">Event Category</Label>
                  <select
                    id="eventCategory"
                    value={formData.eventCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        eventCategory: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    disabled={isSubmitting}
                  >
                    <option value="training">Training</option>
                    <option value="seminar">Seminar</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    placeholder="e.g., English, French"
                    disabled={isSubmitting}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as any })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startingDate">Starting Date & Time *</Label>
                  <Input
                    id="startingDate"
                    type="datetime-local"
                    value={formData.startingDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startingDate: e.target.value })
                    }
                    min={new Date().toISOString().slice(0, 16)}
                    required
                    disabled={isSubmitting}
                  />
                  {formErrors.startingDate && (
                    <p className="text-red-600 text-sm font-semibold mt-1">
                      {formErrors.startingDate}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="endingDate">Ending Date & Time *</Label>
                  <Input
                    id="endingDate"
                    type="datetime-local"
                    value={formData.endingDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endingDate: e.target.value })
                    }
                    required
                    disabled={isSubmitting}
                  />
                  {formErrors.endingDate && (
                    <p className="text-red-600 text-sm font-semibold mt-1">
                      {formErrors.endingDate}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Enter event location"
                    required
                    disabled={isSubmitting}
                    autoComplete="off"
                  />
                  {formErrors.location && (
                    <p className="text-red-600 text-sm font-semibold mt-1">
                      {formErrors.location}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="maxParticipants">
                    Max Participants (optional)
                  </Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxParticipants: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder="Leave empty for unlimited"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={isSubmitting}
                  className="font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="default"
                  className="font-semibold"
                >
                  {isSubmitting ? "Creating..." : "Create Event"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="statusFilter">Filter by Status</Label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-md"
            >
              <option value="all">Event Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <Label htmlFor="titleFilter">Filter by Title</Label>
            <Input
              id="titleFilter"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              placeholder="Search by title..."
            />
          </div>
          <div>
            <Label htmlFor="dateFilter">Filter by Date</Label>
            <Input
              id="dateFilter"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setStatusFilter("all");
                setTitleFilter("");
                setDateFilter("");
              }}
              className="w-full font-semibold"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Events Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading events...</div>
        </div>
      ) : (
        <>
          <div className="bg-white  shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
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
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 min-w-[180px] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Start Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 min-w-[180px] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        End Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 min-w-[200px] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 min-w-[150px] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Max Participants
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEvents.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-4 text-center text-gray-500 bg-white"
                      >
                        No events found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedEvents.map((event, index) => (
                      <tr
                        key={event._id}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-gray-100 transition-colors`}
                      >
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
                            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full capitalize ${event.status === "active"
                              ? "bg-green-100 text-green-800"
                              : event.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : event.status === "cancelled"
                                  ? "bg-gray-100 text-gray-800"
                                  : event.status === "upcoming"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            <div className="font-medium">
                              {formatDate(event.startingDate)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            <div className="font-medium">
                              {formatDate(event.endingDate)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-sm text-gray-700">
                            <MapPin className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {event.maxParticipants
                              ? event.maxParticipants
                              : "Unlimited"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleEdit(event)}
                              disabled={
                                deletingId === event._id || isSubmitting
                              }
                              className="bg-red-600 hover:bg-red-700 text-white font-medium"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(event._id)}
                              disabled={
                                deletingId === event._id || isSubmitting
                              }
                              className="font-medium"
                            >
                              {deletingId === event._id ? (
                                "Deleting..."
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                <div className="text-sm text-gray-700 font-semibold">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredEvents.length)} of{" "}
                  {filteredEvents.length} events
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="font-medium"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="text-sm text-gray-700 px-4 font-semibold">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="font-medium"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
          >
            <div>
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter event title"
                required
                disabled={isSubmitting}
              />
              {formErrors.title && (
                <p className="text-red-600 text-sm font-semibold mt-1">
                  {formErrors.title}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-description">Description *</Label>
              <RichTextEditor
                content={formData.description}
                onChange={(content) =>
                  setFormData({ ...formData, description: content })
                }
                placeholder="Write your event description..."
                editable={!isSubmitting}
              />
              {formErrors.description && (
                <p className="text-red-600 text-sm font-semibold mt-1">
                  {formErrors.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-eventCategory">Event Category</Label>
                <select
                  id="edit-eventCategory"
                  value={formData.eventCategory}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eventCategory: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                >
                  <option value="training">Training</option>
                  <option value="seminar">Seminar</option>
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-language">Language</Label>
                <Input
                  id="edit-language"
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                  placeholder="e.g., English, French"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <select
                id="edit-status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as any })
                }
                className="w-full px-3 py-2 border rounded-md"
                disabled={isSubmitting}
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-startingDate">
                  Starting Date & Time *
                </Label>
                <Input
                  id="edit-startingDate"
                  type="datetime-local"
                  value={formData.startingDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startingDate: e.target.value })
                  }
                  min={new Date().toISOString().slice(0, 16)}
                  required
                  disabled={isSubmitting}
                />
                {formErrors.startingDate && (
                  <p className="text-red-600 text-sm font-semibold mt-1">
                    {formErrors.startingDate}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="edit-endingDate">Ending Date & Time *</Label>
                <Input
                  id="edit-endingDate"
                  type="datetime-local"
                  value={formData.endingDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endingDate: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                />
                {formErrors.endingDate && (
                  <p className="text-red-600 text-sm font-semibold mt-1">
                    {formErrors.endingDate}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-location">Location *</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter event location"
                  required
                  disabled={isSubmitting}
                />
                {formErrors.location && (
                  <p className="text-red-600 text-sm font-semibold mt-1">
                    {formErrors.location}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="edit-maxParticipants">
                  Max Participants (optional)
                </Label>
                <Input
                  id="edit-maxParticipants"
                  type="number"
                  value={formData.maxParticipants || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxParticipants: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  placeholder="Leave empty for unlimited"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                disabled={isSubmitting}
                className="font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="default"
                className="font-semibold"
              >
                {isSubmitting ? "Updating..." : "Update Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
