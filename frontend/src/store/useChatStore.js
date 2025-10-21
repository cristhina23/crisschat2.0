import { create } from "zustand";
import toast from "react-hot-toast";
import { api } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  //isTyping: false,
  

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await api.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await api.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await api.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  subscribeToMessages: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket

    // todo: optimaze this later
    socket.on("message", (newMessage) => {

      const existing = get().messages.find((msg) => msg._id === newMessage._id);
      if (existing) return;

      set({ messages: [...get().messages, newMessage] });
    })
  },
  unsubscribeFromMessages: async () => {
    const socket = useAuthStore.getState().socket

    socket.off("newMessage");
  },
  
  
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  
}));