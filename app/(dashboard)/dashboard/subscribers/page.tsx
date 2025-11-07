'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Download, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { newsletterApi } from '@/app/lib/api-client';
import { Newsletter } from '@/app/types/dtos';
import toast from 'react-hot-toast';

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Fetch subscribers
  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const data = await newsletterApi.getSubscribers();
      setSubscribers(data);
    } catch (error: any) {
      toast.error('Failed to fetch subscribers: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Filter subscribers based on search term
  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export subscribers to CSV
  const exportToCSV = () => {
    setIsExporting(true);
    try {
      const csvContent = [
        ['Email', 'Subscription Date'],
        ...filteredSubscribers.map(subscriber => [
          subscriber.email,
          new Date(subscriber.createdAt).toLocaleDateString()
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'newsletter-subscribers.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Subscribers exported successfully');
    } catch (error: any) {
      toast.error('Failed to export subscribers: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="default" disabled={loading || isExporting} className="font-semibold">
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export CSV"}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscribers.filter(sub => {
                const subDate = new Date(sub.createdAt);
                const now = new Date();
                return subDate.getMonth() === now.getMonth() && subDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredSubscribers.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Subscribers List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading subscribers...</div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Subscriber List</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSubscribers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No subscribers found matching your search.' : 'No subscribers yet.'}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredSubscribers.map((subscriber) => (
                  <div
                    key={subscriber._id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{subscriber.email}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Subscribed on {new Date(subscriber.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(subscriber.createdAt).toLocaleTimeString()}
                    </div>
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
