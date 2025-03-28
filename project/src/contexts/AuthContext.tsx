import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  supabase: SupabaseClient;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean; // Add loading state
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        setLoading(false); // Set loading to false even if there's an error
        return;
      }

      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        if (!localStorage.getItem('toastShown')) {
          toast.success(`Welcome back, ${session.user.email}!`);
          localStorage.setItem('toastShown', 'true');
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('toastShown');
      }
      setLoading(false); // Set loading to false after initialization
    };

    initializeAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        if (!localStorage.getItem('toastShown')) {
          toast.success(`Welcome back, ${session.user.email}!`);
          localStorage.setItem('toastShown', 'true');
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('toastShown');
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Logout failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, supabase, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};