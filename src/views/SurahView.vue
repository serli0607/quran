<template>
  <div>
    <div class="flex justify-between lg:mx-36 mx-12 my-5">
      <router-link to="/">
        <div class="flex items-center justify-center leading-none text-base font-medium">
          <i class="bi bi-arrow-left-square text-2xl"></i>
          <span class="ml-2 hidden md:block">Daftar Surah</span>
        </div>
      </router-link>
      <router-link :to="nextSurahLink">
        <div class="flex items-center justify-center leading-none text-base font-medium">
          <span class="ml-2 hidden md:block">Surah Selanjutnya</span>&nbsp;
          <i class="bi bi-arrow-right-square text-2xl"></i>
        </div>
      </router-link>
    </div>
    <div class="text-center">
      <span>
        <h1 class="text-lg md:text-xl lg:text-5xl">{{ surah.nama }}</h1>
      </span>
      <div class="mb-10">
        <h1 class="text-lg md:text-xl lg:text-2xl font-semibold">{{ surah.namaLatin }}</h1>
        <span class="font-normal block text-xs lg:text-sm text-neutral-500 dark:text-neutral-400">{{ surah.tempatTurun
          }} · {{ surah.jumlahAyat }}</span>
      </div>
    </div>
    <div class="lg:mx-10 mx-5 my-5 text-center space-y-2 mb-5">
      <span>
        <h1 class="text-lg md:text-xl lg:text-3xl">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h1>
      </span>
    </div>
    <ul class="lg:px-36 px-12">
      <li v-for="ayat in ayats" :key="ayat.nomor" class="my-10 border-neutral-content">
        <div class="flex flex-col space-y-3">
          <span class="text-4xl leading-relaxed lg:leading-relaxed text-right">
            {{ ayat.teksArab }}
            <span class="text-secondary-500 dark:text-secondary-300">{{ ayat.nomorAyat }}</span>
          </span>
          <span class="text-left leading-relaxed lg:leading-relaxed "><button @click="playAyatAudio(ayat)">
              <i :class="{ 'bi bi-play-circle': !ayat.isPlaying, 'bi bi-pause-circle': ayat.isPlaying }"
                class="text-xl hover:opacity-70"></i>
            </button></span>
          <span class="block text-md lg:text-lg text-indigo-500 mb-3 sm:mt-3 sm:mb-4 dark:text-indigo-300">
            {{ ayat.teksLatin }}
          </span>
          <span class="block text-md lg:text-lg text-neutral-700 dark:text-neutral-300">
            {{ ayat.teksIndonesia }}
          </span>
        </div>
      </li>
    </ul>
  </div>
  <audio ref="audioPlayer" class="hidden" controls></audio>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();

const surah = ref({});
const ayats = ref([]);
const audioPlayer = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const currentAyat = ref(null);

// Fetch surah data when component is mounted
onMounted(() => {
  const surahNumber = route.params.id;
  axios
    .get(`https://equran.id/api/v2/surat/${surahNumber}`)
    .then(response => {
      surah.value = response.data.data;
      ayats.value = response.data.data.ayat;
    })
    .catch(error => {
      console.error('Terjadi kesalahan saat mengambil data:', error);
    });
});

// Function to play or pause the audio player
const playAyatAudio = (ayat) => {
  if (!audioPlayer.value) return;
  if (currentAyat.value && currentAyat.value !== ayat) {
    currentAyat.value.isPlaying = false;
    currentAyat.value.currentTime = audioPlayer.value.currentTime;
  }
  if (ayat.isPlaying) {
    ayat.currentTime = audioPlayer.value.currentTime;
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.src = ayat.audio['05'];
    if (ayat.currentTime > 0) {
      audioPlayer.value.currentTime = ayat.currentTime;
    }
    audioPlayer.value.play();
  }
  ayat.isPlaying = !ayat.isPlaying;
  currentAyat.value = ayat;
};

const nextSurahLink = computed(() => {
  const currentSurahNumber = parseInt(route.params.id, 10);
  const nextSurahNumber = currentSurahNumber < 114 ? currentSurahNumber + 1 : 1;
  return `/surah/${nextSurahNumber}`;
});
</script>