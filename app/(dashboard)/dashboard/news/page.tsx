'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import RichTextEditor from '@/app/appComponents/dashboard/RichTextEditor';
import { newsApi } from '@/app/lib/api-client';
import { News, CreateNewsData, UpdateNewsData } from '@/app/types/dtos';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState<CreateNewsData>({
    title: '',
    description: '',
    image: null as any,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch news
  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await newsApi.getAll();
      setNews(data);
    } catch (error: any) {
      toast.error('Failed to fetch news: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Validate form data
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required.";
    }
    if (!editingNews && !formData.image) {
      errors.image = "Featured Image is required for new news.";
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
      if (editingNews) {
        await newsApi.update(editingNews._id, formData);
        toast.success('News updated successfully');
        setIsEditDialogOpen(false);
      } else {
        await newsApi.create(formData);
        toast.success('News created successfully');
        setIsCreateDialogOpen(false);
      }
      setFormData({ title: '', description: '', image: null as any });
      setEditingNews(null);
      fetchNews();
    } catch (error: any) {
      toast.error('Failed to save news: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this news?')) {
      setDeletingId(id);
      try {
        await newsApi.delete(id);
        toast.success('News deleted successfully');
        fetchNews();
      } catch (error: any) {
        toast.error('Failed to delete news: ' + error.message);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Handle edit
  const handleEdit = (item: News) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: null as any,
    });
    setFormErrors({});
    setIsEditDialogOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({ title: '', description: '', image: null as any});
    setEditingNews(null);
    setFormErrors({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">News Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} disabled={isSubmitting} variant="default" className="font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Create News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New News</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter news title"
                  required
                  disabled={isSubmitting}
                />
                {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <RichTextEditor
                  content={formData.description}
                  onChange={(content) => setFormData({ ...formData, description: content })}
                  placeholder="Write your news content..."
                  editable={!isSubmitting}
                />
                {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
              </div>
              <div>
                <Label htmlFor="image">Featured Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null as any })}
                  required={!editingNews}
                  disabled={isSubmitting}
                />
                {formErrors.image && <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>}
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={isSubmitting} className="font-semibold">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} variant="default" className="font-semibold">
                  {isSubmitting ? "Creating..." : "Create News"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* News Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading news...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="text-sm text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      disabled={deletingId === item._id || isSubmitting}
                      className="font-medium"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id || isSubmitting}
                      className="font-medium"
                    >
                      {deletingId === item._id ? "Deleting..." : <Trash2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit News</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter news title"
                required
                disabled={isSubmitting}
              />
              {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <RichTextEditor
                content={formData.description}
                onChange={(content) => setFormData({ ...formData, description: content })}
                placeholder="Write your news content..."
                editable={!isSubmitting}
              />
              {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
            </div>
            <div>
              <Label htmlFor="edit-image">Featured Image (optional)</Label>
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null as any })}
                disabled={isSubmitting}
              />
              {formErrors.image && <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>}
              <p className="text-sm text-gray-500 mt-1">Leave empty to keep current image</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting} className="font-semibold">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} variant="default" className="font-semibold">
                {isSubmitting ? "Updating..." : "Update News"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
