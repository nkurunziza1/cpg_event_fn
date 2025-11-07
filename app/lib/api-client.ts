import axios from "axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import {
  News,
  CreateNewsData,
  UpdateNewsData,
  Blog,
  CreateBlogData,
  UpdateBlogData,
  Project,
  CreateProjectData,
  UpdateProjectData,
  Testimonial,
  CreateTestimonialData,
  Newsletter,
  Donation,
  Message,
  CreateMessageData,
  DonationStats,
  CreateDonationRequest,
} from "../types/dtos";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

type singleBlog = {
  message: {
    _id: string;
    title: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
};

type singleNews = {
  message: {
    _id: string;
    title: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
};

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      toast.error("Session expired. Please login again.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Helper function to create FormData
const createFormData = (data: any): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

// News/Articles API
export const newsApi = {
  // Create news
  create: async (data: CreateNewsData): Promise<News> => {
    const formData = createFormData(data);
    const response = await apiClient.post("/news", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Get all news
  getAll: async (): Promise<News[]> => {
    const response = await apiClient.get("/news");
    return response.data;
  },

  // Get single news
  getById: async (id: string): Promise<singleNews> => {
    const response = await apiClient.get(`/news/${id}`);
    return response.data.message;
  },

  // Update news
  update: async (id: string, data: UpdateNewsData): Promise<News> => {
    const formData = createFormData(data);
    const response = await apiClient.patch(`/news/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete news
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/news/${id}`);
  },
};

// Blogs API
export const blogsApi = {
  // Create blog
  create: async (data: CreateBlogData): Promise<Blog> => {
    const formData = createFormData(data);
    const response = await apiClient.post("/blog", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.message;
  },

  // Get all blogs
  getAll: async (): Promise<Blog[]> => {
    const response = await apiClient.get("/blogs");
    return response.data;
  },

  // Get single blog
  getById: async (id: string): Promise<singleBlog> => {
    const response = await apiClient.get(`/blogs/${id}`);
    return response.data;
  },

  // Update blog
  update: async (id: string, data: UpdateBlogData): Promise<Blog> => {
    const formData = createFormData(data);
    const response = await apiClient.patch(`/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete blog
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/blogs/${id}`);
  },
};

// Projects API
export const projectsApi = {
  create: async (data: CreateProjectData): Promise<Project> => {
    const formData = createFormData(data);
    const response = await apiClient.post("/project", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Get all projects
  getAll: async (): Promise<Project[]> => {
    const response = await apiClient.get("/project");
    return response.data;
  },

  // Get recent completed projects
  getRecentProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get("/project/recent/l");
    console.log("recent projects", response.data);
    return response.data;
  },

  // Get single project
  getById: async (id: string): Promise<Project> => {
    const response = await apiClient.get(`/project/${id}`);
    return response.data;
  },

  // Update project
  update: async (id: string, data: UpdateProjectData): Promise<Project> => {
    const formData = createFormData(data);
    const response = await apiClient.patch(`/project/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete project
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/project/${id}`);
  },
};

// Testimonials API
export const testimonialsApi = {
  // Create testimonial
  create: async (data: CreateTestimonialData): Promise<Testimonial> => {
    const formData = createFormData(data);
    const response = await apiClient.post("/testmonial", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Get all testimonials
  getAll: async (): Promise<Testimonial[]> => {
    const response = await apiClient.get("/testmonial");
    return response.data;
  },

  // Delete testimonial
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/testmonial/${id}`);
  },
};

// Newsletter API
export const newsletterApi = {
  // Subscribe to newsletter
  subscribe: async (email: string): Promise<void> => {
    await apiClient.post("/newsletter", { email });
  },

  // Get all subscribers
  getSubscribers: async (): Promise<Newsletter[]> => {
    const response = await apiClient.get("/newsletter");
    return response.data;
  },
};

// Messages API
export const messagesApi = {
  // Create message
  create: async (data: CreateMessageData): Promise<Message> => {
    const response = await apiClient.post("/message", data);
    return response.data;
  },
};

// Donations API (if you have endpoints for this)
export const donationsApi = {
  getAll: async (): Promise<Donation[]> => {
    const response = await apiClient.get("/donations");
    return response.data;
  },

  // Get donations for a specific project
  getByProject: async (projectId: string): Promise<Donation[]> => {
    const response = await apiClient.get(`/project/${projectId}/donation`);
    return response.data;
  },

  // Get donation statistics
  getStats: async (): Promise<DonationStats> => {
    const response = await apiClient.get("/donations/stats");
    return response.data;
  },

  // Create a new donation
  create: async (donationData: CreateDonationRequest): Promise<Donation> => {
    const response = await apiClient.post("/donate", donationData);
    return response.data;
  },
};

export default apiClient;
