<template>
  <div class="promo">
    <div class="promo-holder">
      <img :src="item.img" class="promo-hero" />
      <a :href="item.test" style="color:#333399;" ><img src="https://ds-stadium-bucket.s3.us-east-2.amazonaws.com/chiefs/MA_btn_accept.png" @click="getOffer()"/></a><br/>
      <img src="https://ds-stadium-bucket.s3.us-east-2.amazonaws.com/chiefs/MA_btn_close.png" v-on:click="close()" />
      <!-- need a prop to pass the brand, offer and whatever -->
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { api } from '@/utils/api'

export default {
  name: 'super-promo',
  props: [
    'item'
  ],
  methods: {
    close () {
      let splitval = this.item.client.split('_')
      let client = splitval[0].toLowerCase()
      let murl = `/v1/metrics/promo/${client}/${this.item.client}/decline`
      api.getRaw(murl)
        .then(
          response => {
            this.setNotification(false)
            console.log(response.data)
          })
        .catch(error => {
          this.setNotification(false)
          console.log(error)
        })
    },
    getOffer () {
      let splitval = this.item.client.split('_')
      let client = splitval[0].toLowerCase()
      let dest = null
      switch (client) {
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
          dest = 'https://mp.vibescm.com/c/jtme8q'
          break
      }
      let murl = `/v1/metrics/promo/${client}/${this.item.client}/accept`
      api.getRaw(murl)
        .then(
          response => {
            window.open(dest)
            console.log(response.data)
          })
        .catch(error => {
          window.open(dest)
          console.log(error)
        })
      console.log(dest)
    },
    ...mapMutations([
      'setNotification'
    ])
  }
}
</script>

<style>
.promo { 
  z-index:20000;
  background: url('https://s3.us-east-2.amazonaws.com/ds-stadium-bucket/chiefs/halftone_background@2x.png') fixed bottom #fff;
  background-repeat: no-repeat; 
  background-position: bottom;
  background-attachment: fixed;       
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 100%;
  height: 100%;
  text-align:center;
  margin-bottom: 128px;
}

.promo-hero {
  width: 81.5%;
  padding: 4.35%;
  background-color: #000;
  margin-top:16px;
}

.promo-holder {
  width: 100%;
  background-color: #fff;
}
</style>
