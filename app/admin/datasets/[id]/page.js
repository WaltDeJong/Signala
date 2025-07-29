'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/useAuth';
import Link from 'next/link';

export default function DatasetView({ params }) {
  const { user, loading } = useAuth();
  const [dataset, setDataset] = useState(null);
  const [dataPoints, setDataPoints] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loadingDataset, setLoadingDataset] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    } else if (user && params.id) {
      fetchDataset();
      fetchDataPoints();
    }
  }, [user, loading, router, params.id]);

  const fetchDataset = async () => {
    try {
      const response = await fetch(`/api/admin/datasets/${params.id}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setDataset(data);
        initializeFormData(data.schema);
      } else {
        setError('Failed to fetch dataset');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoadingDataset(false);
    }
  };

  const fetchDataPoints = async (page = 1) => {
    try {
      const response = await fetch(`/api/admin/datasets/${params.id}/data?page=${page}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setDataPoints(result.data);
        setPagination(result.pagination);
      } else {
        setError('Failed to fetch data points');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoadingData(false);
    }
  };

  const initializeFormData = (schema) => {
    const initialData = {};
    Object.keys(schema.properties || {}).forEach(key => {
      const property = schema.properties[key];
      switch (property.type) {
        case 'string':
          initialData[key] = '';
          break;
        case 'number':
          initialData[key] = 0;
          break;
        case 'boolean':
          initialData[key] = false;
          break;
        case 'array':
          initialData[key] = [];
          break;
        default:
          initialData[key] = '';
      }
    });
    setFormData(initialData);
  };

  const handleInputChange = (key, value, type) => {
    let processedValue = value;
    
    if (type === 'number') {
      processedValue = parseFloat(value) || 0;
    } else if (type === 'boolean') {
      processedValue = value === 'true';
    } else if (type === 'array') {
      processedValue = value.split(',').map(item => item.trim()).filter(item => item);
    }

    setFormData({ ...formData, [key]: processedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/datasets/${params.id}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        setShowAddForm(false);
        initializeFormData(dataset.schema);
        fetchDataPoints();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create data point');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteDataPoint = async (dataId) => {
    if (!confirm('Are you sure you want to delete this data point?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/datasets/${params.id}/data/${dataId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setDataPoints(dataPoints.filter(d => d.id !== dataId));
      } else {
        setError('Failed to delete data point');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const renderFormField = (key, property) => {
    const value = formData[key] || '';
    
    switch (property.type) {
      case 'string':
        return (
          <input
            type="text"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value, 'string')}
            required={dataset.schema.required?.includes(key)}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            step="any"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value, 'number')}
            required={dataset.schema.required?.includes(key)}
          />
        );
      case 'boolean':
        return (
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={value.toString()}
            onChange={(e) => handleInputChange(key, e.target.value, 'boolean')}
            required={dataset.schema.required?.includes(key)}
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        );
      case 'array':
        return (
          <input
            type="text"
            placeholder="Enter comma-separated values"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={Array.isArray(value) ? value.join(', ') : ''}
            onChange={(e) => handleInputChange(key, e.target.value, 'array')}
            required={dataset.schema.required?.includes(key)}
          />
        );
      default:
        return (
          <input
            type="text"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value, 'string')}
            required={dataset.schema.required?.includes(key)}
          />
        );
    }
  };

  const renderDataValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'boolean') {
      return value ? 'True' : 'False';
    }
    return String(value);
  };

  if (loading || loadingDataset) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !dataset) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{dataset.name}</h1>
              <p className="text-gray-600">{dataset.description || 'No description'}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                {showAddForm ? 'Cancel' : 'Add Data Point'}
              </button>
              <Link
                href={`/admin/datasets/${params.id}/edit`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Edit Dataset
              </Link>
              <Link
                href="/admin"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Add Data Form */}
          {showAddForm && (
            <div className="mb-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Add New Data Point</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {Object.entries(dataset.schema.properties || {}).map(([key, property]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700">
                        {key}
                        {dataset.schema.required?.includes(key) && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      {renderFormField(key, property)}
                      {property.description && (
                        <p className="mt-1 text-sm text-gray-500">{property.description}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  >
                    {submitting ? 'Adding...' : 'Add Data Point'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Data Points List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Data Points</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {pagination.total || 0} total data points
              </p>
            </div>

            {loadingData ? (
              <div className="px-4 py-5 text-center">Loading data points...</div>
            ) : dataPoints.length === 0 ? (
              <div className="px-4 py-5 text-center text-gray-500">
                No data points found. Add your first data point to get started.
              </div>
            ) : (
              <>
                <ul className="divide-y divide-gray-200">
                  {dataPoints.map((dataPoint) => (
                    <li key={dataPoint.id}>
                      <div className="px-4 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                              {Object.entries(dataPoint.data).map(([key, value]) => (
                                <div key={key} className="text-sm">
                                  <span className="font-medium text-gray-900">{key}:</span>{' '}
                                  <span className="text-gray-600">{renderDataValue(value)}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-2 text-xs text-gray-400">
                              Created: {new Date(dataPoint.created_at).toLocaleString()}
                            </div>
                          </div>
                          <div className="ml-4">
                            <button
                              onClick={() => deleteDataPoint(dataPoint.id)}
                              className="text-red-600 hover:text-red-900 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => fetchDataPoints(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => fetchDataPoints(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing page <span className="font-medium">{pagination.page}</span> of{' '}
                          <span className="font-medium">{pagination.totalPages}</span>
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <button
                            onClick={() => fetchDataPoints(pagination.page - 1)}
                            disabled={pagination.page <= 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Previous
                          </button>
                          <button
                            onClick={() => fetchDataPoints(pagination.page + 1)}
                            disabled={pagination.page >= pagination.totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

