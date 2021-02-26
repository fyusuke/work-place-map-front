<template>
  <div class="myheader" v-cloak>
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-navbar-brand to="/">{{ appName }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse justify-content-end" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/login" v-if="isSignIn===false">ユーザー登録 / ログイン</b-nav-item>
          <b-nav-item v-on:click="logout" v-if="isSignIn===true">ログアウト</b-nav-item>
          <b-nav-item to="/contact_us" v-if="isSignIn===true">お問い合わせ</b-nav-item>
          <b-nav-item to="/terms" v-if="isSignIn===true">利用規約</b-nav-item>
          <b-nav-item to="/user" v-if="isSignIn===true">ユーザー情報</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import store from '@/store'
import firebase from '@/firebase'

export default {
  name: 'NavbarComponent',
  components: {
  },
  data() {
      return {
      }
  },
  methods: {
    logout: function () {
      store.commit('setUser', {});
      firebase.logout();
      this.$router.push('/');
    }
  },
  computed: {
    isSignIn: function () {
      return store.getters.isSignIn;
    },
    appName: function() {
      return process.env.VUE_APP_NAME;
    }
  }
}
</script>

<style>
</style>