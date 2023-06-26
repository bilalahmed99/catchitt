import create from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  name?: string | null; // Make the name property optional
  token: string | null;
  email: string | null;
  login: ( email: string, token: string, name?: string) => void; // Update the login function signature
  logout: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  name: null,
  email: null,
  token: null,
  login: (email: string,  token: string, name?: string ) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('isLoggedIn', 'true');
    if (name) {
      sessionStorage.setItem('name', name);
      set({ isLoggedIn: true, name, email, token });
    } else {
      set({ isLoggedIn: true, email, token });
    }
  },
  logout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('name');
    set({ isLoggedIn: false, name: null, email: null, token: null });
  },
}));
