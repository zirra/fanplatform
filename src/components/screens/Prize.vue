<template>
  <div class="prize">
    <div class="prize-holder">
      prize
    </div>
  </div>
</template>

<script>
export default {
  name: 'prize-view'
}
</script>

<style>
.prize { 
  z-index:20000;
  background-color: rgba(255,255,255,.75);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  text-align:center;
}

.prize-hero {
  width: 81.5%;
  padding: 4.35%;
  background-color: #000;
  margin-top:16px;
}

.prize-holder {
  width: 100%;
  background-color: #fff;
}
</style>
