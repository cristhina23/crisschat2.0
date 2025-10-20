import {create } from "zustand";

export const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem("chat-theme") || "graydark",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  } 
}))