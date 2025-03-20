import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { ChefHat, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import OrderNotifications from '../components/OrderNotifications';
import OrderTracking from '../components/OrderTracking';

const ChefDashboard = () => {
  const { user, supabase } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState('all');
  const [tables, setTables] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    if (user?.user_metadata?.role === 'chef') {
      toast.success(`Welcome back, Chef ${user.user_metadata.name}!`);
    }
    
    const initializeDashboard = async () => {
      await fetchTables();
      await fetchOrders();
    };

    initializeDashboard();

    const ordersSubscription = supabase
      .channel('orders')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'orders' 
      }, handleOrderUpdate)
      .subscribe();

    return () => ordersSubscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [selectedTable]);

  const handleOrderUpdate = () => {
    fetchOrders();
    toast.success('New order update received!');
  };

  const fetchTables = async () => {
    try {
      const { data, error } = await supabase
        .from('tables')
        .select('*')
        .order('table_number');

      if (error) throw error;
      setTables(data || []);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          table:tables(table_number),
          order_items (
            *,
            menu_item:menu_items (
              name,
              preparation_time,
              category:menu_categories(name)
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (selectedTable !== 'all') query = query.eq('table_id', selectedTable);

      const { data, error } = await query;

      if (error) throw error;
      
      const active = data.filter(o => o.preparation_status !== 'completed');
      const completed = data.filter(o => o.preparation_status === 'completed');
      
      setActiveOrders(active);
      setCompletedOrders(completed);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ preparation_status: status })
        .eq('id', orderId);

      if (error) throw error;

      await supabase
        .from('chef_notifications')
        .insert([{
          order_id: orderId,
          status,
          notes: `Order marked as ${status} by chef`
        }]);

      toast.success(`Order status updated to ${status}`);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  if (!user || user.user_metadata.role !== 'chef') {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl dark:text-white">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <ChefHat className="h-8 w-8 mr-2" />
              Chef Dashboard
            </h1>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setShowOrders(false)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  !showOrders
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                <ChefHat className="h-5 w-5 mr-2" />
                Active Orders
              </button>
              <button
                onClick={() => setShowOrders(true)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  showOrders
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                <Clock className="h-5 w-5 mr-2" />
                Order History
              </button>
            </div>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="bg-white dark:bg-gray-700 px-3 py-2 rounded-md border dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Tables</option>
              {tables.map((table) => (
                <option key={table.id} value={table.id}>
                  Table {table.table_number}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showOrders ? (
          <OrderTracking 
            orders={completedOrders}
            onRefresh={fetchOrders}
          />
        ) : (
          <OrderNotifications 
            orders={activeOrders}
            onStatusUpdate={updateOrderStatus}
            tables={tables}
          />
        )}
      </div>
    </div>
  );
};

export default ChefDashboard;