# Dashboard Setup Guide

## Overview
This dashboard provides a comprehensive management interface for your AFOR website with the following features:

- **Articles Management**: Create, edit, and delete news articles with rich text editor
- **Blogs Management**: Manage blog posts with rich text editor
- **Projects Management**: Handle fundraising projects with progress tracking
- **Testimonials Management**: Manage customer testimonials
- **Donations Management**: View and export donation data
- **Subscribers Management**: Manage newsletter subscribers
- **Messages Management**: View contact form submissions
- **Statistics Dashboard**: Overview of all content and metrics

## Features Implemented

### 1. Rich Text Editor
- Full-featured editor with formatting options
- Image insertion support
- Link management
- Text alignment and styling
- Undo/Redo functionality

### 2. CRUD Operations
- Create new content (articles, blogs, projects, testimonials)
- Read/View existing content
- Update existing content
- Delete content with confirmation

### 3. File Upload Support
- Image upload for all content types
- File validation (size, type)
- Preview functionality

### 4. Data Management
- Export functionality (CSV)
- Search and filtering
- Statistics and analytics
- Real-time data updates

## API Integration

The dashboard integrates with your backend APIs:

- **News/Articles**: `/news` endpoints
- **Blogs**: `/blog` and `/blogs` endpoints  
- **Projects**: `/project` endpoints
- **Testimonials**: `/testmonial` endpoints
- **Newsletter**: `/newsletter` endpoints
- **Messages**: `/message` endpoints
- **Donations**: `/donations` endpoints (to be implemented)

## Environment Setup

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

## Usage

1. **Login**: Access the dashboard through `/login`
2. **Navigation**: Use the sidebar to navigate between sections
3. **Create Content**: Click "Create" buttons to add new content
4. **Edit Content**: Click edit icons on existing content
5. **Delete Content**: Click delete icons with confirmation
6. **Export Data**: Use export buttons for CSV downloads

## Dashboard Pages

- `/dashboard/stats` - Overview and statistics
- `/dashboard/articles` - News/Articles management
- `/dashboard/blogs` - Blog management
- `/dashboard/projects` - Project management
- `/dashboard/testimonials` - Testimonial management
- `/dashboard/donators` - Donation management
- `/dashboard/subscribers` - Newsletter subscribers
- `/dashboard/messages` - Contact messages

## Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **Rich Text Editor**: Tiptap
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Authentication**: JWT tokens with cookies

## File Structure

```
app/
├── (dashboard)/
│   ├── dashboard/
│   │   ├── articles/page.tsx
│   │   ├── blogs/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── testimonials/page.tsx
│   │   ├── donators/page.tsx
│   │   ├── subscribers/page.tsx
│   │   ├── messages/page.tsx
│   │   └── stats/page.tsx
│   └── layout.tsx
├── appComponents/
│   └── dashboard/
│       └── RichTextEditor.tsx
├── lib/
│   └── api-client.ts
└── types/
    └── dtos.ts
```

## Next Steps

1. **Backend Integration**: Ensure your backend APIs match the expected endpoints
2. **Authentication**: Verify JWT token handling
3. **File Upload**: Configure file upload handling in backend
4. **Environment Variables**: Set up proper environment configuration
5. **Testing**: Test all CRUD operations
6. **Deployment**: Deploy to your hosting platform

## Notes

- The dashboard maintains your existing home page styling
- All static data has been replaced with API integration
- Rich text editor is only used in the dashboard, not on public pages
- File uploads are handled through FormData
- All API calls include proper error handling and user feedback
