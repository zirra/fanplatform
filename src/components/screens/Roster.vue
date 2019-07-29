<template>
  <div>
    <div v-if="playerView" class="content-container">
      <div class="player-card-view">
        <img :src="baseUrl+`/KC_stats_roster_` +playerId+ `.jpg`" alt="Apple Pay Window" style="width:100%; border-radius:10px;" />
        <button class="btn-yellow" style="text-align:right;" @click="hideCard">CLOSE</button>
      </div>
    </div>
    <div class="content-container" v-else>
      <h1>Roster</h1>
      <div style="width:100%;">
        <div v-for="item in allPlayers" v-bind:key="item.name" @click="showPlayer(item.id)">
          <player-card v-bind:item="item"></player-card>
        </div>
      </div>
    </div>
    <div style="clear:both; height:96px;"></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Player from '@/components/items/Player'

export default {
  name: 'roster',
  data () {
    return {
      baseUrl: process.env.ASSETS,
      playerView: false,
      playerId: null
    }
  },
  components: {
    'player-card': Player
  },
  mounted () {
    this.setNavCurrent('roster')
  },
  computed: {
    ...mapGetters([
      'allPlayers'
    ])
  },
  methods: {
    showPlayer (id) {
      this.playerView = true
      this.playerId = id
    },
    hideCard () {
      this.playerView = false
      this.playerId = null
    },
    ...mapMutations([
      'setNavCurrent'
    ])
  }
}
</script>

<style>
.player-card-view {
  border-radius: 15px;
  border: solid 2px #f4b843;
  width:100%;
  background-color: #fff;
  text-align: right;
}
</style>