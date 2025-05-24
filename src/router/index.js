import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import RecipesView from '@/views/RecipesView.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: HomeView,
    meta: { showUI: true }
  },
  { 
    path: '/recipes', 
    name: 'recipes',
    component: RecipesView,
    meta: { requiresAuth: true, showUI: true }
  },
  { 
    path: '/login', 
    name: 'login',
    component: LoginView,
    meta: { showUI: false }
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound,
    meta: { showUI: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  // Handle protected routes
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  }
  // Proceed for all other routes
  else {
    next();
  }
});

export default router;