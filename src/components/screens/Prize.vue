<template>
  <div class="prize">
    <div class="prize-holder">
      <img :src="item.img" class="prize-hero"/><br />
      <button v-on:click="close()" class="btn">CLOSE</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'prize-view',
  props: [
    'item'
  ],
  methods: {
    close () {
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
  background: url('../../assets/halftone_background@2x.png') fixed bottom #fff;
  background-repeat: no-repeat; 
  background-position: bottom;
  background-attachment: fixed;       
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  margin-bottom: 128px;
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
