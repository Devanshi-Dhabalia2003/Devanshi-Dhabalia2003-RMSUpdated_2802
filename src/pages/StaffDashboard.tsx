import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Table as TableIcon, Clock } from 'lucide-react';
import OrderTracking from '../components/OrderTracking';

const StaffDashboard = () => {
  const { user, supabase } = useAuth();
  const [tables, setTables] = useState([]);
  const [activeShift, setActiveShift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch tables data
      const { data: tablesData } = await supabase
        .from('tables')
        .select('*')
        .order('table_number');

      if (tablesData) setTables(tablesData);

      // Fetch active shift
      const { data: shiftData } = await supabase
        .from('staff_shifts')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'active')
        .single();

      if (shiftData) setActiveShift(shiftData);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const updateTableStatus = async (tableId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('tables')
        .update({ status })
        .eq('id', tableId);

      if (error) throw error;

      await supabase
        .from('table_status_history')
        .insert([{
          table_id: tableId,
          status,
          changed_by: user?.id,
          notes: `Status updated to ${status} by staff`
        }]);

      fetchDashboardData();
    } catch (error) {
      console.error('Error updating table status:', error);
    }
  };

  if (!user || user.user_metadata.role !== 'staff') {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl dark:text-white">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Staff Dashboard
            </h1>
          </div>
          {activeShift && (
            <div className="mt-4 flex items-center justify-start md:mt-0 md:ml-4">
              <Clock className="h-5 w-5 text-gray-400 dark:text-gray-300 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-300">
                Shift: {new Date(activeShift.start_time).toLocaleTimeString()} - 
                {new Date(activeShift.end_time).toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>

        {/* Toggle between Tables and Orders */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setShowOrders(false)}
            className={`px-4 py-2 rounded-md transition-colors ${
              !showOrders
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            <TableIcon className="h-5 w-5 inline-block mr-2" />
            Tables
          </button>
          <button
            onClick={() => setShowOrders(true)}
            className={`px-4 py-2 rounded-md transition-colors ${
              showOrders
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            <Clock className="h-5 w-5 inline-block mr-2" />
            Orders
          </button>
        </div>

        {showOrders ? (
          <OrderTracking />
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                <TableIcon className="h-5 w-5 inline-block mr-2" />
                Table Management
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {tables.map((table: any) => (
                  <div key={table.id} className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          Table {table.table_number}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          table.status === 'available' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                          table.status === 'occupied' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                          table.status === 'reserved' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
                        }`}>
                          {table.status}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        <p>Capacity: {table.capacity} people</p>
                      </div>
                      <div className="mt-4">
                        <select
                          value={table.status}
                          onChange={(e) => updateTableStatus(table.id, e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-600 dark:text-white dark:border-gray-500"
                        >
                          <option value="available">Available</option>
                          <option value="reserved">Reserved</option>
                          <option value="occupied">Occupied</option>
                          <option value="cleaning">Cleaning</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;