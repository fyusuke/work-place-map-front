<template>
  <div class="row" style="margin: auto 5px;">
    <div class="col-0  col-sm-1   col-md-2  col-xl-3"></div>
    <div class="col-12 col-sm-10 col-md-8 col-xl-6 my-auto">
      <h2 class="text-center" style="margin: 20px auto;">{{ name }}</h2>
      <form @submit.prevent="send">
        <star-rating v-model="rating" :show-rating="false" style="margin: 20px auto; width: 100%; justify-content: center;"></star-rating>
        <textarea id="subject" v-model="comment" name="subject" style="height:200px" placeholder="体験や感想をコメントしよう"></textarea>
        <div style="text-align: center;">
          <input type="submit" value="投稿" style="width: 100%;">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import StarRating from 'vue-star-rating'

export default {
  name: 'ReviewWriteComponent',
  components: {
    StarRating
  },
  data() {
      return {
        name: null,
        gmapPlaceId: null,
        rating: 0,
        comment: ''
      }
  },
  methods: {
    send(){
      var vm = this;

      const ratingRange = [1,2,3,4,5];
      if(ratingRange.includes(this.rating) === false){
        this.$toasted.error('評価を入力してください');
        return;
      }
      this.comment = this.comment.split(" ").join("");
      if(!this.comment){
        this.$toasted.error('コメントを入力してください');
        return;
      }

      this.axios.post(process.env.VUE_APP_API_BASE_URL + '/api/v1/reviews', {
        firebase_uid: store.getters.user.uid,
        gmap_place_id: this.gmapPlaceId,
        comment: this.comment,
        rating: this.rating
      }, {
          headers: {
          "Content-Type": "application/json",
          // "Authorization": 'Bearer ' + TOKEN
          }
      })
      .then(function() {
          vm.$toasted.success('送信完了しました');
          vm.comment = ''
      })
      .catch(function(error) {
        console.log(error.response.status );
        if(error.response.status === 403){
          vm.$toasted.error('既に投稿ずみです');
        } else {
          vm.$toasted.error('送信に失敗しました');
        }
      });
    }
  },
  mounted: function () {
    this.name = this.$route.query.placeName;
    this.gmapPlaceId = this.$route.query.gmapPlaceId;
  }
}
</script>

<style scoped>
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

/* start rating */
.star-rating {
  font-size: 0;
  white-space: nowrap;
  display: inline-block;
  width: 250px;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjREREREREIiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=');
  background-size: contain;
}
.star-rating i {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 20%;
  z-index: 1;
  background: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZERjg4IiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=');
  background-size: contain;
}
.star-rating input {
  -moz-appearance: none;
  -webkit-appearance: none;
  opacity: 0;
  display: inline-block;
  width: 20%;
  height: 100%;
  margin: 0;
  padding: 0;
  z-index: 2;
  position: relative;
}
.star-rating input:hover + i,
.star-rating input:checked + i {
  opacity: 1;
}
.star-rating i ~ i {
  width: 40%;
}
.star-rating i ~ i ~ i {
  width: 60%;
}
.star-rating i ~ i ~ i ~ i {
  width: 80%;
}
.star-rating i ~ i ~ i ~ i ~ i {
  width: 100%;
}
</style>