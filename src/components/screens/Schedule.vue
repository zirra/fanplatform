<template>
  <div>
    <div v-if="payView" id="payview2">
      <img :src="baseUrl+'/apple_pay_opt.jpg'" alt="Apple Pay Window" style="width:94%;" @click="closePay" />
    </div>
    <div v-if="ticketView" id="ticketScreen">
      <ticket-view v-bind:item="myTicket" v-on:closeItem="closeModal" v-on:showApplePay="showAppleModal" />
    </div>
    <div class="content-container" v-if="!ticketView && !payView" style="position:absolute; margin-bottom:96px;">
      <h1>Schedule</h1> 
      <div v-for="item in allGameData" v-bind:key="item.name" style="margin-bottom:16px;">
        <event-item v-bind:item="item" v-on:ticketEvent="itemClicked(item)"></event-item>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import { mapGetters, mapMutations } from 'vuex'
import ScheduleItem from '@/components/items/ScheduleItem'
import Ticket from '@/components/items/Ticket'

export default {
  name: 'schedule',
  components: {
    'event-item': ScheduleItem,
    'ticket-view': Ticket
  },
  data () {
    return {
      baseUrl: process.env.ASSETS,
      ticketView: false,
      myTicket: null,
      payView: false
    }
  },
  mounted () {
    this.setNavCurrent('schedule')
  },
  methods: {
    itemClicked (item) {
      this.ticketView = true

      let murl = `/v1/metrics/ticket/${item.team.name}`
      api.getRaw(murl)
        .then(
          response => {
            console.log(response.data)
          })
        .catch(error => {
          console.log(error)
        })

      this.myTicket = item
    },
    closeModal () {
      this.ticketView = false
      this.myTicket = null
    },
    showAppleModal () {
      window.scrollTo(0, 0)
      this.ticketView = false
      this.payView = true
    },
    closePay () {
      window.scrollTo(0, 0)
      this.productView = false
      this.payView = false
    },
    ...mapMutations([
      'setNavCurrent'
    ])
  },
  computed: {
    ...mapGetters([
      'allGameData'
    ])
  }
}
</script>

<style>
#ticketScreen {
  width: 100%;
  height: 100%;
  text-align:center;
  margin-bottom: 128px;
}

#payview2 {
  position: absolute;
  top:0;
}
</style>
