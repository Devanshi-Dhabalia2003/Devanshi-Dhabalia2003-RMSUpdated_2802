import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Table as TableIcon, Clock } from 'lucide-react';
 
const StaffDashboard = () => {
  const { user, supabase } = useAuth();
  const [tables, setTables] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeShift, setActiveShift] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
 
  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user]);
 
  const fetchDashboardData = async () => {
    if (!user?.id) {
      console.warn('User ID not available yet');
      return;
    }
 
    try {
      const { data: tablesData } = await supabase
        .from('tables')
        .select('*')
        .order('table_number');
 
      if (tablesData) setTables(tablesData);
 
      const { data: shiftData, error: shiftError } = await supabase
        .from('staff_shifts')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();
 
      if (shiftError) {
        console.error('Error fetching shift:', shiftError);
      } else {
        setActiveShift(shiftData);
      }
 
      const { data: assignedOrders, error: ordersError } = await supabase
        .from('orders')
        .select(`
          id,
          created_at,
          table:tables (table_number),
          order_items (
            quantity,
            menu_items (name, price)
          )
        `)
        .eq('staff_id', user.id)
        .order('created_at', { ascending: false });
 
      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      } else {
        setOrders(assignedOrders || []);
      }
 
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
 
      await supabase.from('table_status_history').insert([
        {
          table_id: tableId,
          status,
          changed_by: user?.id,
          notes: 'Status updated to ${status} by staff',
        },
      ]);
 
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating table status:', error);
    }
  };
 
  if (!user || user.user_metadata?.role !== 'staff') {
    return <Navigate to="/login" />;
  }
 
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
          {activeShift && (
            <div className="mt-4 flex items-center md:mt-0 md:ml-4">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">
                Shift: {new Date(activeShift.start_time).toLocaleTimeString()} -{' '}
                {new Date(activeShift.end_time).toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>
 
        {/* Toggle View */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setShowOrders(false)}
            className={`px-4 py-2 rounded-md ${
              !showOrders ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <TableIcon className="h-5 w-5 inline-block mr-2" />
            Tables
          </button>
          <button
            onClick={() => setShowOrders(true)}
            className={`px-4 py-2 rounded-md ${
              showOrders ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Clock className="h-5 w-5 inline-block mr-2" />
            Orders
          </button>
        </div>
 
        {/* Orders View */}
        {showOrders ? (
          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="bg-white p-4 rounded-md shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-bold text-gray-800">
                      Table {order.table?.table_number ?? 'N/A'}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleString()}
                    </span>
                  </div>
                  <ul className="pl-4 list-disc text-sm text-gray-700">
                    {order.order_items?.length > 0 ? (
                      order.order_items.map((item: any, index: number) => (
                        <li key={index}>
                          {item.menu_items?.name ?? 'Unknown Item'} × {item.quantity} — ₹
                          {item.menu_items?.price?.toFixed(2) ?? '0.00'}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 italic">No items in this order.</li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No orders assigned to you yet.</div>
            )}
          </div>
        ) : (
          // Tables View
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">
                <TableIcon className="h-5 w-5 inline-block mr-2" />
                Table Management
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {tables.map((table) => (
                  <div key={table.id} className="bg-gray-50 shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          Table {table.table_number}
                        </h4>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            table.status === 'available'
                              ? 'bg-green-100 text-green-800'
                              : table.status === 'occupied'
                              ? 'bg-red-100 text-red-800'
                              : table.status === 'reserved'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {table.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Capacity: {table.capacity}</p>
                      <div className="mt-4">
                        <select
                          value={table.status}
                          onChange={(e) => updateTableStatus(table.id, e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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