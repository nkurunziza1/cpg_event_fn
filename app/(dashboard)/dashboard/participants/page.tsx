'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Download, Trash2, Calendar, Phone, MapPin, User } from 'lucide-react';
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
        <h1 className="text-3xl font-bold">Event Participants</h1>
        <Button onClick={exportToCSV} variant="default" disabled={loading || isExporting} className="font-semibold">
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>
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
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
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
            <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredRegistrations.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Participants List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading participants...</div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Participant List</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredRegistrations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm || selectedEvent !== 'all' ? 'No participants found matching your filters.' : 'No participants yet.'}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredRegistrations.map((registration) => (
                  <div
                    key={registration._id}
                    className="flex items-center justify-between p-4 border-2 border-black rounded-lg hover:bg-gray-50 bg-white"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-black">{registration.firstName} {registration.lastName}</p>
                          <div className="flex items-center text-sm text-black">
                            <Mail className="h-4 w-4 mr-1" />
                            <span>{registration.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ml-13 text-sm text-black">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{registration.phone}</span>
                        </div>
                        {registration.address && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{registration.address}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Registered on {new Date(registration.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="ml-13 mt-2">
                        <span className="text-xs bg-red-600 text-white px-3 py-1 rounded font-semibold !bg-red-600 !text-white">
                          {(() => {
                            const eventName = getEventName(registration.eventId);
                            return eventName;
                          })()}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(registration._id)}
                      disabled={deletingId === registration._id}
                      className="font-medium"
                    >
                      {deletingId === registration._id ? "Deleting..." : <Trash2 className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
