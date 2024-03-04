<template>
  <q-layout view="lHh Lpr lFf">
    <AppHeader/>
    <q-page-container>
      <router-view />
    </q-page-container>
    <AppFooter/>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import AppHeader from '../components/header/Header.vue'
import AppFooter from '../components/footer/Footer.vue'

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {}
  },
  components: {
    AppHeader,
    AppFooter
  },

})
</script>
