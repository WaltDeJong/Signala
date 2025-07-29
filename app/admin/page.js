'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/useAuth';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const [datasets, setDatasets] = useState([]);
  const [loadingDatasets, setLoadingDatasets] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    } else if (user) {
      fetchDatasets();
    }
  }, [user, loading, router]);

  const fetchDatasets = async () => {
    try {
      const response = await fetch('/api/admin/datasets', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setDatasets(data);
      } else {
        setError('Failed to fetch datasets');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoadingDatasets(false);
    }
  };

  const deleteDataset = async (id, name) => {
    if (!confirm(`Are you sure you want to delete the dataset "${name}"? This will also delete all associated data points.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/datasets/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setDatasets(datasets.filter(d => d.id !== id));
      } else {
        setError('Failed to delete dataset');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.username}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Actions */}
          <div className="mb-6">
            <Link
              href="/admin/datasets/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Dataset
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Datasets List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Datasets</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage your data collections and their schemas
              </p>
            </div>

            {loadingDatasets ? (
              <div className="px-4 py-5 text-center">Loading datasets...</div>
            ) : datasets.length === 0 ? (
              <div className="px-4 py-5 text-center text-gray-500">
                No datasets found. Create your first dataset to get started.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {datasets.map((dataset) => (
                  <li key={dataset.id}>
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {dataset.name}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {Object.keys(dataset.schema.properties || {}).length} fields
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="flex items-center text-sm text-gray-500">
                            {dataset.description || 'No description'}
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          Created: {new Date(dataset.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="ml-4 flex space-x-2">
                        <Link
                          href={`/admin/datasets/${dataset.id}`}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          View Data
                        </Link>
                        <Link
                          href={`/admin/datasets/${dataset.id}/edit`}
                          className="text-green-600 hover:text-green-900 text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteDataset(dataset.id, dataset.name)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
