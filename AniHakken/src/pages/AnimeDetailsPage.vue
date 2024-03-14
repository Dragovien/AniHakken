<template>
  <q-page class="page">
    <section class="image-section">
      <img :src="image" :alt="selectedAnime?.title?.romaji || 'Anime Image'"/> 
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AnimeDetailsPage',
  data () {
    return {
      selectedAnime: null,
      image: null,
    }
  },
  created() {
    this.selectedAnime = this.$store.selectedAnime
    if (this.selectedAnime && this.selectedAnime.coverImage && this.selectedAnime.coverImage.large) {
      this.image = this.selectedAnime.coverImage.large
    }
  },
})
</script>

<style lang="scss" scoped>
/* Add any necessary styles */
</style>
