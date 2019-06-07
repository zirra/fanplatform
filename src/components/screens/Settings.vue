<template>
  <div>
    <p>User: {{user.username}}</p>
    <button v-on:click="killUserLocal" class="btn">Clear User</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'app-settings',
  computed: {
    ...mapGetters([
      'showPromo',
      'user'
    ])
  },
  methods: {
    killUserLocal () {
      this.$socket.emit('removeUser', this.user)
      this.killUser(this.user)
    },
    ...mapActions([
      'killUser'
    ])
  }
}
</script>

<style>

</style>
