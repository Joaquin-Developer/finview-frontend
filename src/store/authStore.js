import { create } from "zustand";

const storedToken = localStorage.getItem("access_token");

export const useAuthStore = create((set) => ({
  accessToken: storedToken || null,
  user: null,

  setToken: (token) =>
    set(() => {
      if (token) {
        localStorage.setItem("access_token", token);
      } else {
        localStorage.removeItem("access_token");
      }
      return { accessToken: token };
    }),

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem("access_token");
    set({ accessToken: null, user: null });
  }
}));

