<template>
  <div>
    <div class="menu">
      <div style="width: 98%; margin-left: 2%; height:100%;" v-for="item in options" v-bind:key="item._id">
        <div style="width:50%; float:left;">
          <menu-tile v-bind:item="item"></menu-tile>
        </div>
      </div>
      <div style="height: 128px; margin-bottom:128px;"><br/><br/></div>
    </div>
  </div>
</template>

<script>
import Tile from './navigation/Tile'
import { storage } from '../utils/dao'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'hello',
  components: {
    'menu-tile': Tile
  },
  data () {
    return {
      seat: null,
      msg: 'Welcome to Your Vue.js PWA',
      options: [
        {image: 'btn_offers.png', title: 'Offers', target: '/offer'},
        {image: 'btn_schedule.png', title: 'Schedule', target: '/schedule'},
        {image: 'btn_team.png', title: 'Roster', target: '/roster'},
        {image: 'btn_shop.png', title: 'Shop', target: '/shop'}
      ],
      snapopt: {image: 'skeeter_shop.png', title: 'Snap', target: '/snap'},
      settings: {image: 'skeeter_shop.png', title: 'Settings', target: '/settings'},
      snappedin: {image: 'skeeter_shop.png', title: 'Share with Snapchat', target: '/snapchat'},
      loggedIn: false
    }
  },
  mounted () {
    // this.user = storage.getValue('user')
    if (this.$route.params.id === undefined && !(this.user)) {
      console.log('Without scanning in, you will not be included in drawings')
      if (storage.getValue(user)) {
        this.$socket.emit('addUser', this.appId + user)
      }
    } else {
      this.seat = this.$route.params.id
      if (!this.user && this.seat) {
        storage.storeValue('user', this.seat)
        this.$socket.emit('addUser', this.appId + this.seat)
      }
      if (this.user.username !== this.seat) {
        storage.storeValue('user', this.seat)
        this.$socket.emit('addUser', this.appId + this.seat)
      }
    }
    this.loggedIn = storage.valueExists('userkeys')
    this.setNavCurrent('home')
  },
  sockets: {
    addUser (data) {
      console.log(data)
      this.socketMessage = data
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'appId'
    ])
  },
  methods: {
    ...mapMutations([
      'setNavCurrent'
    ])
  }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

.menu {
  min-height:360px;
  width: 100%;
  text-align: center;
}
</style>
