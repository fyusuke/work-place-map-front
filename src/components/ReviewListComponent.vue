<template>
  <div>
    <div id="review-list">
      <div class="row" style="margin: auto 5px;">
        <div class="col-0  col-sm-1   col-md-2  col-xl-3"></div>
        <div class="col-12 col-sm-10 col-md-8 col-xl-6 my-auto">
          <!-- place name -->
          <h2 class="text-center h1" style="margin: 20px auto;">{{ name }}</h2>


          <!-- rating -->
          <div class="row" style="margin: 1rem auto">
            <!-- start rating -->
            <div class="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3 my-auto">
              <div style="text-align:center; font-size: 2rem;" class="my-auto">{{ this.aveRating }}</div>
              <star-rating v-model="this.aveRating" :show-rating="false" :increment="0.1" :read-only="true" :star-size="this.starSize" style="margin: 5px auto; width: 100%; justify-content: center;"></star-rating>
            </div>
            <!-- rating bar -->
            <div class="col-8 col-sm-9 col-md-9 col-lg-9 col-xl-9">
              <div style="margin-right: 1em;">
                <div v-for="(rating, index) in ratings" :key="index">
                  <div class="row">
                    <div class="col-2  col-sm-2 text-right" style="font-size: 1rem;">{{ 5-index }}</div>
                    <div class="col-10 col-sm-10 rating-bar-default" style="position:relative;">
                      <div  class="rating-bar" style="position:absolute;" :style="{width: rating/reviews.length*100+'%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- comments -->
          <div v-if="this.reviews.length === 0" style="text-align:center; margin: 1em auto">
            投稿はまだありません
          </div>
          <div v-else>
            <div v-for="(review, index) in reviews" :key="index">
              <div style="margin: 1.5em auto;">
                <div>{{ review.posterName }}</div>
                <div class="d-inline-flex flex-row justify-content-start align-items-baseline">
                  <star-rating v-model="review.rating" :show-rating="false" :increment="0.1" :read-only="true" :star-size="15" style="margin-right:5px;"></star-rating>
                  <div style="font-size: 0.7rem;">{{ review.createdAt }}</div>
                </div>
                <div style="overflow-wrap:break-word;">{{ review.comment }}</div>
              </div>
            </div>
          </div>

          <!-- Write a review -->
          <button class="btn btn-primary btn-block" @click="goToReviewWrite">コメントを書く</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'ReviewListComponent',
  components: {
    StarRating
  },
  data() {
      return {
        name: null,
        gmapPlaceId: null,
        reviews:[],
        totalRatingCount: 100,
        aveRating: 0,
        ratings: [0,0,0,0,0], // star5,star4,star3,star2,star1
        starSize: 30,
      }
  },
  methods: {
    getReviews(gmapPlaceId){
      var vm = this;
      this.axios.post(process.env.VUE_APP_API_BASE_URL + '/api/v1/places/get_reviews', {
        gmap_place_id: gmapPlaceId,
      }, {
          headers: {
          "Content-Type": "application/json",
          // "Authorization": 'Bearer ' + TOKEN
          }
      })
      .then(function(res) {
          var reviews = res.data.reviews;
          var ratingSum = 0;
          for (var i = 0; i < reviews.length; i++) {
            // console.log(reviews[i]);
            vm.reviews.push(reviews[i]);
            vm.ratings[5-reviews[i].rating]++;
            ratingSum = ratingSum + reviews[i].rating;
          }
          // console.log(vm.ratings);
          if(vm.reviews.length > 0) {
            vm.aveRating = ratingSum / vm.reviews.length;
          }
      })
      .catch(function(error) {
        // console.log(error.response.status );
        if(error.response.status === 404){
          // Do nothing
        } else {
          vm.$toasted.error('レビュー取得に失敗しました');
        }
      });
    },
    goToReviewWrite(){
      this.$router.push({ path: '/review_write', query: {placeName: this.name, gmapPlaceId: this.gmapPlaceId }});
    }
  },
  mounted: function () {
    /* set Star size*/
    var width = document.getElementById('review-list').clientWidth;
    if(width < 480){
      this.starSize = 20;
    } else if (width < 576) {
      this.starSize = 20;
    } else {
      this.starSize = 30;
    }

    this.name = this.$route.query.placeName;
    this.gmapPlaceId = this.$route.query.gmapPlaceId;
    if(!this.gmapPlaceId){
      this.$toasted.error('エラーが発生しました');
      this.$router.push('/');
      return;
    }
    this.getReviews(this.gmapPlaceId);
  },
  computed: {
  }
}
</script>

<style scoped>
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

.rating-bar-default {
  width: 100%;
  background-color: #d3d3d3; 
  height: 10px;
  border-radius: 50px;
  padding: 0;
  margin: auto 0;
}

.rating-bar {
  width: 0px;
  background-color: #ffd700; 
  height: 100%;
  border-radius: 50px;
}
</style>