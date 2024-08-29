<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Utility from '@/utility/index'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default {
  components: {
    Navbar
  },
  data: function () {
    return { }
  },
  created () {
    this.getLocalStorage()
  },
  methods: {
    getLocalStorage () {
      const credentialAsString = Utility.decryptSessionDetails('credential', false)
      const userToken = Utility.decryptSessionDetails('token', false)
      this.$store.state.user = credentialAsString ? JSON.parse(credentialAsString) : {}
      this.$store.state.token = userToken || ''
    }
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import './assets/styles.css';
</style>
