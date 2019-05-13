<template>
  <div>
    Snap chat return for {{id}}
  </div>
</template>

<script>
import { api } from '../../utils/api'
import { storage } from '../../utils/dao'

export default {
  name: 'snapchat-return',
  data () {
    return {
      id: null
    }
  },
  mounted () {
    console.log('here')
    this.id = this.$route.params.id
    api.getRaw(`/v1/user/auth/record/${this.id}`).then(
      response => {
        alert(response.data)
        storage.storeValue('userkeys', response.data)
        this.$router.push('/')
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style>

</style>
