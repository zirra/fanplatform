<template>
  <div>
    <img src="../../assets/skeeters_header.png" style="width:100%; margin-top:-64px;">
    <div class="content-container">
      <h1>Roster</h1>
      <div v-for="item in allPlayers" v-bind:key="item.name" style="margin-bottom:64px;">
        <player-card v-bind:item="item"></player-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlayerCard from '@/components/items/PlayerCard'

export default {
  name: 'roster',
  components: {
    'player-card': PlayerCard
  },
  mounted () {
    console.log(this.allPlayers)
  },
  computed: {
    ...mapGetters([
      'allPlayers'
    ])
  }
}
</script>

<style>

</style>
