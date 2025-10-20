import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isLoggingOut: false,

  checkAuth: async () => {
    try {
      const response = await api.get('/auth/check'); 
      set({ authUser: response.data });
    } catch (error) {
      console.log('Error in checkAuth:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {

      const res = await api.post('/auth/signup', data);
      toast.success('Sign up successful');
      set({ authUser: res.data });

    } catch (error) {

      console.log('Error in signup:', error);
      toast.error(error.response.data.message);

    } finally {

      set({ isSigningUp: false });
    }
  }

}));
