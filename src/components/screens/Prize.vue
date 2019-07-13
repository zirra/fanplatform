<template>
  <div class="prize">
    <div class="prize-holder">
      <img :src="item.img" class="prize-hero"/><br />
      <img src="https://ds-stadium-bucket.s3.us-east-2.amazonaws.com/chiefs/MA_btn_close.png" v-on:click="close()" />
      
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import { mapMutations } from 'vuex'
export default {
  name: 'prize-view',
  props: [
    'item'
  ],
  methods: {
    close () {
      let splitval = this.item.client.split('_')
      let client = splitval[0]
      let murl = `/v1/metrics/promo/${this.item.client}/${client}/accept`
      api.getRaw(murl)
        .then(
          response => {
            console.log(response.data)
          })
        .catch(error => {
          console.log(error)
        })
      this.setPrizeState(false)
    },
    ...mapMutations([
      'setPrizeState'
    ])
  }
}
</script>

<style>
.prize { 
  z-index:20001;
  background-color: #fff;
  width: 100%;
  height: 100%;
  text-align:center;
  background: url('https://s3.us-east-2.amazonaws.com/ds-stadium-bucket/chiefs/halftone_background@2x.png') fixed bottom #fff;
  background-repeat: no-repeat; 
  background-position: bottom;
  background-attachment: fixed;       
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding-bottom: 128px;
}

.prize-hero {
  width: 90%;
  padding: 5%;
  margin-top:16px;
}

.prize-holder {
  width: 100%;
}
</style>
