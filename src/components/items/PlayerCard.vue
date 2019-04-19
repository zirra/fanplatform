<template>
  <div class="content-container">
    <div class="player-card">
      <img v-bind:src="myimage" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'player-card',
  props: [
    'item'
  ],
  computed: {
    myimage: function () {
      return require(`../../assets/venue/players/${this.item.image}`)
    }
  }
}
</script>

<style>
  .player-card {
    margin: 3%;
    width: 332px;
    height: 528px;
    background-color: rgba(0,0,0, .75);
  }

  .player-card-head {
    height: 35px;
    background-color: #f00;
  }
  
  .player-card-head {
    bottom: 0;
    width: 100%;
    height: 35px;
    background-color: #f00;
  }
</style>
