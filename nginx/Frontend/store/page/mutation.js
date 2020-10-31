const mutations = {
  setIsDarkMode (state, boolean) {
    state.isDarkMode = boolean
  },
  setOpenMenuBtn (state) {
    state.openMenuBtn = !state.openMenuBtn
  },
  setHeaderName (state, name) {
    state.headerName = name
  },
  resetMenuBtn (state, boolean) {
    state.openMenuBtn = boolean
  },
  setIsSignUp (state, bool) {
    state.isSignUp = bool
  }
}

export default mutations
