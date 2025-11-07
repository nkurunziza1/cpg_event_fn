// login
export type loginFormData = {
  email: string;
  password: string;
};

// News/Articles types
export interface News {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNewsData {
  title: string;
  description: string;
  image: File;
}

export interface UpdateNewsData {
  title?: string;
  description?: string;
  image?: File;
}

// Blog types
export interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogData {
  title: string;
  description: string;
  image: File;
}

export interface UpdateBlogData {
  title?: string;
  description?: string;
  image?: File;
}

// Project types
export interface Project {
  _id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  status: "active" | "completed" | "suspended";
  startDate: string;
  endDate: string;
  image: string;
  category: "education" | "health" | "environment" | "technology";
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  targetAmount: number;
  startDate: string;
  endDate: string;
  image: File;
  category: "education" | "health" | "environment" | "technology";
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  targetAmount?: number;
  startDate?: string;
  endDate?: string;
  image?: File;
  category?: "education" | "health" | "environment" | "technology";
  status?: "active" | "completed" | "suspended";
}

// Testimonial types
export interface Testimonial {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonialData {
  title: string;
  description: string;
  image: File;
}

// Newsletter types
export interface Newsletter {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Donation types
// export interface Donation {
//   _id: string;
//   fullname: string;
//   email: string;
//   telephone: string;
//   amount: number;
//   project: string;
//   createdAt: string;
//   updatedAt: string;
// }

// Message types
export interface Message {
  _id: string;
  name: string;
  email: string;
  description: string;
  telephone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageData {
  name: string;
  email: string;
  description: string;
  telephone: string;
}

export interface Donation {
  _id: string;
  fullname: string;
  email: string;
  telephone: string;
  amount: number;
  project: Project;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDonationRequest {
  fullname: string;
  email: string;
  telephone: string;
  amount: number;
  projectId: string;
}

export interface DonationStats {
  overview: {
    totalAmount: number;
    totalCount: number;
    averageAmount: number;
  };
  byProject: {
    projectId: string;
    projectTitle: string;
    totalAmount: number;
    count: number;
  }[];
  monthly: {
    _id: number;
    totalAmount: number;
    count: number;
  }[];
}
