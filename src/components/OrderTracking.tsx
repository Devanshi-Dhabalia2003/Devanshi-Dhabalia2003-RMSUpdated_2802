import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Clock, CheckCircle, XCircle, ChefHat, Truck, Search } from 'lucide-react';
import OrderStatus from './OrderStatus';

interface OrderTrackingProps {
  orderId?: string;
  showSearch?: boolean;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId: propOrderId, showSearch = false }) => {
  const { supabase, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [orderId, setOrderId] = useState(propOrderId);

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    } else if (!showSearch) {
      fetchOrders();
    }
  }, [orderId]);

  const fetchOrders = async () => {
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          table:table_id (table_number),
          user:user_id (
            email,
            raw_app_meta_data->>'name' as name
          ),
          order_items (
            quantity,
            menu_item:menu_item_id (name, price)
          )
        `)
        .order('created_at', { ascending: false });

      // If not admin/staff/chef, only show user's orders
      if (!['admin', 'staff', 'chef'].includes(user?.user_metadata?.role)) {
        query = query.eq('user_id', user?.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrder = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          table:table_id (table_number),
          user:user_id (
            email,
            raw_app_meta_data->>'name' as name
          ),
          order_items (
            quantity,
            menu_item:menu_item_id (name, price)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setOrders(data ? [data] : []);
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchOrderId) {
      setOrderId(searchOrderId);
      fetchOrder(searchOrderId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showSearch && (
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            placeholder="Enter Order ID"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Search className="h-4 w-4 mr-2" />
            Track Order
          </button>
        </form>
      )}

      <div className="space-y-4">
        {orders.map((order: any) => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Order #{order.id.slice(0, 8)}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Placed on {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Table {order.table.table_number}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.user.name || order.user.email}
                  </p>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Order Items
                </h4>
                <div className="space-y-2">
                  {order.order_items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600 dark:text-gray-300">
                        {item.quantity}x {item.menu_item.name}
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {formatPrice(item.menu_item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">Total</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatPrice(order.total_amount)}
                    </span>
                  </div>
                </div>
              </div>

              <OrderStatus
                orderId={order.id}
                initialStatus={order.status}
                showControls={['admin', 'staff', 'chef'].includes(user?.user_metadata?.role)}
              />
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400">No orders found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;