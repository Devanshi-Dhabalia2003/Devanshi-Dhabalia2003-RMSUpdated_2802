import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Lock, Mail, User, Phone } from "lucide-react";
import { toast } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { supabase } = useAuth();
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", phone: "", password: "" };
  
    if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name must contain only letters and spaces.";
      valid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
      valid = false;
    }
  
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }
  
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
      valid = false;
    }
  
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            role: "customer",
          },
        },
      });

      if (error) throw error;

      toast.success("Registration successful! Please sign in.");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to register");
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input change
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
          Join us and start your journey!
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Create a password"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-200 disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;