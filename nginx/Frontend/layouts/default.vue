<template>
  <main
    id="myApp"
    class="normal-font-family"
    :class="[
      { darkPageColor:isDarkMode, normalPageColor:!isDarkMode }
      , { darkMainFontColor:isDarkMode ,normalMainFontColor:!isDarkMode }
      , { darkPageBackGroundColor:isDarkMode, normalPageBackGroundColor:!isDarkMode }
    ]"
  >
    <Header />
    <nuxt />
  </main>
</template>

<script>
import Header from './../components/layouts/header'
export default {
  data () {
    return {
      routingItems: [
        {
          id: 1,
          name: 'Home',
          route: '',
          imgName: {
            isDarkMode: 'DarkIcon/home.png',
            normal: 'NormalIcon/home.png'
          }
        },
        {
          id: 2,
          name: 'Content',
          route: '/content',
          imgName: {
            isDarkMode: 'DarkIcon/content.png',
            normal: 'NormalIcon/content.png'
          }
        },
        {
          id: 3,
          name: 'Account',
          route: '/account',
          imgName: {
            isDarkMode: 'DarkIcon/account.png',
            normal: 'NormalIcon/account.png'
          }
        }
      ]
    }
  },
  components: {
    Header
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    }
  }
}
</script>
<style lang="scss" scoped>
main{
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: flex-end;
  scrollbar-width: none;
  width: 100%;
  -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display:none;
  }
}
@media (max-width: 767px) {
main{
  height: 100%;
  width: 100%;
}
}
</style>
