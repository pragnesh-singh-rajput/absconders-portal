import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { searchCriminals } from '../services/mongodb';
import { Eye, Edit, AlertTriangle } from 'lucide-react';

export function CaseList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: criminals, isLoading } = useQuery({
    queryKey: ['criminals', searchQuery],
    queryFn: () => searchCriminals(searchQuery),
    enabled: searchQuery.length > 2
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Criminal Records</h1>
        <button
          onClick={() => navigate('/cases/new')}
          className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white"
        >
          Add New Case
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, FIR number, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : criminals && criminals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b dark:border-gray-700">
                  <th className="pb-3 px-4">FIR Number</th>
                  <th className="pb-3 px-4">Name</th>
                  <th className="pb-3 px-4">Age</th>
                  <th className="pb-3 px-4">District</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {criminals.map((criminal) => (
                  <tr
                    key={criminal._id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 px-4">{criminal.firNumber}</td>
                    <td className="py-3 px-4">{criminal.name}</td>
                    <td className="py-3 px-4">{criminal.age}</td>
                    <td className="py-3 px-4">{criminal.district}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        criminal.status === 'active'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : criminal.status === 'arrested'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {criminal.status.charAt(0).toUpperCase() + criminal.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/cases/${criminal._id}`)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/cases/${criminal._id}/edit`)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                          title="Edit Case"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {criminal.warrants.some(w => w.isActive) && (
                          <AlertTriangle className="w-4 h-4 text-red-500" title="Active Warrant" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : searchQuery.length > 2 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No records found matching your search.
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Enter at least 3 characters to search.
          </div>
        )}
      </div>
    </motion.div>
  );
}