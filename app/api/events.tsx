import apiClient from "../lib/api-client";

export interface Event {
  _id: string;
  title: string;
  description: string;
  eventCategory: "training" | "seminar" | "conference" | "workshop" | "other";
  language: string;
  status: "pending" | "active" | "completed" | "cancelled" | "upcoming";
  startingDate: string;
  endingDate: string;
  location: string;
  maxParticipants?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  eventCategory: "training" | "seminar" | "conference" | "workshop" | "other";
  language: string;
  status: "pending" | "active" | "completed" | "cancelled" | "upcoming";
  startingDate: string;
  endingDate: string;
  location: string;
  maxParticipants?: number;
}

export interface UpdateEventData {
  title?: string;
  description?: string;
  eventCategory?: "training" | "seminar" | "conference" | "workshop" | "other";
  language?: string;
  status?: "pending" | "active" | "completed" | "cancelled" | "upcoming";
  startingDate?: string;
  endingDate?: string;
  location?: string;
  maxParticipants?: number;
}

export interface EventRegistration {
  _id: string;
  eventId: string | Event;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  additionalInfo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRegistrationData {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  additionalInfo?: string;
}

export const eventsApi = {
  // Create event
  create: async (data: CreateEventData): Promise<Event> => {
    const response = await apiClient.post("/events", data);
    return response.data.event;
  },

  // Get all events
  getAll: async (): Promise<Event[]> => {
    const response = await apiClient.get("/events");
    return response.data;
  },

  // Get single event
  getById: async (id: string): Promise<Event> => {
    const response = await apiClient.get(`/events/${id}`);
    return response.data.message;
  },

  // Update event
  update: async (id: string, data: UpdateEventData): Promise<Event> => {
    const response = await apiClient.patch(`/events/${id}`, data);
    return response.data.eventUpdate;
  },

  // Delete event
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/events/${id}`);
  },
};

export const eventRegistrationsApi = {
  // Register for event
  register: async (data: CreateEventRegistrationData): Promise<EventRegistration> => {
    const response = await apiClient.post("/event-registrations", data);
    return response.data.registration;
  },

  // Get registrations for an event
  getByEvent: async (eventId: string): Promise<EventRegistration[]> => {
    const response = await apiClient.get(`/event-registrations/event/${eventId}`);
    return response.data;
  },

  // Get all registrations (admin only)
  getAll: async (): Promise<EventRegistration[]> => {
    const response = await apiClient.get("/event-registrations");
    return response.data;
  },

  // Delete registration
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/event-registrations/${id}`);
  },
};
