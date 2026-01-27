import { Auth } from "@/common/entities/auth";
import { User } from "@/common/entities/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (auth: Auth, user: User) => void;
  clearAuth: () => void;
  getToken: () => string | null;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (auth, user) =>
        set({
          user: user,
          token: auth.accessToken,
          isAuthenticated: true,
        }),
      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
      getToken: () => get().token,
    }),
    {
      name: "user-authentication",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
