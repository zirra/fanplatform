export const storage = {

  storeValue (item, data) {
    if (data !== undefined) {
      if (localStorage.getItem(item)) {
        localStorage.removeItem(item)
        localStorage.setItem(item, JSON.stringify(data))
      } else {
        localStorage.setItem(item, JSON.stringify(data))
      }
    }
  },

  getValue (item) {
    if (localStorage.getItem(item)) {
      return JSON.parse(localStorage.getItem(item))
    } else {
      return false
    }
  },

  clearValue (item) {
    if (localStorage.getItem(item)) {
      localStorage.removeItem(item)
    }
  },

  valueExists (item) {
    if (localStorage.getItem(item)) {
      return true
    } else {
      return false
    }
  }
}
