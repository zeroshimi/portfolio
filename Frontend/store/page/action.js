const actions = {
  runSetIsDarkMode ({ commit }, boolean) {
    commit('setIsDarkMode', boolean)
  },
  runSetOpenMenuBtn ({ commit }) {
    commit('setOpenMenuBtn')
  },
  runSetHeaderName ({ commit }, name) {
    commit('setHeaderName', name)
  },
  runResetMenuBtn ({ commit }, boolean) {
    commit('resetMenuBtn', boolean)
  },
  runSetIsSignUp ({ commit }, bool) {
    commit('setIsSignUp', bool)
  }
}

export default actions
