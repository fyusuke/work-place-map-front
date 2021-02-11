<template>
  <div>
    <button v-on:click="testButton" class="btn btn-primary" type="button">Test</button>
    <button v-on:click="testButton2" class="btn btn-primary" type="button">Test2</button>
  </div>
</template>

<script>

export default {
  name: 'Test',
  components: {
  },
  data() {
      return {
      }
  },
  methods: {
    testButton(){
      var vm = this;
      console.log('will create a new user in API server')
      this.axios.post(process.env.VUE_APP_API_BASE_URL + '/api/v1/users', {
          name: 'displayName', email: 'email@gmail.com'
      }, {
          headers: {
          "Content-Type": "application/json",
          // "Authorization": 'Bearer ' + TOKEN
          }
      })
      .then(function(res) {
          console.log(res.data.userId);
      })
      .catch(function() {
          vm.$toasted.error('ユーザー登録に失敗しました');
      });
    },
    testButton2(){
      var cookies = document.cookie; //全てのcookieを取り出して
      var cookiesArray = cookies.split(';'); // ;で分割し配列に

      for(var c of cookiesArray){ //一つ一つ取り出して
          var cArray = c.split('='); //さらに=で分割して配列に
          if( cArray[0] == 'testField'){ // 取り出したいkeyと合致したら
              console.log(cArray);  // [key,value] 
          }
      }
      // console.log('testField: ' + store.getters.testField);
    }
  }
}
</script>

<style scoped>
</style>