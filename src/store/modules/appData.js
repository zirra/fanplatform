const players = [
  {name: 'Chris Jones', url: 'roster_1.jpg', position: 'DT', id: '1'},
  {name: 'Frank Clark', url: 'roster_2.jpg', position: 'DE', id: '2'},
  {name: 'Patrick Mahomes', url: 'roster_3.jpg', position: 'QB', id: '3'},
  {name: 'Travis Kelce', url: 'roster_4.jpg', position: 'TE', id: '4'}
]

const demoCharge = {
  'countryCode': 'US',
  'currencyCode': 'USD',
  'merchantCapabilities': [
    'supports3DS'
  ],
  'supportedNetworks': [
    'visa',
    'masterCard',
    'amex',
    'discover'
  ],
  'total': {
    'label': 'Demo (Card is not charged)',
    'type': 'final',
    'amount': '1.99'
  }
}

const applePayMethod = {
  supportedMethods: 'https://apple.com/apple-pay',
  data: {
    version: 3,
    merchantIdentifier: 'merchant.digitalseat.chiefs',
    merchantCapabilities: ['supports3DS', 'supportsCredit', 'supportsDebit'],
    supportedNetworks: ['amex', 'discover', 'masterCard', 'visa'],
    countryCode: 'US'
  }
}
const state = {
  players,
  appId: 'chiefs-',
  demoCharge,
  applePayMethod
}

const mutations = {
}

const getters = {
  allPlayers (state) {
    return state.players
  },
  appId (state) {
    return state.appId
  },
  demoCharge: state => { return state.demoCharge },
  applePayMethod: state => { return state.applePayMethod }
}

const actions = {
}

export default {
  state,
  actions,
  mutations,
  getters
}
