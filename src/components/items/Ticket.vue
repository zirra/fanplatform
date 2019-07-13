<template>
  <div class="ticket">
    <h2 style="color:#f4b843; padding:2px 4px; margin:2px 4px;">Purchase Ticket</h2>
    <div class="teams">
      <div style="float:left; width: 40%; margin-left: 5%;">
        <img class="img-responsive logo" :src="item.team.logo" :alt="item.team.name">
      </div>
      <div style="float: left; width: 10%; margin-top:15%;">
        <h1 style="color:#E31836;">VS</h1>
      </div>
      <div style="float:left; width: 40%; margin-right: 5%;">
        <img class="img-responsive logo" src="https://res.cloudinary.com/nflleague/image/private/t_q-best/league/ujshjqvmnxce8m4obmvs" alt="Chiefs">
      </div>
    </div>
    <div>
      <h1 style="color:#fff; margin:0px; padding:0px;">{{item.team.name}}</h1>
      <p style="color:#fff; margin:0px; padding:0px;">vs</p>
      <h1 style="color:#fff; margin:0px; padding:0px;">Chiefs</h1>
      <p style="color:#fff; margin:0px; padding:0px;">{{item.date.date}}</p>
    </div>
    <div style="width: 98%; background-color: #CA2430; min-height:65px; margin:0px auto;">
      <img src="https://s3.us-east-2.amazonaws.com/ds-stadium-bucket/chiefs/applepay.png" alt="apple pay" 
      style="width:65%; margin:8px 0px auto;" @click="applePay"/>
    </div>
    <div style="margin-top:16px; padding-bottom:16px;">
      <button class="btn-yellow" @click="closeWindow">Close</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { api } from '@/utils/api'

let session = null
let request = null
let version = null
let merchantId = null
let shippingContactUpdate = null
let paymentAuthorizationResult = null
let settings = {}

export default {
  name: 'ticket-purchase',
  props: [
    'item'
  ],
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

      let murl = `/v1/metrics/ticket/purchase`
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
  },
  computed: {
    ...mapGetters([
      'applePayMethod',
      'demoCharge'
    ])
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
.ticket {
  margin-top: 16px;
  width: 90%;
  margin: 0px auto;
  background-color: #CA2430;
  border-radius: 25px;
  border: solid 2px #f4b843;
}

.teams {
  width: 100%;
  background-color: #f4b843;
  clear: both;
  float: none;
  display: inline-block;
}

.ticket img { 
  width: 100%;
}
</style>

