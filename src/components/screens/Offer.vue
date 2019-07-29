<template>
  <div>
    <div class="content-container" style="text-align:center;">
      <h1 style="text-align:left;">Offers</h1>
      <div style="text-align:center; width:100%; margin:0px auto;">
        <div class="offer">
          <p><a :href="geturl('bacardi')"><img src="https://ds-stadium-bucket.s3.us-east-2.amazonaws.com/chiefs/MA_coupon_card_Bacardi.jpg" 
            @click="openCard('https://mp.vibescm.com/c/a1i8g6','offer','bacardi',1)"
            alt="Chiefs Sponsorhips Partner"></a></p>
        </div>
        <div class="offer">
          <p><a :href="geturl('draftkings')"><img src="https://ds-stadium-bucket.s3.us-east-2.amazonaws.com/chiefs/MA_coupon_card_DraftKings.jpg" 
            @click="openCard('https://mp.vibescm.com/c/l2evd7','offer','draftkings',1)"
            alt="Chiefs Sponsorhips Partner"></a></p>
        </div>
        <div class="offer">
          <p><a :href="geturl('nissan')"><img src="https://ds-stadium-bucket.s3.us-east-2.amazonaws.com/chiefs/MA_coupon_card_Nissan.jpg" 
            @click="openCard('https://mp.vibescm.com/c/z4sii6','offer','nissan',1)"
            alt="Chiefs Sponsorhips Partner"></a></p>
        </div>
        <div class="offer">
          <p><a :href="geturl('gamestop')"><img src="https://ds-stadium-bucket.s3.us-east-2.amazonaws.com/chiefs/MA_coupon_card_GameStop.jpg" 
            @click="openCard('https://mp.vibescm.com/c/hej6d1','offer','gamestop',1)"
            alt="Chiefs Sponsorhips Partner"></a></p>
        </div>
        <div class="offer">
          <p><a :href="geturl('statefarm')"><img src="https://ds-stadium-bucket.s3.us-east-2.amazonaws.com/chiefs/MA_coupon_card_StateFarm.jpg" 
            @click="openCard('https://mp.vibescm.com/c/mp21xm','offer','statefarm',1)"
            alt="Chiefs Sponsorhips Partner"></a></p>
        </div>
      </div>
    </div>
    <div style="clear:both; height:96px;"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { api } from '@/utils/api'

export default {
  mounted () {
    this.setNavCurrent('offer')
  },
  methods: {
    geturl (brand) {
      let dest
      switch (brand) {
        case 'bacardi':
          dest = 'https://mp.vibescm.com/c/a1i8g6'
          break
        case 'draftkings':
          dest = 'https://mp.vibescm.com/c/l2evd7'
          break
        case 'nissan':
          dest = 'https://mp.vibescm.com/c/z4sii6'
          break
        case 'gamestop':
          dest = 'https://mp.vibescm.com/c/hej6d1'
          break
        case 'statefarm':
          dest = 'https://mp.vibescm.com/c/mp21xm'
          break
      }
      let murl = `/v1/metrics/offer/${brand}/coupon/accept`

      // let dest = geturl(brand)

      api.getRaw(murl)
        .then(
          response => {
          })
        .catch(error => {
          console.log(error)
        })
      return dest
    },
    openCard (url, type, brand, item) {
      let murl = `/v1/metrics/${type}/${brand}/${item}/accept`
      // let dest = geturl(brand)
      api.getRaw(murl)
        .then(
          response => {
            // location.replace(dest)
            console.log(response.data)
          })
        .catch(error => {
          // location.replace(dest)
          console.log(error)
        })
    },
    ...mapMutations([
      'setNavCurrent'
    ])
  }
}
</script>

<style>
.content-container img {
  width :100%;
  text-align: center;
}

.offer {
  margin-top:16px;
  width: 94%;
  margin-left: 3%;
  background-color: #fff;
}

.offer img {
  border-radius: 15px;
  border: solid 2px #f4b843;
}
</style>
