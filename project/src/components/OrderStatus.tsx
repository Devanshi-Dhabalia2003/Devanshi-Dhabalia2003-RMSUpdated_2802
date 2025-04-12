import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Clock, CheckCircle, XCircle, ChefHat, Truck } from 'lucide-react';

interface OrderStatusProps {
  orderId: string;
  initialStatus: string;
  showControls: boolean;
}

// Define baseClasses outside the function component
const baseClasses = "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium";

const OrderStatus: React.FC<OrderStatusProps> = ({ orderId, initialStatus, showControls }) => {
  const { supabase, user } = useAuth();
  const [status, setStatus] = useState(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const updateStatus = async (newStatus: string) => {
    if (!showControls) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setStatus(newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      
      // Add to order history
      await supabase.from('order_history').insert([
        {
          order_id: orderId,
          status: newStatus,
          changed_by: user?.id,
          notes: `Status updated to ${newStatus}`,
        }
      ]);
      
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusConfig = (currentStatus: string) => {    
    const statusConfig: { [key: string]: { class: string; icon: React.ReactNode } } = {
      pending: {
        class: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="h-4 w-4" />,
      },
      preparing: {
        class: "bg-blue-100 text-blue-800",
        icon: <ChefHat className="h-4 w-4" />,
      },
      ready: {
        class: "bg-green-100 text-green-800",
        icon: <CheckCircle className="h-4 w-4" />,
      },
      cancelled: {
        class: "bg-red-100 text-red-800",
        icon: <XCircle className="h-4 w-4" />,
      },
      delivered: {
        class: "bg-purple-100 text-purple-800",
        icon: <Truck className="h-4 w-4" />,
      },
    };

    return statusConfig[currentStatus] || statusConfig.pending;
  };

  const statusConfig = getStatusConfig(status.toLowerCase());

  return (
    <div className="flex items-center space-x-4">
      <div className={`${statusConfig.class} ${baseClasses}`}>
        {statusConfig.icon}
        <span className="capitalize">{status}</span>
      </div>

      {showControls && !isUpdating && (
        <div className="flex space-x-2">
          {status !== 'preparing' && (
            <button
              onClick={() => updateStatus('preparing')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              disabled={isUpdating}
            >
              Mark Preparing
            </button>
          )}
          {status !== 'ready' && (
            <button
              onClick={() => updateStatus('ready')}
              className="text-green-600 hover:text-green-800 text-sm font-medium"
              disabled={isUpdating}
            >
              Mark Ready
            </button>
          )}
          {status !== 'delivered' && (
            <button
              onClick={() => updateStatus('delivered')}
              className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              disabled={isUpdating}
            >
              Mark Delivered
            </button>
          )}
          {status !== 'cancelled' && (
            <button
              onClick={() => updateStatus('cancelled')}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
              disabled={isUpdating}
            >
              Cancel Order
            </button>
          )}
        </div>
      )}

      {isUpdating && (
        <span className="text-sm text-gray-500">Updating...</span>
      )}
    </div>
  );
};

export default OrderStatus;