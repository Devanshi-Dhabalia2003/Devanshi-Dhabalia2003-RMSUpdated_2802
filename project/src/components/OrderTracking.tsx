import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Clock, CheckCircle, XCircle, ChefHat, Truck, Search, UserCheck } from 'lucide-react';
import OrderStatus from './OrderStatus';
import Modal from './Modal';
 
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
  const [staffMembers, setStaffMembers] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState('');
 
  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    } else if (!showSearch) {
      fetchOrders();
    }
    if (user?.user_metadata?.role === 'chef' || user?.user_metadata?.role === 'admin') {
      fetchStaffMembers();
    }
  }, [orderId]);
 
  const fetchStaffMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, name, role')
        .eq('role', 'staff');
 
      if (error) throw error;
      setStaffMembers(data || []);
    } catch (error) {
      console.error('Error fetching staff members:', error);
    }
  };
 
  // fetchOrders
const fetchOrders = async () => {
  try {
    let query = supabase
      .from('orders')
      .select(`
        *,
        table:tables (table_number),
        order_items (quantity, menu_item:menu_items (name, price))
      `)
     
      .order('created_at', { ascending: false });
 
    // Optional role-based filtering here...
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
 
 
 
 // fetchOrder
const fetchOrder = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        table:tables (table_number),
        user:users!orders_user_id_fkey (id, email, raw_user_meta_data),
        staff:users!orders_staff_id_fkey (id, email, raw_user_meta_data),
        order_items (
          quantity,
          menu_item:menu_items (name, price)
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
 
 
const handleAssignStaff = async () => {
  if (!selectedOrder || !selectedStaffId) return;
 
  try {
    console.log("Assigning", selectedStaffId, "to order", selectedOrder.id);
 
    const { data, error } = await supabase
      .from('orders')
      .update({ staff_id: selectedStaffId })
      .eq('id', selectedOrder.id)
      .select(); // ← Add this to see what it returned
 
    if (error) throw error;
 
    console.log("Updated order:", data); // Log what was returned
 
    toast.success('Staff member assigned successfully');
    setIsAssignModalOpen(false);
    setSelectedOrder(null);
    setSelectedStaffId('');
    fetchOrders();
  } catch (error) {
    console.error('Error assigning staff:', error);
    toast.error('Failed to assign staff member');
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
                    Table {order.table?.table_number}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.user?.raw_user_meta_data?.name || order.user?.email}
                  </p>
                  {order.staff && (
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                      Assigned to: {order.staff?.raw_user_meta_data?.name || order.staff?.email}
                    </p>
                  )}
                </div>
              </div>
 
              <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Order Items
                </h4>
                <div className="space-y-2">
                  {order.order_items?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600 dark:text-gray-300">
                        {item.quantity}x {item.menu_item?.name}
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {formatPrice((item.menu_item?.price || 0) * item.quantity)}
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
 
              <div className="flex items-center justify-between">
                <OrderStatus
                  orderId={order.id}
                  initialStatus={order.status}
                  showControls={['admin', 'staff', 'chef'].includes(user?.user_metadata?.role)}
                />
 
                {(user?.user_metadata?.role === 'chef' || user?.user_metadata?.role === 'admin') && (
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsAssignModalOpen(true);
                    }}
                    className="ml-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Assign Staff
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
 
        {orders.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400">No orders found</div>
          </div>
        )}
      </div>
 
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => {
          setIsAssignModalOpen(false);
          setSelectedOrder(null);
          setSelectedStaffId('');
        }}
        title="Assign Staff Member"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Staff Member
            </label>
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select a staff member</option>
              {staffMembers.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name || staff.email}
                </option>
              ))}
            </select>
          </div>
 
          <div className="mt-5 sm:mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsAssignModalOpen(false);
                setSelectedOrder(null);
                setSelectedStaffId('');
              }}
              className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAssignStaff}
              disabled={!selectedStaffId}
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm disabled:opacity-50"
            >
              Assign Staff
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
 
export default OrderTracking;