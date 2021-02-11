<template>
  <div class="map">
    <GmapMap ref="gmap" :center="center" :zoom="zoom" style="width: 100%; height: 100%;" :options="mapStyle">
        <GmapMarker v-if="targetMarker.title!==null"
        :position="targetMarker.position"
        :title="targetMarker.title"
        :icon="targetMarker.icon"
        :clickable="true"
        @click="showPlaceWindow(marker.placeId)"
        :draggable="false">
        </GmapMarker>
        <GmapMarker v-for="(marker, id) in nearbyMarkers"
        :position="marker.position"
        :title="marker.name"
        :key="id"
        :icon="marker.icon"
        :clickable="true"
        @click="showPlaceWindow(marker.placeId)"
        :draggable="false">
        </GmapMarker>
    </GmapMap>
    
    <form @submit.prevent="findPlaceByKeyword">
      <div class="input-group mb-3 serach-form">
        <input v-model="keyword" type="text" class="form-control" placeholder="地名、ホテル名を入力">
        <div class="input-group-append">
          <button v-on:click="findPlaceByKeyword" class="btn btn-primary" type="button">検索</button>
        </div>
      </div>
    </form>

    <div class="place-window" v-if="placeWindowOpen">
      
    </div>

  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps' 

export default {
  name: 'MapComponent',
  components: {
  },
  data() {
    return {
      keyword: "",
      center: { lat: 35.698304, lng: 137.766325 },
      zoom: 5,
      mapStyle: {
        disableDefaultUI: true, // 表示のオプションを指定できます。
        styles: [
            // カスタマイズで使用したスタイルなどはここに。
        ]
      },
      targetMarker: {title: null, position: null, icon: null},
      nearbyMarkers: [
        // { position: { lat: 35.698304, lng: 139.766325 }, title: 'title' }
      ],
      placeWindowOpen: false,
    }
  },
  methods: {
    findPlaceByKeyword(){
      var vm = this;
      var map = this.$refs.gmap.$mapObject;

      var request = {
        query: this.keyword,
        fields: ['name', 'geometry'],
      };

      var service = new this.google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, function(results, status) {
        if (status === vm.google.maps.places.PlacesServiceStatus.OK) {
          let targetPlace = results[0];
          vm.$set(vm.targetMarker, 'title', targetPlace.name);
          vm.$set(vm.targetMarker, 'position', targetPlace.geometry.location);
          // vm.$set(vm.targetMarker, 'icon', #);
          vm.center = targetPlace.geometry.location;
          vm.zoom = 16;
          vm.searchNearbyPlaces(vm.center);
        } else {
          vm.$toasted.error('場所が見つかりませんでした');
        }
      });
    },
    searchNearbyPlaces(location) {
      var vm = this;
      vm.nearbyMarkers.splice(0, vm.nearbyMarkers.length);
      vm.axios.post(process.env.VUE_APP_API_BASE_URL + '/api/v1/places/search', {
          latitude: location.lat(), longitude: location.lng()
      }, {
          headers: {
          "Content-Type": "application/json",
          // "Authorization": 'Bearer ' + TOKEN
          }
      })
      .then(function(res) {
        var places = res.data.places;

        if(places.length !== 0){
          // Icon 
          var icon_path;
          var cafeIcon = require('../assets/cafe.png');
          var coworkingIcon = require('../assets/coworking.png');
          var othersIcon = require('../assets/others.png');

          for (var i = 0; i < places.length; i++) {
            var place = places[i];
            console.log('place: ', place);

            if (place.category === 'cafe') {
              icon_path = cafeIcon;
            } else if (place.category === 'coworking') {
              icon_path = coworkingIcon;
            } else {
              icon_path = othersIcon;
            }

            let icon = {
              url: icon_path, // url
              // scaledSize: new vm.google.maps.Size(30, 30), // scaled size
              origin: new vm.google.maps.Point(0,0), // origin
              anchor: new vm.google.maps.Point(0, 0) // anchor
            };
            var marker = {
              id: place.id,
              icon: icon,
              position: new vm.google.maps.LatLng( place.latitude, place.longitude ),
              name: place.name,
              address: place.address,
              openingHours: place.opening_hours,
              category: place.category
            }
            vm.nearbyMarkers.push(marker);
          }
        } else {
          vm.$toasted.error('近くに作業場所が見つかりませんでした');
        }
      })
      .catch(function() {
          vm.$toasted.error('通信が失敗しました');
      });
    },
    // searchNearbyPlaces(location, keyword){
    //   var vm = this;
    //   vm.nearbyMarkers.splice(0, vm.nearbyMarkers.length);
    //   var map = this.$refs.gmap.$mapObject;
    //   let service = new vm.google.maps.places.PlacesService(map);
    //   var request = {
    //     location: location,
    //     radius: '200', // m
    //     keyword: keyword, // keyword
    //     // type: ['cafe', 'hotel', 'library'],
    //     // rankby: 'distance'
    //   };
    //   service.nearbySearch(request, function (results, status, pagetoken) {
    //     // console.log(results)
    //     // console.log(status)
    //     if (status == vm.google.maps.places.PlacesServiceStatus.OK) {
    //       console.log('results length: ', results.length)
    //       for (var i = 0; i < results.length; i++) {
    //         var place = results[i];
    //         console.log('place: ', place)
    //         let icon = {
    //           url: '@/assets/cafe.png', // url
    //           // url: place.icon, // url
    //           // scaledSize: new vm.google.maps.Size(30, 30), // scaled size
    //           origin: new vm.google.maps.Point(0,0), // origin
    //           anchor: new vm.google.maps.Point(0, 0) // anchor
    //         };
    //         var position = place.geometry.location;
    //         var marker = {
    //           icon: icon,
    //           // location: { lat: loc.lat(), lng: loc.lng() },
    //           position: position,
    //           name: place.name,
    //           // photo: place.photos
    //           placeId: place.place_id,
    //           address: place.vicinity,
    //           // openingHours: opening_hours,
    //           types: place.types
    //         }
    //         vm.nearbyMarkers.push(marker)
    //         // console.log(place)
    //       }
    //       console.log(vm.nearbyMarkers);
    //       if (pagetoken.hasNextPage) {
    //         setTimeout(
    //           function () {
    //             pagetoken.nextPage(); // The pagination.nextPage() calls the same callback of nearbySearch
    //           },
    //           "2000"
    //         );
    //       }
    //     } else {
    //       vm.$toasted.error('近くに作業場所が見つかりませんでした');
    //     }
    //     // console.log('nearbyMarkers: ', vm.nearbyMarkers)
    //   });
    // },
    // textSearchNearbyPlaces(location, keyword, markerIcon){
    //   var vm = this;
    //   vm.nearbyMarkers.splice(0, vm.nearbyMarkers.length) // TODO test
    //   // console.log('nearbyMarkers length: ', vm.nearbyMarkers.length)
    //   var map = new vm.google.maps.Map(
    //     document.createElement("div")
    //   ); // 改良可能
    //   let service = new vm.google.maps.places.PlacesService(map);
    //   var request = {
    //     location: location,
    //     radius: '200', // m
    //     query: keyword, // keyword
    //     // type: ['cafe', 'hotel', 'library'],
    //     // rankby: 'distance'
    //   };
    //   service.textSearch(request, function (results, status, pagetoken) {
    //     if (status == vm.google.maps.places.PlacesServiceStatus.OK) {
    //       console.log('results length: ', results.length)
    //       for (var i = 0; i < results.length; i++) {
    //         var place = results[i];
    //         console.log(place)
    //         let icon = {
    //           // url: place.icon, // url
    //           url: markerIcon, // url
    //           // scaledSize: new vm.google.maps.Size(30, 30), // scaled size
    //           origin: new vm.google.maps.Point(0,0), // origin
    //           anchor: new vm.google.maps.Point(0, 0) // anchor
    //         };
    //         var marker = {
    //           icon: icon,
    //           position: place.geometry.location,
    //           name: place.name,
    //           photos: place.photos,
    //           placeId: place.place_id,
    //           address: place.formatted_address,
    //           // openingHours: opening_hours,
    //           types: place.types
    //         }
    //         vm.nearbyMarkers.push(marker);
    //         // if(typeof marker.photos !== 'undefined'){
    //         //   console.log(marker.photos[0].getUrl());
    //         // }
            
    //       }
    //       if (pagetoken.hasNextPage) {
    //         setTimeout(
    //           function () {
    //             pagetoken.nextPage(); // The pagination.nextPage() calls the same callback of nearbySearch
    //           },
    //           "2000"
    //         );
    //       }
    //     } else {
    //       vm.$toasted.error('近くに作業場所が見つかりませんでした');
    //     }
    //     // console.log('nearbyMarkers: ', vm.nearbyMarkers)
    //   });
    // },
    showPlaceWindow(placeId) {
      // console.log("palce_id: "+placeId);
      const marker = this.nearbyMarkers.find(marker => marker.placeId === placeId);
      console.log(marker.photo);

      this.placeWindowOpen = true;
    }
  },
  computed: {
    google: VueGoogleMaps.gmapApi,
  }
}
</script>

<style scoped>
.map {
  height: calc(100% - 56px);
  position: relative;
}

.serach-form {
  min-width: 20%;
  max-width: 70%; 
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  border-radius:10px;
  padding: 0.25em;
}

.place-window {
  position: absolute;
  bottom:10px;
  left: calc(50% - 100px);
  z-index: 2;
  width: 200px;
  height: 30%;
  background: white;
  border: 1px solid #000000;
  border-radius: 7px;
}
</style>