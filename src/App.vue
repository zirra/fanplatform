<template>
  <div id="app">
    <div id="back"></div>
    <div v-if="showPromo">
      <super-promo :item="promo"></super-promo>
    </div>
    <div v-if="prizeThere">
      <prize-vue :item="prize"></prize-vue>
    </div>
    <img src="./assets/skeeters_header.png" style="width:100%;">
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div class="footer-contents">
        <router-link to="/offer"><img src="./assets/offer_icon@2x.png"></router-link>
        <router-link to="/schedule"><img src="./assets/schedule_icon@2x.png"></router-link>
        <router-link :to="{path:user.username, params: {id: user.username }}"><img src="./assets/home_icon@2x.png"></router-link>
        <router-link to="/roster"><img src="./assets/roster_icon@2x.png"></router-link>
        <router-link to="/shop"><img src="./assets/shop_icon@2x.png"></router-link>
      </div>
    </footer>
  </div>
</template>

<script>
// import { storage } from '@/utils/storage'
import SuperPromoVue from './components/screens/SuperPromo.vue'
import PrizeVue from '@/components/screens/Prize'
import {mapGetters, mapMutations} from 'vuex'
import { storage } from './utils/dao'

// {"test":"https://www.digitalseat.com", "img":"https://s3.us-east-2.amazonaws.com/ds-stadium-bucket/skeeters/skeeters_logo.png"}
export default {
  name: 'app',
  components: {
    'super-promo': SuperPromoVue,
    'prize-vue': PrizeVue
  },
  data () {
    return {
      prize: false,
      promo: null,
      user: null
    }
  },
  mounted () {
    this.user = storage.getValue('user')
    console.log('mounted ->' + this.user.username)
  },
  methods: {
    home () {
      this.user = storage.getValue('user')
      if (this.user) {
        this.$router.push(`/${this.user.username}`)
      } else {
        this.$router.push(`/`)
      }
    },
    setPrize (data) {
      console.log(`${data} <---set prize`)
      this.prize = data
    },
    ...mapMutations([
      'setNotification'
    ])
  },
  computed: {
    prizeThere () {
      return this.prize
    },
    ...mapGetters([
      'showPromo'
    ])
  },
  sockets: {
    connect () {
      this.isConnected = true
      if (this.user) {
        this.$socket.emit('addUser', this.user.username)
      }
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
          this.promo = null
        }
      } catch (e) {
        this.setNotification(false)
        this.promo = null
      }
    },

    userSigned (data) {
      storage.storeValue('user', data)
      console.log(data)
    },

    userJoined (data) {
      console.log(data + '<---------')
    },

    testCall (data) {
      if (data != null) {
        this.setPrize(true)
        this.prize = data
      } else {
        this.setPrize(false)
        this.prize = null
      }
    }

  }
}
</script>

<style>

body {
  margin: 0;
}

#back {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: url('./assets/halftone_background@2x.png') fixed bottom;
  background-repeat: no-repeat; 
  background-position: center;
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
  color: #fff;
}

.apphead {
  font-family: 'Alfa Slab One', cursive;
  color: #fff200;
}

h1, h2, h3, h4 {
  margin-top: 0px;
  color: #fff200;
}

main {
  text-align: center;
  padding-top: 80px;
  padding-bottom: 128px;
}

header {
  position: fixed;
  z-index: 10000;
  width: 100%;
  margin: 0;
  height: 76px;
  background-color:#1b3f9a;
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

footer {
  text-align:center;
  bottom: 0;
  width: 100%;
  position: fixed;
  height: 60px;
  background-color:#1C3F9B;
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

