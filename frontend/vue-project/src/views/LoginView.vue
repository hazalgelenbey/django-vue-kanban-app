<script setup>
import { ref } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");
const errorMessage = ref(""); // Hataları ekranda göstermek için
const isLoading = ref(false); // Butonu disable etmek için

const handleLogin = async () => {
  errorMessage.value = "";
  if (!username.value || !password.value) {
    errorMessage.value = "Lütfen tüm alanları doldurun.";
    return;
  }

  isLoading.value = true;

  try {
    // 2. API İsteği
    const res = await api.post("auth/token/", {
      username: username.value,
      password: password.value,
    });

    // 3. Token İşlemleri
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    // 4. Yönlendirme
    router.push("/tasks");

  } catch (err) {
    console.error("Login Hatası:", err);
    
    // Hata mesajını özelleştirme
    if (err.response && err.response.status === 401) {
      errorMessage.value = "Kullanıcı adı veya şifre hatalı!";
    } else {
      errorMessage.value = "Sunucuya bağlanılamadı. Lütfen tekrar deneyin.";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="brand">
        <span class="logo">📋</span>
        <h1>Proje Takip</h1>
        <p>Hesabınıza giriş yapın</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        
        <div class="input-group">
          <label for="username">Kullanıcı Adı</label>
          <input 
            id="username"
            v-model="username" 
            type="text" 
            placeholder="Kullanıcı adınızı girin" 
            :disabled="isLoading"
            autocomplete="username"
          />
        </div>

        <div class="input-group">
          <label for="password">Şifre</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            :disabled="isLoading"
            autocomplete="current-password"
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          ⚠️ {{ errorMessage }}
        </div>

        <button type="submit" class="btn-login" :disabled="isLoading">
          <span v-if="isLoading">Giriş Yapılıyor...</span>
          <span v-else>Giriş Yap</span>
        </button>
      </form>
      
      <div class="footer-links">
        <a href="#">Şifremi Unuttum</a>
        <span>&bull;</span>
        <a href="#">Kayıt Ol</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f5f7;
  font-family: 'Inter', sans-serif;
  padding: 20px;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.brand {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 10px;
}

.brand h1 {
  margin: 0;
  color: #172b4d;
  font-size: 1.5rem;
  font-weight: 700;
}

.brand p {
  margin: 5px 0 0;
  color: #6b778c;
  font-size: 0.9rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #42526e;
}

.input-group input {
  padding: 10px 12px;
  border: 2px solid #dfe1e6;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  color: #172b4d;
}

.input-group input:focus {
  border-color: #0052cc;
}

.btn-login {
  background-color: #0052cc;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.btn-login:hover:not(:disabled) {
  background-color: #0747a6;
}

.btn-login:disabled {
  background-color: #a5adba;
  cursor: not-allowed;
}

.error-message {
  background-color: #ffebe6;
  color: #de350b;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #ffbdad;
}

.footer-links {
  margin-top: 20px;
  text-align: center;
  font-size: 0.85rem;
  color: #6b778c;
}

.footer-links a {
  color: #0052cc;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  text-decoration: underline;
  color: #0747a6;
}
</style>