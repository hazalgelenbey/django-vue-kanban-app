<script setup>

</script>

<template>
  <div class="app-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <div id="toast-container"></div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f4f5f7; /* Tüm uygulamanın zemin rengi */
  color: #172b4d;
  -webkit-font-smoothing: antialiased; /* Yazıların daha keskin görünmesi için */
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
::-webkit-scrollbar-thumb {
  background: #c1c7d0; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a5adba; 
}

/* 2. SAYFA GEÇİŞ ANİMASYONLARI (Fade Effect) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 3. WRAPPER */
.app-wrapper {
  min-height: 100vh;
  position: relative;
}
</style>