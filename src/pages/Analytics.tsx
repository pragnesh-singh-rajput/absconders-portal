import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { getAnalytics, getDistrictAnalytics } from '../services/mongodb';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function Analytics() {
  const [timeRange, setTimeRange] = React.useState<'daily' | 'weekly' | 'monthly'>('daily');

  const { data: timeSeriesData, isLoading: isLoadingTimeSeries } = useQuery({
    queryKey: ['analytics', timeRange],
    queryFn: () => getAnalytics(timeRange)
  });

  const { data: districtData, isLoading: isLoadingDistrict } = useQuery({
    queryKey: ['districtAnalytics'],
    queryFn: getDistrictAnalytics
  });

  const timeSeriesChartData = {
    labels: timeSeriesData?.map(d => d._id) || [],
    datasets: [
      {
        label: 'New Cases',
        data: timeSeriesData?.map(d => d.newCases) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Active Warrants',
        data: timeSeriesData?.map(d => d.activeWarrants) || [],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const districtChartData = {
    labels: districtData?.map(d => d._id) || [],
    datasets: [
      {
        label: 'Total Cases',
        data: districtData?.map(d => d.totalCases) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      },
      {
        label: 'Active Warrants',
        data: districtData?.map(d => d.activeWarrants) || [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as 'daily' | 'weekly' | 'monthly')}
          className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Case Trends</h2>
          {isLoadingTimeSeries ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <Line
              data={timeSeriesChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Case and Warrant Trends'
                  }
                }
              }}
            />
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">District-wise Distribution</h2>
          {isLoadingDistrict ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <Bar
              data={districtChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Cases by District'
                  }
                }
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}