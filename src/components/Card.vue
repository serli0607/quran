<template>
  <div class="flex flex-row justify-around bg-indigo-200 border-2 p-4 rounded-lg:">
    <a v-for="menu in menus" :key="menu.href"
      class="nui-CardMenu items-center justify-center text-center rounded-xl md:rounded-3xl p-2" :href="menu.href">
      <div
        class="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-2xl border-2 border-white">
        <img :alt="menu.alt" loading="lazy" decoding="async" data-nimg="fill"
          class="absolute inset-0 w-full h-full object-cover rounded-full" :src="menu.imgSrc"
          style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;">
      </div>
      <h2 class="text-xs md:text-sm font-medium text-white">
        <span>{{ menu.label }}</span>
      </h2>
    </a>
  </div>
  <div class="flex justify-center bg-transparent">
    <input v-model="searchQuery" type="text"
      class="bg-indigo-200 w-full lg:mx-20 mx-5 mt-9 mb-5 text-center rounded-full py-3" placeholder="Search Surah" />
  </div>
  <div class="grid lg:grid-cols-3 md:grid-cols- sm:grid-cols-1 lg:mx-10 mx-5 my-5">
    <div v-for="surah in filteredQurans" :key="surah.nomor" @click="selectSurah(surah)"
      class="lg:p-3 p-1 rounded-[20px] cursor-pointer transition duration-200 hover:bg-indigo-200 ">
      <div class="flex items-center">
        <div class="flex justify-end lg:w-12 lg:text-1xl">{{ surah.nomor }}</div>
        <div class="flex-auto lg:w-64 w-32 ml-4">
          <div class="text-lg font-bold">{{ surah.namaLatin }}</div>
          <div class="text-xs">{{ surah.arti }} · {{ surah.jumlahAyat }}</div>
        </div>
        <div class="flex-auto w-24 text-xl text-right">{{ surah.nama }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  qurans: Array,
});

const emit = defineEmits(['selectSurah']);

const searchQuery = ref('');
const qurans = ref([]);

const filteredQurans = computed(() => {
  return qurans.value.filter(surah =>
    surah.namaLatin.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    surah.arti.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    surah.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectSurah = (surah) => {
  emit('selectSurah', surah);
};

onMounted(async () => {
  try {
    const response = await axios.get('https://api.alquran.cloud/v1/surah');
    qurans.value = response.data.data.map(surah => ({
      nomor: surah.number,
      nama: surah.name,
      namaLatin: surah.englishName,
      arti: surah.englishNameTranslation,
      jumlahAyat: surah.numberOfAyahs,
    }));
  } catch (error) {
    console.error("Failed to load surah data:", error);
  }
});

const menus = ref([
  { href: '/', alt: 'Al-Quran', imgSrc: 'src/assets/quran.jpeg', label: 'Al-Quran' },
  { href: '/tahlil', alt: 'Tahlil & Yasin', imgSrc: 'src/assets/solat.jpeg', label: 'Tahlil & Yasin' },
  { href: '/doa', alt: 'Wirid & Doa', imgSrc: 'src/assets/doa.jpeg', label: 'Wirid & Doa' },
  { href: '/maulid', alt: 'Maulid', imgSrc: 'src/assets/maulid.jpeg', label: 'Maulid' },
]);
</script>