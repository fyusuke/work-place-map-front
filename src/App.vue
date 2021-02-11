<template>
  <div id="app" style="height: 100%;">
    <NavbarComponent/>
    <router-view/>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent'

export default {
  name: 'App',
  components: {
    NavbarComponent
  }
}
</script>

<style>
</style>
