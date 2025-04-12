import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { Plus, Edit, Trash2 } from "lucide-react";

const StaffManagement = () => {
  const { supabase } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
    phone: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState("staff");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch Users from Supabase
  const fetchUsers = async () => {
    setLoading(true);
    try {
      let query = supabase.from("users").select("*");

      if (userType !== "all") {
        query = query.eq("role", userType);
      }

      if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      setUsers(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch users");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, userType]);

  // Handle Delete User
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setLoading(true);
  
    try {
      // First delete from public.users
      const { error: dbError } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
  
      if (dbError) throw dbError;
  
      // Then delete from auth.users (requires admin privileges)
      const { error: authError } = await supabase.auth.admin.deleteUser(id);
      if (authError) throw authError;
  
      setUsers(prev => prev.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete user');
      console.error('Delete error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingUser) {
        // Update public.users table
        const { error: dbError } = await supabase
          .from('users')
          .update({
            name: formData.name,
            role: formData.role,
            phone: formData.phone,
            email: formData.email
          })
          .eq('id', editingUser.id);
  
        if (dbError) throw dbError;
  
        // Update auth.user if email changed
        if (formData.email !== editingUser.email) {
          const { error: authError } = await supabase.auth.updateUser({
            email: formData.email
          });
          if (authError) throw authError;
        }
  
        toast.success('User updated successfully');
      } else {
        // Create new user
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              role: formData.role,
              phone: formData.phone
            }
          }
        });
  
        if (signUpError) throw signUpError;
  
        toast.success('User created successfully');
      }
  
      setIsModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Operation failed');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6 p-6">
      {/* Controls */}
      <div className="bg-white p-6 shadow-md rounded-lg flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Staff Management</h2>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="staff">Staff</option>
            <option value="chef">Chef</option>
            <option value="all">All</option>
          </select>

          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({ name: "", email: "", password: "", role: "staff", phone: "" });
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
            disabled={loading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((member) => (
                  <tr key={member.id} className="border-b">
                    <td className="px-6 py-4">{member.name}</td>
                    <td className="px-6 py-4 capitalize">{member.role}</td>
                    <td className="px-6 py-4">{member.phone || "N/A"}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <button
                        onClick={() => {
                          setEditingUser(member);
                          setFormData({ 
                            name: member.name, 
                            email: member.email, 
                            role: member.role, 
                            phone: member.phone || "", 
                            password: "" 
                          });
                          setIsModalOpen(true);
                        }}
                        className="text-amber-600 hover:text-amber-900"
                        disabled={loading}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(member.id)} 
                        className="text-red-600 hover:text-red-900"
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit User Modal */}
      <Modal isOpen={isModalOpen} onClose={() => !loading && setIsModalOpen(false)} 
        title={editingUser ? "Edit Staff Member" : "Add New Staff Member"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              disabled={!!editingUser || loading}
            />
          </div>
          
          {!editingUser && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                minLength={6}
                disabled={loading}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              disabled={loading}
            >
              <option value="staff">Staff</option>
              <option value="chef">Chef</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {editingUser ? "Updating..." : "Creating..."}
                </span>
              ) : editingUser ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StaffManagement;

// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import Modal from './Modal';
// import { toast } from 'react-hot-toast';

// const StaffManagement = () => {
//   const { supabase } = useAuth();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'staff',
//     phone: ''
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email: formData.email,
//         password: formData.password,
//         options: {
//           data: {
//             name: formData.name,
//             role: formData.role,
//             phone: formData.phone
//           }
//         }
//       });

//       if (error) throw error;

//       toast.success(`${formData.role} account created successfully`);
//       setIsModalOpen(false);
//       setFormData({
//         name: '',
//         email: '',
//         password: '',
//         role: 'staff',
//         phone: ''
//       });
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//       >
//         Add New Staff Member
//       </button>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Add New Staff Member"
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Name
//             </label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Email
//             </label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Password
//             </label>
//             <input
//               type="password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Phone
//             </label>
//             <input
//               type="tel"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Role
//             </label>
//             <select
//               value={formData.role}
//               onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             >
//               <option value="staff">Staff</option>
//               <option value="chef">Chef</option>
//             </select>
//           </div>

//           <div className="mt-4 flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={() => setIsModalOpen(false)}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
//             >
//               Create Account
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default StaffManagement;