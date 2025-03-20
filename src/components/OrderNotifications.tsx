import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Bell, ChefHat } from 'lucide-react';
import OrderStatus from './OrderStatus';

const OrderNotifications = () => {
  const { supabase } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();

    // Subscribe to new orders
    const ordersSubscription = supabase
      .channel('orders')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'orders'
      }, () => {
        toast.success('New order received!');
        fetchNotifications();
      })
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('chef_order_notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="text-gray-500 dark:text-gray-400">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Order Notifications
        </h2>
        <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100 px-2 py-1 rounded-full text-sm">
          {notifications.length} Active Orders
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No active orders at the moment</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {notifications.map((notification: any) => (
            <div
              key={notification.order_id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Table {notification.table_number}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Order placed at {new Date(notification.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {notification.menu_items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-900 dark:text-white">
                      {item.quantity}x {item.name}
                    </span>
                    {item.notes && (
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        Note: {item.notes}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <OrderStatus
                orderId={notification.order_id}
                initialStatus={notification.status}
                showControls={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderNotifications;