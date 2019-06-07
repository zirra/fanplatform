<template>
  <div>
    <img src="../assets/skeeters_header.png" style="width:100%; margin-top:-64px;">
    <div class="menu">
      <!-- div v-for="item in options" v-bind:key="item._id" -->
      <div style="width: 98%; margin-left: 2%; height:100%;" v-for="item in options" v-bind:key="item._id">
        <div style="width:50%; float:left;">
          <menu-tile v-bind:item="item"></menu-tile>
        </div>
      </div>
      <div style="height: 128px; margin-bottom:128px;"><br/><br/></div>
      
      <!--
      <menu-tile v-bind:item="snapopt" v-if="!loggedIn"></menu-tile>
      <menu-tile v-bind:item="snappedin" v-else></menu-tile>
      <menu-tile v-bind:item="settings"></menu-tile>
      -->
    </div>
  </div>
</template>

<script>
import Tile from './navigation/Tile'
import { storage } from '../utils/dao'
import { mapGetters } from 'vuex'
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
        {image: 'offers_btn@2x.png', title: 'Offers', target: '/offer'},
        {image: 'schedule_btn@2x.png', title: 'Schedule', target: '/schedule'},
        {image: 'team_btn@2x.png', title: 'Roster', target: '/roster'},
        {image: 'shop_btn@2x.png', title: 'Shop', target: '/shop'}
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
    } else {
      this.seat = this.$route.params.id
      if (!this.user && this.seat) {
        this.$socket.emit('addUser', this.seat)
      }
      if (this.user.username !== this.seat) {
        this.$socket.emit('addUser', this.seat)
      }
    }
    this.loggedIn = storage.valueExists('userkeys')
  },
  sockets: {
    addUser (data) {
      console.log(data)
      this.socketMessage = data
    }
  },
  computed: {
    ...mapGetters([
      'user'
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
