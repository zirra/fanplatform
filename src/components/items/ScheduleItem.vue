<template>
  <div style="width:100%; clear: both;">
    <div class="date-box">
      <div v-html=formattedDate style="margin: 0px; padding: 0px;"></div>
    </div>
    <div style="width:75%; float:left; background-color: #1C3F9B; height:96px; color:#fff;">
      <div style="padding:4%;">
        <h3 style="color:#f7ec4f; margin:0px; padding:0px;">{{item.name}}</h3>
        <button v-if="item.offers" v-on:click="openUrl(item.offers.url)" style="color:#fff;">GET TICKETS</button>
      </div>
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
    }
  }
}
</script>

<style>
.date-box {
  float: left;
  text-align: center;
  color: #1C3F9B;
  background-color:#f7ec4f;
  width: 25%;
  margin: 0px 0px 16px 0px;
}
</style>
