<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue'

const email = ref('')
const password = ref('')
const passwordVisible = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (authStore.isAuthenticated) {
    const redirectPath = route.query.redirect || '/'
    router.push(redirectPath)
  }
})

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    return
  }

  const success = await authStore.login(email.value, password.value)
  
  if (success) {
    const redirectPath = route.query.redirect || '/'
    router.push(redirectPath)
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="logo">
        <img src="@/assets/images/logo.svg" alt="logo" />
      </div>
      
      <h2>Вход в личный кабинет</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            :class="{'invalid': authStore.error}"
            id="email" 
            type="text" 
            v-model="email" 
            placeholder="Введите email"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Пароль</label>
          <div class="password-input">
            <input
              :class="{'invalid': authStore.error}"
              id="password" 
              :type="passwordVisible ? 'text' : 'password'" 
              v-model="password"
              placeholder="Введите пароль"
              required
            />
            <button type="button" class="toggle-password" @click="togglePasswordVisibility">
              <EyeIcon v-if="passwordVisible" />
              <EyeOffIcon v-else />
            </button>
          </div>
          <div v-if="authStore.error" class="error-message">
            {{ authStore.error }}
          </div>
        </div>
        
        <button 
          type="submit" 
          class="login-button"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Вход...' : 'Войти' }}
        </button>
        
        <div class="forgot-password">
          <a href="#">Забыли пароль?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.login-container {
  width: 100%;
  max-width: 449px;
  padding: 40px 50px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0px 16px rgba(16, 24, 40, 4%);
}

.logo {
  text-align: center;
  margin-bottom: 32px;
}
.logo img {
  height: 25px;
}

h2 {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--graphite-800);
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: var(--graphite-700);
}

input {
  width: 100%;
  padding: 12px 14px;
  height: 48px;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-size: 16px;
  color: var(--graphite-800);
}
input:focus {
  border-color: var(--primary-color);
  outline: none;
}
input::placeholder {
  color: var(--graphite-300);
}
input.invalid {
  border-color: #F04438;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message {
  color: #F04438;
  font-size: 14px;
  margin-top: 6px;
}

.login-button {
  width: 100%;
  padding: 14px;
  height: 52px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 24px 0;
}

.login-button:hover {
  opacity: 0.8;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.forgot-password {
  text-align: center;
}

.forgot-password a {
  color: #000;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
}

.forgot-password a:hover {
  text-decoration: underline;
}
</style> 