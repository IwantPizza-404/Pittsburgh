<template>
  <header class="header">
    <div class="header-content">
      <!-- Title Section -->
      <div class="title-section">
        <h1>{{ title(route.path) }}</h1>
        <div v-if="isAuthenticated" class="privilege-indicator">
          {{ PrivilegeMode }}
        </div>
      </div>

      <!-- Actions Section -->
      <div class="actions">
        <div v-if="isAuthenticated" @click="toggleDropdown" class="user-menu">
          <div class="profile-img">
            <img src="/avatar.png" alt="User" />
          </div>
          <div class="profile-info">
            <div class="profile-info-name">
              {{ user.name }}
            </div>
            <div class="profile-info-number">
              {{ user.phone }}
            </div>
          </div>
          <div class="dropdown">
            <button class="dropdown-btn">
              <ArrowDownIcon />
            </button>
            <ul v-if="isDropdownOpen" class="dropdown-menu">
              <li>
                <router-link :to="'/'+user.username">Profile</router-link>
              </li>
              <li @click="handleLogout">Logout</li>
            </ul>
          </div>
        </div>

        <router-link v-else class="signin-btn" to="/login">Sign in</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore.js';
import { useRoute } from 'vue-router';
import { ArrowDownIcon } from '@/components/icons';
const route = useRoute();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

const isDropdownOpen = ref(false);
const PrivilegeMode = computed(
  () => user.value.role === 'admin' ? 'Режим администратора': 'Режим пользователя'
);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleLogout = () => {
  authStore.logout();
  isDropdownOpen.value = false;
};

const title = (path) => {
  const routeMatch = titles.find(route => {
    if (route.to === '/') return path === '/';
    return path.startsWith(route.to);
  });
  
  return routeMatch ? routeMatch.label : 'Pittsburgh';
};

const titles = [
  { to: '/', label: 'Дашборд'},
  { to: '/recipes', label: 'Рецепты'}
];
</script>

<style scoped>
/* Header container */
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--bg-primary-color);
  border-bottom: 1px solid var(--border-color);
  height: var(--header-height);
  display: flex;
  align-items: center;
  padding: 10px 20px;
  flex-shrink: 0;
}

/* Header content */
.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

/* Title section */
.title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}
.title-section h1 {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: var(--graphite-800);
}

.privilege-indicator {
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #1570EF;
  background-color: #E9F3FF;
  border-radius: 6px;
  padding: 3px 6px;
}

/* Actions section */
.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-menu {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  gap: 12px;
  position: relative;
}

.profile-info{
  display: flex;
  flex-direction: column;
}
.profile-info-name{
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--graphite-700);
}
.profile-info-number{
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: var(--graphite-300);
}

.profile-img {
  width: 38px;
  height: 38px;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  overflow: hidden;
}

.profile-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown {
  display: flex;
  position: relative;
}

.dropdown-btn {
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 16px);
  right: 0;
  background: var(--bg-primary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 8px 0;
  margin: 0;
  z-index: 20;
}

.dropdown-menu li {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-menu li:hover {
  background-color: var(--primary-color-10);
}

.signin-btn {
  background-color: var(--primary-color);
  color: #ffffff;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  padding: 8px 20px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.signin-btn:hover {
  opacity: 0.8;
}
</style>