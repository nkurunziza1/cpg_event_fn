export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    createdAt: string;
  }
  
  // app/lib/api.ts
  export async function fetchPost(slug: string): Promise<BlogPost> {
    // For development, you might want to add a small delay to simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    // Simulate API call
    const posts: Record<string, BlogPost> = {
      'hello-world': {
        id: '1',
        slug: 'hello-world',
        title: 'Hello World',
        excerpt: 'This is my first blog post about programming and technology.',
        content: 'Full content of the blog post goes here...',
        featuredImage: '/images/hello-world.jpg',
        createdAt: '2024-01-01T00:00:00Z',
      },
      'getting-started-with-nextjs': {
        id: '2',
        slug: 'getting-started-with-nextjs',
        title: 'Getting Started with Next.js',
        excerpt: 'Learn how to build modern web applications with Next.js',
        content: 'Detailed tutorial content goes here...',
        featuredImage: '/images/nextjs-tutorial.jpg',
        createdAt: '2024-01-02T00:00:00Z',
      },
    };
  
    // Simulate error if post doesn't exist
    if (!posts[slug]) {
      throw new Error(`Post with slug "${slug}" not found`);
    }
  
    return posts[slug];
  }
  
  // app/blog/[slug]/page.tsx