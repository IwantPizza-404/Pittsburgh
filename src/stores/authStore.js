import { defineStore } from 'pinia';
import { loginUser, logoutUser, checkAuth } from '@/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  actions: {
    async login(username, password) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await loginUser(username, password);
        this.user = response;
        return true;
      } catch (error) {
        this.error = error.message || 'Authentication failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async logout() {
      this.loading = true;
      
      try {
        await logoutUser();
        this.user = null;
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        this.loading = false;
      }
    },
    
    initialize() {
      const userData = checkAuth();
      if (userData) {
        this.user = userData;
      }
    },
    
    clearError() {
      this.error = null;
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    userFullName: (state) => state.user?.name || '',
    userPhone: (state) => state.user?.phone || '',
  },
});