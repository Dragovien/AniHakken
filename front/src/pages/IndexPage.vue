<template>
  <q-page class="indexPage">
    <SearchBar/>
    
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import SearchBar from 'src/components/main/SearchBar.vue';


export default defineComponent({
    name: 'IndexPage',
    components: { SearchBar }
})
</script>
