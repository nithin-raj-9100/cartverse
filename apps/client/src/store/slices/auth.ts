import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  sessionId: string | null;
  setUser: (user: User | null) => void;
  setSessionId: (sessionId: string | null) => void;
  login: (user: User, sessionId: string) => void;
  signup: (user: User, sessionId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      sessionId: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setSessionId: (sessionId) => set({ sessionId }),
      login: (user, sessionId) => {
        set({ user, isAuthenticated: true, sessionId });
        toast.success(`Welcome back, ${user.name}!`, {
          duration: 3000,
          position: "top-center",
          icon: "👋",
        });
      },
      signup: (user, sessionId) => {
        set({ user, isAuthenticated: true, sessionId });
        toast.success("Account created successfully! Welcome aboard!", {
          duration: 4000,
          position: "top-center",
          icon: "🎉",
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, sessionId: null });
        toast.success("Logged out successfully. See you soon!", {
          duration: 3000,
          position: "top-center",
          icon: "👋",
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        sessionId: state.sessionId,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
