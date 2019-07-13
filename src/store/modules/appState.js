const allgames = [
  {
    date: {
      type: 'PS',
      week: 'WEEK 1',
      date: 'Sat 08/10 · 7:00PMCDT'
    },
    team: {
      name: 'Cincinnati Bengals',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/okxpteoliyayufypqalq'
    }
  },
  {
    date: {
      type: 'PS',
      week: 'WEEK 2',
      date: 'Sat 08/17 · 6:30PMCDT'
    },
    team: {
      name: 'Pittsburgh Steelers',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/xujg9t3t4u5nmjgr54wx'
    }
  },
  {
    date: {
      type: 'PS',
      week: 'WEEK 3',
      date: 'Sat 08/24 · 7:00PMCDT'
    },
    team: {
      name: 'San Francisco 49ers',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/dxibuyxbk0b9ua5ih9hn'
    }
  },
  {
    date: {
      type: 'PS',
      week: 'WEEK 4',
      date: 'Thu 08/29 · 7:00PMCDT'
    },
    team: {
      name: 'Green Bay Packers',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/gppfvr7n8gljgjaqux2x'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 1',
      date: 'Sun 09/08 · 12:00PMCDT'
    },
    team: {
      name: 'Jacksonville Jaguars',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/qycbib6ivrm9dqaexryk'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 2',
      date: 'Sun 09/15 · 3:05PMCDT'
    },
    team: {
      name: 'Oakland Raiders',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/gzcojbzcyjgubgyb6xf2'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 3',
      date: 'Sun 09/22 · 12:00PMCDT'
    },
    team: {
      name: 'Baltimore Ravens',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/ucsdijmddsqcj1i9tddd'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 4',
      date: 'Sun 09/29 · 12:00PMCDT'
    },
    team: {
      name: 'Detroit Lions',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/ocvxwnapdvwevupe4tpr'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 5',
      date: 'Sun 10/06 · 7:20PMCDT'
    },
    team: {
      name: 'Indianapolis Colts',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/ketwqeuschqzjsllbid5'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 6',
      date: 'Sun 10/13 · 12:00PMCDT'
    },
    team: {
      name: 'Houston Texans',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/bpx88i8nw4nnabuq0oob'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 7',
      date: 'Thu 10/17 · 7:20PMCDT'
    },
    team: {
      name: 'Denver Broncos',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/t0p7m5cjdjy18rnzzqbx'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 8',
      date: 'Sun 10/27 · 7:20PMCDT'
    },
    team: {
      name: 'Green Bay Packers',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/gppfvr7n8gljgjaqux2x'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 9',
      date: 'Sun 11/03 · 12:00PMCST'
    },
    team: {
      name: 'Minnesota Vikings',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/teguylrnqqmfcwxvcmmz'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 10',
      date: 'Sun 11/10 · 12:00PMCST'
    },
    team: {
      name: 'Tennessee Titans',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/pln44vuzugjgipyidsre'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 11',
      date: 'Mon 11/18 · 7:15PMCST'
    },
    team: {
      name: 'Los Angeles Chargers',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/lu22ddatqbdknq4wuazd'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 13',
      date: 'Sun 12/01 · 12:00PMCST'
    },
    team: {
      name: 'Oakland Raiders',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/gzcojbzcyjgubgyb6xf2'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 14',
      date: 'Sun 12/08 · 3:25PMCST'
    },
    team: {
      name: 'New England Patriots',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/moyfxx3dq5pio4aiftnc'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 15',
      date: 'Sun 12/15 · 12:00PMCST'
    },
    team: {
      name: 'Denver Broncos',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/t0p7m5cjdjy18rnzzqbx'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 16',
      date: 'Sun 12/22 · 7:20PMCST'
    },
    team: {
      name: 'Chicago Bears',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/ra0poq2ivwyahbaq86d2'
    }
  },
  {
    date: {
      type: 'RS',
      week: 'WEEK 17',
      date: 'Sun 12/29 · 12:00PMCST'
    },
    team: {
      name: 'Los Angeles Chargers',
      logo: 'https://res.cloudinary.com/nflleague/image/private/t_q-best/league/lu22ddatqbdknq4wuazd'
    }
  }
]

const state = {
  appState: 'somewhere',
  gameData: allgames,
  showPromo: false,
  showPrize: false,
  notification: false,
  notifications: [],
  navCurrent: null
}

const mutations = {
  setAppState (state, loc) {
    state.appState = loc
  },
  setNotification (state, bool) {
    state.showPromo = bool
    state.notification = bool
  },
  setPrizeState (state, bool) {
    state.showPrize = bool
    state.notification = bool
  },
  setNavCurrent (state, target) {
    state.navCurrent = target
  }
}

const getters = {
  appState (state) {
    return state.appState
  },
  allGameData (state) {
    return state.gameData
  },
  showPromo (state) {
    return state.showPromo
  },
  showPrize (state) {
    return state.showPrize
  },
  notification (state) {
    return state.notification
  },
  navCurrent: state => { return state.navCurrent }
}

const actions = {
  openNotify (context, id) {
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
