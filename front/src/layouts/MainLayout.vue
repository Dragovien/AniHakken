<template>
  <q-layout view="lHh Lpr lFf">
    <Header/>
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer/>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Header from '../components/header/Header.vue'
import Footer from '../components/footer/Footer.vue'

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {}
  },
  components: {
    Header,
    Footer
  },

})
</script>
