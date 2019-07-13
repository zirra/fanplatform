<template>
  <div style="margin-top:16px; text-align:center;">
    <img :src="baseUrl + '/' +item.url" :alt=item.name class="player-box">
  </div>
</template>

<script>
export default {
  name: 'player',
  props: [
    'item'
  ],
  data () {
    return {
      baseUrl: process.env.ASSETS
    }
  }
}
</script>

<style>
.player-box {
  width: 94%;
  background-color: #f4b843;
  border-radius: 15px;
  border: solid 2px #f4b843;
}
</style>
