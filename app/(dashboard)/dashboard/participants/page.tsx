'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Download, Trash2, Calendar, Phone, MapPin, User, Grid3x3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { eventRegistrationsApi, EventRegistration } from '@/app/api/events';
import { eventsApi, Event } from '@/app/api/events';
import toast from 'react-hot-toast';

export default function ParticipantsPage() {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch registrations and events
  const fetchData = async () => {
    try {
      setLoading(true);
      const [regsData, eventsData] = await Promise.all([
        eventRegistrationsApi.getAll(),
        eventsApi.getAll(),
      ]);

      setRegistrations(regsData);
      setEvents(eventsData);
    } catch (error: any) {
      toast.error('Failed to fetch data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Handle both string ID and populated event object
    const eventIdValue = typeof reg.eventId === 'object' && reg.eventId !== null && '_id' in reg.eventId
      ? (reg.eventId as Event)._id
      : reg.eventId;
    const matchesEvent = selectedEvent === 'all' || eventIdValue === selectedEvent;

    return matchesSearch && matchesEvent;
  });

  // Get event name - handles both populated objects and string IDs
  const getEventName = (eventIdOrEvent: string | Event | any): string => {
    try {
      // Case 1: Already populated event object with title (from backend populate)
      if (eventIdOrEvent && typeof eventIdOrEvent === 'object') {
        // Check if it's a populated event object
        if ('title' in eventIdOrEvent) {
          const title = (eventIdOrEvent as any).title;
          if (title && typeof title === 'string' && title.trim() !== '') {
            return title;
          }
        }

        // If object has _id, try to look it up in events array
        if ('_id' in eventIdOrEvent) {
          const eventId = String((eventIdOrEvent as any)._id);
          const event = events.find(e => String(e._id) === eventId);
          if (event && event.title) return event.title;
        }
      }

      // Case 2: String ID - look up in events array
      if (typeof eventIdOrEvent === 'string' && eventIdOrEvent.trim() !== '') {
        const event = events.find(e => String(e._id) === eventIdOrEvent);
        if (event && event.title) return event.title;
      }

      // Fallback - return unknown if events not loaded yet or not found
      return events.length > 0 ? 'Unknown Event' : 'Loading...';
    } catch (error) {
      console.error('Error getting event name:', error, eventIdOrEvent);
      return 'Unknown Event';
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    setIsExporting(true);
    try {
      const csvContent = [
        ['Event', 'First Name', 'Last Name', 'Email', 'Phone', 'Address', 'Registration Date'],
        ...filteredRegistrations.map(reg => [
          getEventName(reg.eventId),
          reg.firstName,
          reg.lastName,
          reg.email,
          reg.phone,
          reg.address || '',
          new Date(reg.createdAt).toLocaleDateString()
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'event-participants.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Participants exported successfully');
    } catch (error: any) {
      toast.error('Failed to export participants: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this registration?')) {
      setDeletingId(id);
      try {
        await eventRegistrationsApi.delete(id);
        toast.success('Registration deleted successfully');
        fetchData();
      } catch (error: any) {
        toast.error('Failed to delete registration: ' + error.message);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black">Event Participants</h1>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              onClick={() => setViewMode('grid')}
              variant="ghost"
              size="sm"
              className={`font-medium ${viewMode === 'grid' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600'}`}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setViewMode('list')}
              variant="ghost"
              size="sm"
              className={`font-medium ${viewMode === 'list' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={exportToCSV} variant="default" disabled={loading || isExporting} className="font-semibold">
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export CSV"}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="all">All Events</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-black">Total Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{registrations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-black">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {registrations.filter(reg => {
                const regDate = new Date(reg.createdAt);
                const now = new Date();
                return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-black">Filtered Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{filteredRegistrations.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Participants List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-black">Loading participants...</div>
        </div>
      ) : (
        <div>
          {filteredRegistrations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-500 text-lg">
                {searchTerm || selectedEvent !== 'all' ? 'No participants found matching your filters.' : 'No participants yet.'}
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            // Grid View (Columns)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRegistrations.map((registration) => (
                <div
                  key={registration._id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col"
                >
                  {/* Header with Participant Info */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-black truncate">
                        {registration.firstName} {registration.lastName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
                        <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="truncate">{registration.email}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(registration._id)}
                      disabled={deletingId === registration._id}
                      className="font-medium flex-shrink-0 ml-auto"
                      title="Delete participant"
                    >
                      {deletingId === registration._id ? (
                        <span className="text-xs whitespace-nowrap">Deleting...</span>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Event Badge */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Event</span>
                    </div>
                    <div className="py-2">
                      <span className="inline-block rounded-lg px-3 py-2 bg-red text-white text-sm font-semibold break-words">
                        {(() => {
                          const eventName = getEventName(registration.eventId);
                          return eventName;
                        })()}
                      </span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Phone className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className="truncate">{registration.phone}</span>
                    </div>
                    {registration.address && (
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{registration.address}</span>
                      </div>
                    )}
                  </div>

                  {/* Registration Date */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="break-words">
                        Registered on {new Date(registration.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })} at {new Date(registration.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View (Rows)
            <div className="space-y-4">
              {filteredRegistrations.map((registration) => (
                <div
                  key={registration._id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Left: Avatar and Basic Info */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-black" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-black mb-1">
                              {registration.firstName} {registration.lastName}
                            </h3>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
                              <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
                              <span className="truncate">{registration.email}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(registration._id)}
                            disabled={deletingId === registration._id}
                            className="font-medium flex-shrink-0"
                            title="Delete participant"
                          >
                            {deletingId === registration._id ? (
                              <span className="text-xs whitespace-nowrap">Deleting...</span>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        {/* Event Badge */}
                        <div className="mb-3 ">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-red-600 flex-shrink-0" />
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Event</span>
                          </div>
                          <div className="py-2">
                            <span className="inline-block rounded-lg px-3 py-2 bg-red-600 text-white text-sm font-semibold break-words">
                              {(() => {
                                const eventName = getEventName(registration.eventId);
                                return eventName;
                              })()}
                            </span>
                          </div>
                        </div>

                        {/* Contact Information - Horizontal Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Phone className="w-4 h-4 text-red-600 flex-shrink-0" />
                            <span className="truncate">{registration.phone}</span>
                          </div>
                          {registration.address && (
                            <div className="flex items-start gap-2 text-sm text-gray-700">
                              <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span className="truncate">{registration.address}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span className="whitespace-nowrap">
                              {new Date(registration.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })} at {new Date(registration.createdAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
