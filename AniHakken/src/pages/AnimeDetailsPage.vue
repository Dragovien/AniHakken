<template>
  <q-page class="page">
    <section class="image-section">
      <!-- <image :src="image" alt="selected anime image"/>  -->
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useGlobalStore } from 'src/stores/globalStore.js';
const globalStore = useGlobalStore()


export default defineComponent({
  name: 'AnimeDetailsPage',
  data () {
    return {
      image: null,
    }
  },
  created() {
    console.log(globalStore)
    // this.image = this.$store.selectedAnime?.coverImage.large
  },
  mounted() {
  }
})
</script>

<style lang="scss" scoped>

</style>