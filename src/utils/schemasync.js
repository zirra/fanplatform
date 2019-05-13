import {openDb} from 'idb'

export const SchemaSyncHandler = {
  sync () {
    openDb('VueApp', 1, upgradeDB => {
      upgradeDB.createObjectStore('alldata', {keyPath: 'id'})
    })
  }
}
