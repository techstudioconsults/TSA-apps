import Cookies from "js-cookie";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean | undefined;
  token: string | undefined;
  setAuth: (token: string, refreshToken?: string) => void;
  logout: () => void;
  hydrateAuthState: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: undefined,
  token: undefined,

  setAuth: (token, refreshToken) => {
    set({
      isAuthenticated: true,
      token,
    });
    Cookies.set("authToken", token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    if (refreshToken) {
      Cookies.set("refreshToken", refreshToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    }
  },

  logout: () => {
    set({
      isAuthenticated: false,
      token: undefined,
    });
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
  },

  hydrateAuthState: () => {
    const token = Cookies.get("authToken");
    set({
      isAuthenticated: !!token,
      token: token || undefined,
    });
  },
}));
