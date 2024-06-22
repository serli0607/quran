<template>
  <div>
    <div :class="{ 'bg-light': !isDarkTheme, 'bg-dark': isDarkTheme }" class="navbar bg-secondary shadow px-20">
      <div class="navbar-start">
        <img src="../src/assets/bg.png" alt="Aurora" class="w-32 h-auto" />
      </div>
      <div class="navbar-end">
        <label class="swap swap-rotate btn btn-ghost btn-circle">
          <input type="checkbox" class="toggle toggle-info" @change="toggleTheme" />
        </label>
      </div>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
  <footer class="footer items-center p-4 bg-indigo-200 text-neutral-content">
    <aside class="items-center grid-flow-col">
      <img src="../src/assets/bg.png" alt="Aurora" class="w-32 h-auto" />
      <p></p>
    </aside>
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"></svg>
      </a>
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z">
          </path>
        </svg>
      </a>
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"></svg>
      </a>
    </nav>
  </footer>
</template>

<script setup>
const isDarkTheme = ref(false);
import { ref, computed } from 'vue';

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  document.documentElement.setAttribute('data-theme', isDarkTheme.value ? 'dark' : 'light');
};
</script>

<style scoped>
/* Custom styles for navbar and footer */
.navbar,
.footer {
  transition: background-color 0.3s ease;
  /* Efek transisi saat beralih tema */
}

.bg-light {
  background-color: #ffffff;
  /* Warna latar belakang untuk tema light */
}

.bg-dark {
  background-color: #2b2a3085;
  /* Warna latar belakang untuk tema dark */
  color: #ffffff;
  /* Warna teks untuk tema dark */
}
</style>