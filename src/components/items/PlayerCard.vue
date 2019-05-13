<template>
  <div class="content-container">
    
    <div>
      <div v-if="!isFlipped" class="player-card" v-on:click="toggleCard">
        <div style="position: absolute; z-index:333;">
          <img src="../../assets/venue/players/overlay.png" />
        </div>
        <img v-bind:src="myimage"/>
        {{isFlipped}}
      </div>
      <div v-else class="player-stats" v-on:click="toggleCard">
        Stats here
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'player-card',
  data () {
    return {
      isFlipped: false
    }
  },
  props: [
    'item'
  ],
  computed: {
    myimage: function () {
      return require(`../../assets/venue/players/${this.item.last}_site.png`)
    }
  },
  methods: {
    toggleCard () {
      if (this.isFlipped) {
        this.isFlipped = false
      } else {
        this.isFlipped = true
      }
    }
  }
}
</script>

<style>
  .player-card {
    margin: 3%;
    width: 332px;
    height: 528px;
    background: url('../../assets/venue/players/card_back.png');
    background-color: rgba(0,0,0, .75);
  }

  .player-stats {
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
