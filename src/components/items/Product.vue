<template>
  <div class="product">
    <img :src="baseUrl+'/close_prod.jpg'" alt="Kansas City Chiefs Hats" @click="closeWindow" style="width:90%;"/>
    <img :src="baseUrl+'/'+item" alt="Kansas City Chiefs Hats"/>
    <div style="width: 98%; min-height:65px; margin:0px auto;">
      <img src="https://s3.us-east-2.amazonaws.com/ds-stadium-bucket/chiefs/applepay.png" alt="apple pay" style="width:64%; margin:8px 0px auto;"
        @click="applePay"/>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import { mapGetters } from 'vuex'
let session = null
let request = null
let version = null
let merchantId = null
let shippingContactUpdate = null
let paymentAuthorizationResult = null
let settings = {}

export default {
  name: 'product-view',
  props: [
    'item'
  ],
  data () {
    return {
      baseUrl: process.env.ASSETS
    }
  },
  computed: {
    ...mapGetters([
      'applePayMethod',
      'demoCharge'
    ])
  },
  methods: {
    closeWindow () {
      this.$emit('closeItem')
    },
    applePay () {
      if (typeof ApplePaySession === 'undefined') {
        alert('Your browser does not support Apple Pay. Please switch to a supported browser.')
      }
      let o = buildApplePayRequest(this.demoCharge)
      if (o['ApplePayPaymentRequest'] == null) {
        alert('Your input needs to include ApplePayPaymentRequest as a top level key.')
      }

      let murl = `/v1/metrics/shop/purchase`
      api.getRaw(murl)
        .then(
          response => {
            console.log(response.data)
          })
        .catch(error => {
          console.log(error)
        })

      request = o['ApplePayPaymentRequest']
      version = 3
      console.log(o)
      merchantId = o['merchantId']
      shippingContactUpdate = o['ApplePayShippingContactUpdate']
      paymentAuthorizationResult = o['ApplePayPaymentAuthorizationResult']
      settings = o['settings']
      if (settings == null) settings = {}

      // Reset counters
      // onshippingcontactselectedCount = 0
      // onpaymentauthorizedCount = 0

      console.log(merchantId)
      console.log(shippingContactUpdate)
      console.log(paymentAuthorizationResult)
      session = new ApplePaySession(version, request)
      window.session = session

      session.onshippingcontactselected = function onshippingcontactselected (event) {
        onshippingcontactselectedCount += 1
        let shippingContact = event.shippingContact
        appendFullLog('Shipping contact was selected: \n' + JSON.stringify(shippingContact, undefined, 4) + '\n')

        // make sure we use new items if it exists
        let update = {
          newTotal: request['total'],
          newLineItems: request['lineItems']
        }
        if (o['ApplePayShippingContactUpdate']['newTotal'] !== undefined) {
          update['newTotal'] = o['ApplePayShippingContactUpdate']['newTotal']
        }
        if (o['ApplePayShippingContactUpdate']['newLineItems'] !== undefined) {
          update['newLineItems'] = o['ApplePayShippingContactUpdate']['newLineItems']
        }

        settings['failuresBeforeSuccess'] = 1
        if (settings['failuresBeforeSuccess'] == null || settings['failuresBeforeSuccess'] >= onshippingcontactselectedCount) {
          if (shippingContactUpdate != null) {
            update['errors'] = errorFromDict(shippingContactUpdate['errors'])
          }
        }

        session.completeShippingContactSelection(update)
      }

      session.onshippingmethodselected = function onshippingmethodselected (event) {
        let shippingMethod = event.shippingMethod
        appendFullLog('Shipping method was selected: ' + JSON.stringify(shippingMethod, undefined, 4) + '\n')
        selectedShippingMethod = event.shippingMethod

        // make sure we use new items if it exists
        let update = {
          newTotal: request['total'],
          newLineItems: request['lineItems']
        }
        if (o['ApplePayShippingContactUpdate']['newTotal'] !== undefined) {
          update['newTotal'] = o['ApplePayShippingContactUpdate']['newTotal']
        }
        if (o['ApplePayShippingContactUpdate']['newLineItems'] !== undefined) {
          update['newLineItems'] = o['ApplePayShippingContactUpdate']['newLineItems']
        }

        session.completeShippingMethodSelection(update)
      }

      session.onpaymentauthorized = function onpaymentauthorized (event) {
        onpaymentauthorizedCount += 1
        let payment = event.payment
        currentPaymentToken = payment.token.paymentData
        appendFullLog('Shipping Contact:\n' + JSON.stringify(payment.shippingContact, undefined, 4) + '\n')
        appendFullLog('Billing Contact:\n' + JSON.stringify(payment.billingContact, undefined, 4) + '\n')
        appendFullLog('Payment Token:\n' + JSON.stringify(payment.token, undefined, 4) + '\n')
        window.setTimeout(function () {
          settings['failuresBeforeSuccess'] = 1
          let update = {status: ApplePaySession.STATUS_SUCCESS}
          if (settings['failuresBeforeSuccess'] == null || settings['failuresBeforeSuccess'] >= onpaymentauthorizedCount) {
            if (paymentAuthorizationResult != null) {
              if (paymentAuthorizationResult['status'] != null) {
                update['status'] = paymentAuthorizationResult['status']
              }
              if (paymentAuthorizationResult['errors'] != null) {
                update['errors'] = errorFromDict(paymentAuthorizationResult['errors'])
              }
            }
          }

          session.completePayment(update)
          appendFullLog('\n\ncompletePayment executed with the following parameters:\n' + JSON.stringify({'status': update['status'], 'errors': errorsToJSONObject(update['errors'])}, undefined, 4) + '\n')
        }, 2000)
      }

      session.onpaymentmethodselected = function onpaymentmethodselected (event) {
        let paymentMethod = event.paymentMethod

        appendFullLog('Payment method was selected: ' + JSON.stringify(paymentMethod, undefined, 4) + '\n')

        // make sure we use new items if it exists
        let update = {
          newTotal: request['total'],
          newLineItems: request['lineItems']
        }
        if (o['ApplePayShippingContactUpdate']['newTotal'] !== undefined) {
          update['newTotal'] = o['ApplePayShippingContactUpdate']['newTotal']
        }
        if (o['ApplePayShippingContactUpdate']['newLineItems'] !== undefined) {
          update['newLineItems'] = o['ApplePayShippingContactUpdate']['newLineItems']
        }

        appendFullLog('\n\ncompletePaymentMethodSelection:\n' + JSON.stringify(update, undefined, 4) + '\n')
        session.completePaymentMethodSelection(update)
      }

      session.oncancel = function () {
        appendFullLog('\nPayment cancelled by WebKit:\n')
        appendFullLog('session.oncancel\n')
      }

      session.onvalidatemerchant = function onvalidatemerchant (event) {
        callStartSession(session, event.validationURL)
      }

      session.begin()
    }
  }
}
function buildApplePayRequest (dc) {
  var req = {}
  req.merchantId = 'merchant.com.apdemo'
  try {
    //  req.settings = JSON.parse($('#settings').val());
    req.ApplePayPaymentRequest = dc
    req.ApplePayShippingContactUpdate = {
      'administrativeArea': 'CA',
      'country': 'United States',
      'countryCode': 'US',
      'familyName': '',
      'givenName': '',
      'locality': 'San Francisco',
      'phoneticFamilyName': '',
      'phoneticGivenName': '',
      'postalCode': '94114',
      'subAdministrativeArea': '',
      'subLocality': ''
    }
    req.ApplePayPaymentAuthorizationResult = {
      'A': {
        'status': 0
      },
      'B': {
        'status': 1,
        'errors': [
          {
            'code': 'billingContactInvalid',
            'contactField': 'postalAddress',
            'message': 'Invalid name'
          },
          {
            'code': 'shippingContactInvalid',
            'contactField': 'emailAddress',
            'message': 'Invalid email'
          }
        ]
      }
    }
  } catch (err) {
    alert('Your input does not seem to be a valid JSON object.')
    return
  }
  return req
}
</script>

<style>
.product { 
  top: 16px;
  margin-left: 2%;
  width: 94%;
  background-color: #fff;
  border-radius: 15px;
  border: solid 2px #f4b843;
}
.product img {
  width: 100%;
}
</style>
