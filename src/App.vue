<template>
  <div id="app" style="height: 100%;">
    <NavbarComponent/>
    <router-view/>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent'
import "./assets/scss/style.css"; // load css

export default {
  name: 'App',
  components: {
    NavbarComponent
  }
}
</script>

<style>
</style>
