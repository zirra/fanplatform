<template>
  <div class="menu">
    <div v-for="item in options" v-bind:key="item._id">
      <menu-tile v-bind:item="item"></menu-tile>
    </div>
  </div>
</template>

<script>
import Tile from './navigation/Tile'

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
      ]
    }
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
