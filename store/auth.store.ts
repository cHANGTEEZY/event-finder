import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (value:boolean)=> void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value)=> set(()=> ({isAuthenticated: value}))
}));

export default useAuthStore;
