<template>
  <surat-list :qurans="qurans" @selectSurah="handleSelectSurah" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SuratList from '@/components/Card.vue';
import { useRouter } from 'vue-router';

const qurans = ref([]);
const router = useRouter();

const handleSelectSurah = (surah) => {
  router.push(`/surah/${surah.nomor}`);
}
onMounted(() => {
  axios
    .get('http://api.alquran.cloud/v1/surah')
    .then(response => {
      qurans.value = response.data.data;
    })
    .catch(error => {
      console.error('Terjadi kesalahan saat mengambil data:', error);
    });
})
</script>