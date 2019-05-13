<template>
  <div class="menu">
    <div v-for="item in options" v-bind:key="item._id">
      <menu-tile v-bind:item="item"></menu-tile>
    </div>
    <menu-tile v-bind:item="snapopt" v-if="!loggedIn"></menu-tile>
    <menu-tile v-bind:item="snappedin" v-else></menu-tile>
  </div>
</template>

<script>
import Tile from './navigation/Tile'
import { storage } from '../utils/dao'

export default {
  name: 'hello',
  components: {
    'menu-tile': Tile
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      options: [
        {image: 'skeeter_shop.png', title: 'Schedule', target: '/schedule'},
        {image: 'skeeter_shop.png', title: 'Roster', target: '/roster'},
        {image: 'skeeter_shop.png', title: 'Shop', target: '/shop'}
      ],
      snapopt: {image: 'skeeter_shop.png', title: 'Snap', target: '/snap'},
      snappedin: {image: 'skeeter_shop.png', title: 'Share with Snapchat', target: '/snapchat'},
      loggedIn: false
    }
  },
  mounted () {
    this.loggedIn = storage.valueExists('userkeys')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  width: 100%;
  text-align: center;
}
</style>
