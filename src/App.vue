<template>
  <div id="app">
    <div v-if="showPromo">
      <super-promo :item="promo"></super-promo>
    </div>
    <header v-on:click="home">
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <span class="apphead">CONSTELLATION<br/>FIELD</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div class="footer-container">
        digitalseat.com 2019
      </div>
    </footer>
  </div>
</template>

<script>
// import { storage } from '@/utils/storage'
import SuperPromoVue from './components/screens/SuperPromo.vue'
import {mapActions, mapGetters, mapMutations} from 'vuex'

// {"test":"https://www.digitalseat.com", "img":"https://s3.us-east-2.amazonaws.com/ds-stadium-bucket/skeeters/skeeters_logo.png"}
export default {
  name: 'app',
  components: {
    'super-promo': SuperPromoVue
  },
  data () {
    return {
      promo: null
    }
  },
  mounted () {
    console.log('mounted ' + this.user)
  },
  methods: {
    home () {
      this.$router.push('/')
    },
    ...mapMutations([
      'setNotification'
    ]),
    ...mapActions([
      'setUser'
    ])
  },
  computed: {
    ...mapGetters([
      'showPromo',
      'user'
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
          this.promo = null
        }
      } catch (e) {
        this.setNotification(false)
        this.promo = null
      }
    },

    userSigned (data) {
      this.setUser(data)
      console.log(data)
    },

    userJoined (data) {
      console.log(data + '<---------')
    },

    testCall (data) {
      alert(data)
    }

  }
}
</script>

<style>

body {
  margin: 0;
  background: url('./assets/venue/background.png') fixed top;
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
  padding-top: 124px;
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
  bottom: 0;
  width: 100%;
  position: fixed;
  height: 50px;
  background-color:#1b3f9a;
  color: #ffffff;
  z-index: 10001;
  border-top: solid 1px #fff;
}

.footer-container {
  text-align: center;
  margin: 0px auto;
  padding: 0px auto;
}

</style>

