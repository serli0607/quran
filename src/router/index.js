import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SurahView from '../views/SurahView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresCache: false } // Tambahkan meta untuk menonaktifkan cache
    },
    {
      path: '/surah/:id',
      name: 'Surah',
      component: SurahView,
      meta: { requiresCache: false } // Tambahkan meta untuk menonaktifkan cache
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresCache !== undefined && !to.meta.requiresCache) {
    // Nonaktifkan cache jika requiresCache adalah false
    to.meta.requiresCache = false;
    next();
  } else {
    next();
  }
});

export default router;
