<template>
  <div class="content-container">
    <h1>Schedule</h1>
    <div v-for="item in allGameData" v-bind:key="item.name" style="margin-bottom:64px;">
      <event-item v-bind:item="item"></event-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScheduleItem from '@/components/items/ScheduleItem'

export default {
  name: 'schedule',
  components: {
    'event-item': ScheduleItem
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'allGameData'
    ])
  }
}
</script>

<style>

</style>
