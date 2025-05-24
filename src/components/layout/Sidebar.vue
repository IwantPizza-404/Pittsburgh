<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <div class="sidebar-logo">
        <img src="@/assets/images/logo.svg" alt="logo" />
      </div>
      <button class="minimize-btn">
        <MinimizeIcon />
      </button>
    </div>

    <nav class="sidebar__nav">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="sidebar__link"
        :class="{ active: isActive(item.to) }"
      >
        <component :is="item.icon" class="sidebar__icon" />
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { DashboardIcon, RecipeIcon, MinimizeIcon, StoreIcon, CartIcon, ChatIcon, SettingsIcon, PaymentIcon, PlansIcon } from '@/components/icons';

const route = useRoute();
const isActive = (path) => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
};

const navItems = [
  { to: '/', label: 'Дашборд', icon: DashboardIcon },
  { to: '/store', label: 'Магазин', icon: StoreIcon },
  { to: '/orders', label: 'Заказы', icon: CartIcon },
  { to: '/payments', label: 'Платежи', icon: PaymentIcon },
  { to: '/recipes', label: 'Рецепты', icon: RecipeIcon },
  { to: '/plans', label: 'Тарифы', icon: PlansIcon },
  { to: '/chat', label: 'Чат', icon: ChatIcon },
  { to: '/settings', label: 'Настройки', icon: SettingsIcon }
];
</script>

<style scoped>
.sidebar {
  position: sticky;
  width: var(--sidebar-width);
  top: 0;
  background: var(--bg-primary-color);
  color: var(--text-color);
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 62px;
  padding: 12px 12px 12px 16px;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 12px;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
}

.minimize-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #EEF2F5;
  border-radius: 6px;
  padding: 4px;
  height: 32px;
  width: 32px;
}

/* Sidebar navigation */
.sidebar__nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 12px;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 8px 8px 12px;
  border-radius: 8px;
  color: var(--graphite-700);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-decoration: none;
  transition: background-color 0.2s;
}

.sidebar__link:hover {
  background-color: #EEF2F5;
}

.sidebar__link.active {
  background-color: var(--primary-color);
  color: white;
}

.sidebar__icon {
  width: 20px;
  height: 20px;
}

.toolbar {
  display: flex;
  width: 100%;
}
</style>
