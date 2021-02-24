<template>
  <div>
    <div class="container">
      <h2 class="text-center">お問い合わせ</h2>
      <form @submit.prevent="send">
        <label for="subject">内容</label>
        <textarea id="subject" v-model="message" name="subject" style="height:200px"></textarea>
        <div style="text-align: center;">
          <input type="submit" value="送信" class="">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'ContactUsComponent',
  components: {
  },
  data() {
      return {
        message: ''
      }
  },
  methods: {
    send(){
      var vm = this;
      if(!this.message){
        this.$toasted.error('内容を入力してください');
        return;
      }
      this.axios.post(process.env.VUE_APP_API_BASE_URL + '/api/v1/contact_us_forms', {
        message: this.message, firebase_uid: store.getters.user.uid
      })
      .then(function() {
          vm.$toasted.success('送信完了しました');
      })
      .catch(function() {
          vm.$toasted.error('送信に失敗しました');
      });
    }
  }
}
</script>

<style>
/* Style inputs with type="text", select elements and textareas */
input[type=text], select, textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */ 
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type=submit]:hover {
  background-color: #45a049;
}

/* Add a background color and some padding around the form */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>