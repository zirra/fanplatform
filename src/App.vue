<template>
  <div id="app">
    <header v-on:click="home">
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <span class="apphead">CONSTELLATION<br/>FIELD</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div class="footer-container">
        digitalseat.com2019a
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    home () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

html {
  background: url('./assets/venue/background.png');
  background-position: top;
  background-attachment: fixed;
  background-repeat: repeat-y;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

body {
  margin: 0;
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

