import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Clock, CheckCircle, XCircle, ChefHat, Truck } from 'lucide-react';

interface OrderStatusProps {
  orderId: string;
  initialStatus?: string;
  showControls?: boolean;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orderId, initialStatus, showControls = false }) => {
  const { user, supabase } = useAuth();
  const [status, setStatus] = useState(initialStatus || 'pending');
  const [statusHistory, setStatusHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    preparing: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    ready: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    completed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    on_the_way: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100'
  };

  const statusIcons = {
    pending: <Clock className="h-5 w-5" />,
    confirmed: <CheckCircle className="h-5 w-5" />,
    preparing: <ChefHat className="h-5 w-5" />,
    ready: <CheckCircle className="h-5 w-5" />,
    completed: <CheckCircle className="h-5 w-5" />,
    cancelled: <XCircle className="h-5 w-5" />,
    on_the_way: <Truck className="h-5 w-5" />
  };

  useEffect(() => {
    fetchStatusHistory();

    // Subscribe to status changes
    const statusSubscription = supabase
      .channel(`order-${orderId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'order_status_history',
        filter: `order_id=eq.${orderId}`
      }, payload => {
        fetchStatusHistory();
        if (payload.new.status) {
          setStatus(payload.new.status);
          toast.success(`Order status updated to ${payload.new.status}`);
        }
      })
      .subscribe();

    return () => {
      statusSubscription.unsubscribe();
    };
  }, [orderId]);

  const fetchStatusHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('order_status_history')
        .select(`
          *,
          changed_by:changed_by(
            email,
            raw_user_meta_data->>'name' as name,
            raw_user_meta_data->>'role' as role
          )
        `)
        .eq('order_id', orderId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStatusHistory(data || []);
    } catch (error) {
      console.error('Error fetching status history:', error);
    }
  };

  const updateStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      // Update order status
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (orderError) throw orderError;

      // Add status history entry
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert([{
          order_id: orderId,
          status: newStatus,
          changed_by: user?.id,
          notes: `Status updated to ${newStatus}`
        }]);

      if (historyError) throw historyError;

      setStatus(newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      fetchStatusHistory();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {statusIcons[status]}
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
          </span>
        </div>

        {showControls && (user?.user_metadata?.role === 'chef' || user?.user_metadata?.role === 'admin') && (
          <select
            value={status}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={loading}
            className="ml-4 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="on_the_way">On the Way</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        )}
      </div>

      {statusHistory.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Status History</h4>
          <div className="space-y-2">
            {statusHistory.map((history: any) => (
              <div
                key={history.id}
                className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between"
              >
                <div>
                  <span className="font-medium">{history.status}</span>
                  {history.changed_by && (
                    <span> by {history.changed_by.name} ({history.changed_by.role})</span>
                  )}
                </div>
                <span>{formatDate(history.created_at)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;