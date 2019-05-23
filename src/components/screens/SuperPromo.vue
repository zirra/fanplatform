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
      console.log('close')
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
  background-color: rgba(255,255,255,.75);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  text-align:center;
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
