<template>
  <div style="height:100px; width:100%; clear: both; float:none; background-color:rgba(255,255,255,.75); display:block;" 
    class="date-box">
    <div style="width:100%;clear: both; float:none; padding: 8px 8px 0px 0px;">
      <h3 style="color:#000;"><b>{{item.date.type}} {{item.date.week}}</b> {{item.date.date}}</h3>
    </div>
    <div style="width:15%; float:left;">
      <img class="img-responsive logo" :src="item.team.logo" :alt="item.team.name">
    </div>
    <div style="width:65%; float:left; padding-top:16px;">
      <h3 style="color:#000; margin:0px; padding:0px;">{{item.team.name}}</h3>
    </div>
    <div style="width:20%; float:left; margin-top:16px;">
      <img :src="baseUrl +'/buytickets.gif'" alt="Purchase Tickets" style="width:100%; float:left;" @click="chooseMe(item)"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'schedule',
  props: [
    'item'
  ],
  data () {
    return {
      baseUrl: process.env.ASSETS
    }
  },
  computed: {
    formattedDate: function () {
      let month = moment(this.item.startDate).format('MMM').toUpperCase()
      let day = moment(this.item.startDate).format('DD').toUpperCase()
      let html = `<h4 style="margin:0px; padding:0px; padding-top: 8px; color: #1C3F9B;">${month}</h4><h1 style="margin:0px; padding:0px; color: #1C3F9B;">${day}</h1><br />`
      return html
    }
  },
  methods: {
    openUrl: function (target) {
      window.open(target, '_blank')
    },
    chooseMe () {
      this.$emit('ticketEvent')
    }
  }
}
</script>

<style>
.date-box {
  text-align: left;
  color: #1C3F9B;
  margin: 0px 0px 8px 0px;
}

.date-box .logo {
  width: 100%;
}
</style>
