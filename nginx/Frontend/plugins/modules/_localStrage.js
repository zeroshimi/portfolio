import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'storedData',
      paths: ['isDarkMode']
    })(store)
  })
  console.log({ store })
}
