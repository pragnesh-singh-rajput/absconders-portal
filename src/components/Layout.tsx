import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { LogOut, PlusCircle, Search, FileText, BarChart3, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    { label: 'Add New Case', icon: PlusCircle, action: () => navigate('/cases/new') },
    { label: 'Search Records', icon: Search, action: () => navigate('/search') },
    { label: 'Generate Report', icon: FileText, action: () => navigate('/reports') },
    { label: 'View Analytics', icon: BarChart3, action: () => navigate('/analytics') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 hover:text-primary-600 transition-colors duration-200">
              <Shield className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold">Absconders Portal</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium transition-colors duration-200"
              >
                <action.icon className="w-4 h-4" />
                <span className="hidden md:inline">{action.label}</span>
              </motion.button>
            ))}
            
            <ThemeToggle />
            
            {user && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </motion.button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </div>
    </div>
  );
}