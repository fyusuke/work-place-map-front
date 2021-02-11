<template>
  <div class="row" style="margin: 10px 5px;">
    <div class="col-0  col-sm-2   col-md-3  col-xl-4"></div>
    <div class="col-12 col-sm-8 col-md-6 col-xl-4 my-auto">
      <div style="margin: 20px auto;">ユーザー名：{{name}}</div>
      <div style="margin: 20px auto;">Eメール：{{email}}</div>
      <div style="text-align:center;">
        <button class="btn btn-secondary" @click="unregisterUser">登録解除</button>
      </div>
    </div>
  </div>
</template>

<script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-auth.js"></script>  

<script>
import store from '@/store'
import firebase from '@/firebase'

export default {
  name: 'UserComponent',
  components: {
  },
  data() {
      return {
        name: null,
        email: null,
      }
  },
  methods: {
    unregisterUser: async function(){
      var vm = this;
      var uid = store.getters.user.uid;

      await firebase.unregister()
      .catch(function() {
        vm.$toasted.error('登録解除に失敗しました');
        return;
      });

      this.axios.delete(process.env.VUE_APP_API_BASE_URL + '/api/v1/users/' + uid)
      .then(function() {
        vm.$toasted.success('登録解除しました');
        vm.$router.push('/');
      })
      .catch(function() {
        vm.$toasted.error('送信に失敗しました');
      });
    }
  },
  mounted: function () {
    var vm = this;
    this.axios.get(process.env.VUE_APP_API_BASE_URL + '/api/v1/users/' + store.getters.user.uid)
    .then(function(res) {
      var user = res.data.user;
      vm.name = user.name;
      vm.email = user.email;
    })
    .catch(function() {
      vm.$toasted.error('通信に失敗しました');
    });
  }
}
</script>

<style scoped>
</style>