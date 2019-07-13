<template>
  <div class="tile-main">
    <div class="tile">
      <div class="tile-container">
        <router-link v-bind:to="mylink">
        <img v-bind:src="myimage" style="width:95%;">
        </router-link>
      </div>
    </div>
  </div>
 <!--
  <div class="tile-main">
    <div class="tile">
      <div class="tile-container">
        <router-link v-bind:to="mylink">
        <img v-bind:src="myimage" 
          style="float:left; margin-left:-25px; margin-top:-32px; margin-right:24px;">
        <h3 v-html="item.title" class="tile-link"></h3>
        </router-link>
      </div>
    </div>
  </div>
  -->
</template>

<script>
export default {
  name: 'menutile',
  props: [
    'item'
  ],
  data () {
    return {
    }
  },
  computed: {
    myimage: function () {
      return `${process.env.ASSETS}/${this.item.image}`
    },
    mylink: function () {
      return this.item.target
    }
  }
}
</script>

<style>

.tile-main {
  width: 100%;
  margin: 0px auto;
  padding: 0px auto;
}

.tile {
  width: 98%;
  padding-left:1%;
  margin: 2% 0%;
  height: 100%;
  /*border: solid 1px #fff;
  background-color: #1b3f9a;
  border-radius: 12px;
  color: #fff;
  margin: 0px auto;
  margin-bottom: 64px;
  */
}

.tile-container {
  /* margin-top: 18px; */
  text-align: left;
  /* padding :5%; */
}

.tile-link {
  color: #fff;
  font-size: 22px;
}

</style>
