<template>
  <div class="row" style="margin: 10px 5px;" v-cloak>
    <div class="col-0  col-sm-2   col-md-3  col-xl-4"></div>
    <div class="col-12 col-sm-8 col-md-6 col-xl-4 my-auto">
      
      <form style="margin: 3em auto;" @submit.prevent="updateUserInfo">
        <div class="input-group">
          <div style="margin: auto">ユーザー名：</div>
          <input v-model="name" class="form-control">
          <div class="input-group-append">
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
        </div>
      </form>

      <div style="margin: 3em auto;">Eメール：{{email}}</div>
      <div style="margin: 3em auto; text-align:center;">
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
        vm.$toasted.error('登録解除に失敗しました');
      });
    },
    updateUserInfo(){
      var vm = this;
      this.axios.patch(process.env.VUE_APP_API_BASE_URL + '/api/v1/users/' + store.getters.user.uid, {
        name: this.name,
      })
      .then(async function(res) {
        vm.$toasted.success('ユーザー情報を更新しました');
      })
      .catch(function(error) {
        vm.$toasted.error('ユーザー情報の更新に失敗しました');
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

<style>
</style>