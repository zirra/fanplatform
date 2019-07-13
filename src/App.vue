<template>
  <div id="app">

    <div id="back"></div>
    
    <div v-if="showPromo">
      <super-promo :item="promo"></super-promo>
    </div>
    
    <div v-if="showPrize">
      <prize-vue :item="prize"></prize-vue>
    </div>
    
    <main v-if="!notification">
      <div style="z-index:100;">
        <div><img :src="getHeader()" style="width:100%;"></div>
        <router-view style="padding-bottom:128px;"></router-view>
      </div>
    </main>

    <footer>
      <div class="footer-contents">
        <router-link to="/offer"><img :src="getImg('offer') + '.png'" style="margin-left:0px;"></router-link>
        <router-link to="/schedule"><img :src="getImg('schedule') + '.png'"></router-link>
        <a @click="home"><img :src="getImg('home') + '.png'"></a>
        <router-link to="/roster"><img :src="getImg('roster') + '.png'"></router-link>
        <router-link to="/shop"><img :src="getImg('shop') + '.png'"></router-link>
      </div>
    </footer>

  </div>
</template>

<script>
import SuperPromoVue from './components/screens/SuperPromo.vue'
import PrizeVue from '@/components/screens/Prize'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import { storage } from './utils/dao'

export default {
  name: 'app',
  components: {
    'super-promo': SuperPromoVue,
    'prize-vue': PrizeVue
  },
  data () {
    return {
      prize: null,
      promo: null,
      baseUrl: process.env.ASSETS
    }
  },
  mounted () {
    if (this.user.username) {
      this.$socket.emit('addUser', this.user.username)
    } else {
      this.$router.push(`/${storage.getValue('user')}`)
    }
  },
  methods: {
    home () {
      // console.log(this.username + '<13241234235')
      if (this.username) {
        this.$socket.emit('addUser', this.username)
        this.$router.push(`/${this.username}`)
      } else {
        this.$router.push(`/`)
      }
    },
    setNav (target) {
      this.setNavCurrent(target)
    },
    setPrize (data) {
      this.setPrizeState(true)
      console.log(data)
      this.prize = data
    },
    ...mapActions([
      'setUser'
    ]),
    ...mapMutations([
      'setNotification',
      'setPrizeState'
    ]),
    getImg (img) {
      if (img === 'offer') {
        if (img === this.navCurrent) {
          return this.baseUrl + '/icon_coupon_selected'
        } else {
          return this.baseUrl + '/icon_coupon'
        }
      }
      if (img === 'schedule') {
        if (img === this.navCurrent) {
          return this.baseUrl + '/icon_calendar_selected'
        } else {
          return this.baseUrl + '/icon_calendar'
        }
      }
      if (img === 'home') {
        if (img === this.navCurrent) {
          return this.baseUrl + '/icon_football_selected'
        } else {
          return this.baseUrl + '/icon_football'
        }
      }
      if (img === 'roster') {
        if (img === this.navCurrent) {
          return this.baseUrl + '/icon_helmet_selected'
        } else {
          return this.baseUrl + '/icon_helmet'
        }
      }
      if (img === 'shop') {
        if (img === this.navCurrent) {
          return this.baseUrl + '/icon_shopping_selected'
        } else {
          return this.baseUrl + '/icon_shopping'
        }
      }
    },
    getHeader () {
      switch (this.navCurrent) {
        case 'home':
          return this.baseUrl + '/KC_header_home.jpg'
        case 'offer':
          return this.baseUrl + '/KC_header_sponsors.jpg'
        case 'schedule':
          return this.baseUrl + '/KC_header_schedule.jpg'
        case 'roster':
          return this.baseUrl + '/KC_header_team.jpg'
        case 'shop':
          return this.baseUrl + '/KC_header_shop.jpg'
        default :
          return this.baseUrl + '/logo.png'
      }
    }
  },
  computed: {
    prizeThere () {
      return this.prize
    },
    ...mapGetters([
      'showPromo',
      'showPrize',
      'notification',
      'user',
      'username',
      'appId',
      'navCurrent'
    ])
  },
  sockets: {
    connect () {
      this.isConnected = true
      console.log('server connected')
    },

    disconnect () {
      this.isConnected = false
      console.log('server disconnected')
    },

    chat (data) {
      this.socketMessage = data
    },

    updateApp (data) {
      console.log(data)
      try {
        if (data !== null) {
          this.setNotification(true)
          this.promo = JSON.parse(data)
        } else {
          this.setNotification(false)
          if (this.showPrize) {
            this.setPrizeState(false)
          }
          this.promo = null
        }
      } catch (e) {
        this.setNotification(false)
        this.promo = null
      }
    },

    userSigned (data) {
      if (data.username !== undefined) {
        console.log(data)
        let usern = data.username.split('-')
        console.log(usern[1])
        this.setUser(usern[1])
        storage.storeValue('user', usern[1])
      } else {
        this.setUser(storage.getValue('user'))
      }
    },

    userJoined (data) {
      console.log(data)
    },

    testCall (data) {
      if (data != null) {
        this.setPrize(JSON.parse(data))
        console.log(this.prize)
      } else {
        this.setPrize(false)
        this.prize = null
      }
    }

  }
}
</script>

<style>

html { height:100%; width:100%; }
body {
  margin: 0;
  height:100%; width:100%; 
}

#back {
  z-index:-1;
  background-color: #fff;
  width: 100%;
  height:1000px;
  position: fixed;
  background: url('https://s3.us-east-2.amazonaws.com/ds-stadium-bucket/chiefs/halftone_background@2x.png') fixed bottom;
  background-repeat: no-repeat; 
  background-position: bottom;
  background-attachment: fixed;       
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

.apphead {
  font-family: 'Alfa Slab One', cursive;
  color: #fff200;
}

h1, h2, h3, h4 {
  margin-top: 0px;
  margin-bottom: 0px;
  color: #CA2430;
}

main {
  z-index: 10;
  text-align: center;
  padding-top: 0px;
}

header {
  position: fixed;
  z-index: 10000;
  width: 100%;
  margin: 0;
  height: 76px;
  background-color:#1C3F9B;
  color: #ffffff;
  border-bottom: solid 1px #fff;
}

header img {
  height: 90px;
  float: left;
  margin: 0px 8px;
}
header span {
  width: 100%;
  display: block;
  position: relative;
  font-size: 22px;
  line-height: 1.2;
  letter-spacing: .04em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 10px;
  margin-left: 16px;
}

.content-container {
  width: 94%;
  margin: 3%;
  text-align: left;
}

.btn {
  padding: 5% 5%;
  background-color: #1C3F9B;
  border-radius: 1em;
  color: #fff200;
  border-color: #fff200;
}

.btn-yellow {
  margin: 1% 2%;
  padding: 2% 5%;
  background-color: #f4b843;
  color: #CA2430;
  border-style: none;
  font-weight: 700;
  font-size: 1.2em;
}

.btn-red {
  margin: 1% 2%;
  padding: 2% 5%;
  background-color: #CA2430;
  color: #f4b843;
  border-radius: .8em;
  border-style: none;
  font-weight: 700;
  font-size: 1.2em;
}
footer {
  text-align:center;
  bottom: 0;
  width: 100%;
  position: fixed;
  height: 60px;
  background-color:#fff;
  color: #ffffff;
  z-index: 10001;
}

.footer-contents {
  margin: 0px auto;
  padding: 0px auto;
  height: 50px;
  width: 100%;
  text-align: center;
}
.footer-contents img {
  float: none;
  margin: 10px 10px 0px 10px;
}


</style>

