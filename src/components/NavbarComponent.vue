<template>
  <div class="myheader" v-cloak>  
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-navbar-brand to="/">Re:Work</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse justify-content-end" is-nav>
        <b-navbar-nav class="ml-auto" v-cloak>
          <b-nav-item to="/login" v-if="isSignIn===false" v-cloak>ユーザー登録 / ログイン</b-nav-item>
          <b-nav-item v-on:click="logout" v-if="isSignIn===true" v-cloak>ログアウト</b-nav-item>
          <b-nav-item to="/contact_us" v-if="isSignIn===true" v-cloak>お問い合わせ</b-nav-item>
          <b-nav-item to="/terms" v-if="isSignIn===true" v-cloak>利用規約</b-nav-item>
          <b-nav-item to="/user" v-if="isSignIn===true" v-cloak>ユーザー情報</b-nav-item>
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
      store.commit('setUser', {})
      firebase.logout()
      // alert("ログアウトしました。");
      this.$router.go();
    }
  },
  computed: {
    isSignIn: function () {
      return store.getters.isSignIn;
    }
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>