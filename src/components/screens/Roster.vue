<template>
  <div>
    <div class="content-container">
      <h1>Roster</h1>
      <div v-for="item in allPlayers" v-bind:key="item.name" style="margin-bottom:64px;">
        <player-card v-bind:item="item"></player-card>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from '@/components/items/PlayerCard'

export default {
  name: 'roster',
  components: {
    'player-card': PlayerCard
  },
  data () {
    return {
      allPlayers: [
        {image: 'card1.png', name: 'card1'},
        {image: 'card2.png', name: 'card2'},
        {image: 'card3.png', name: 'card3'},
        {image: 'card4.png', name: 'card4'},
        {image: 'card5.png', name: 'card5'}
      ]
    }
  }
}
</script>

<style>

</style>
