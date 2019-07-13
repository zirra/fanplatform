<template>
  <div>
    <div v-if="payView" id="payview">
      <img :src="baseUrl+'/apple_pay_opt.jpg'" alt="Apple Pay Window" style="width:94%;" @click="closePay" />
    </div>
    <div v-if="productView" id="productScreen">
      <product-view v-on:closeItem="closeModal" v-on:showApplePay="showAppleModal" v-bind:item="myProduct" />
    </div>
    <div class="content-container" v-if="!productView && !payView">
      <h1>Shop</h1>
      <div class="content-header">
        <router-link to="/store">Visit Our Online Store</router-link>
      </div>
      <div>
        <p>Check out our stadium favorites available at the souvenir shop.</p>
      </div>
      <div class="items">

        <div class="item-block">
          <img :src="baseUrl+'/prod_1.jpg'" alt="Kansas City Chiefs Hats" class="product-main" @click="itemClicked('prod_1')" />
        </div>

        <div class="item-block">
          <img :src="baseUrl+'/prod_2.jpg'" alt="Kansas City Chiefs Jerseys" class="product-main" @click="itemClicked('prod_2')" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import { mapMutations } from 'vuex'
import Product from '@/components/items/Product'
export default {
  name: 'shop-view',
  components: {
    'product-view': Product
  },
  mounted () {
    this.setNavCurrent('shop')
  },
  data () {
    return {
      baseUrl: process.env.ASSETS,
      myProduct: null,
      productView: false,
      payView: false
    }
  },
  methods: {
    itemClicked (item) {
      this.productView = true
      this.myProduct = `${item}_exploded.jpg`
      let murl = `/v1/metrics/shop/${item}`
      api.getRaw(murl)
        .then(
          response => {
            console.log(response.data)
          })
        .catch(error => {
          console.log(error)
        })

      console.log(item)
    },
    closeModal () {
      this.productView = false
    },
    showAppleModal () {
      window.scrollTo(0, 0)
      this.productView = false
      this.payView = true
    },
    closePay () {
      window.scrollTo(0, 0)
      this.productView = false
      this.payView = false
    },
    ...mapMutations([
      'setNavCurrent'
    ])
  }
}
</script>

<style>
.content-header {
  margin-top: 4px;
  width: 100%;
  padding: 4px 0px;
  border-bottom: solid 1px #c0c0c0;
  text-align: center;
}

.content-header a {
  color: #E31836;
  text-decoration: none;
}

.items {
  /* nothing*/
}

.product-main {
  border-radius: 15px;
  border: solid 2px #f4b843;
}

.items img { 
  width: 100%;
}

.item-block {
  background-color: rgba(255,255,255,.5);
  margin-bottom: 24px;
}

.item-block h4 {
  border-bottom: solid 1px #c0c0c0;
  margin-bottom: 4px;
}

#payview {
  position: absolute;
  top:0;
}
</style>
