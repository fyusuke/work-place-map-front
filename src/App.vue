<template>
  <div id="app" style="height: 100%;">
    <NavbarComponent/>
    <router-view/>
  </div>
</template>

<script>
import NavbarComponent from '@/components/globals/NavbarComponent'

export default {
  name: 'App',
  components: {
    NavbarComponent
  },
  mounted: function () {
    document.title = process.env.VUE_APP_NAME
  },
}
</script>

<style>
</style>
