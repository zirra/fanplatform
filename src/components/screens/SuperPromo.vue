<template>
  <div class="promo">
    <div class="promo-holder">
      <img :src="item.img" class="promo-hero" />
      <a :href="item.test" style="color:#333399;" v-on:click="close"><button class="">Collect Coupon</button></a><br/>
      <button v-on:click="close">No Thanks</button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'super-promo',
  props: [
    'item'
  ],
  methods: {
    close () {
      this.setNotification(false)
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
  background: url('../../assets/halftone_background@2x.png') fixed bottom #fff;
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
