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
        {image: 'trump.png', name: 'Trumpo1'},
        {image: 'trump.png', name: 'Trumpo2'},
        {image: 'trump.png', name: 'Trumpo3'},
        {image: 'trump.png', name: 'Trumpo4'},
        {image: 'trump.png', name: 'Trumpo5'}
      ]
    }
  }
}
</script>

<style>

</style>
