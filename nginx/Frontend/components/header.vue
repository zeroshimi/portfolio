<template>
  <div
    id="header"
    class="header"
    :class="[
      { darkHeaderBorderColor:isDarkMode, normalHeaderBorderColor:!isDarkMode }
      , { darkHeaderBackGroundColor:isDarkMode, normalHeaderBackGroundColor:!isDarkMode }
    ]"
  >
    <div class="headerContainer">
      <HumbergerBtn v-show="$route.name!=='login'" />
      <div class="headerTitleContainer">
        <span
          :class="[
            'headerTitle'
            , 'u-uppercase'
            , 'header-font-family'
            , 'u-font-size-m'
            , { darkMainFontColor:isDarkMode, normalMainFontColor:!isDarkMode }
          ]"
        >
          {{ ($router.currentRoute.fullPath === '/login') ? headerName: $store.getters.getHeaderName }}
        </span>
      </div>
      <!--logoutボタン-->
      <div
        class="logOutBtnContainer"
      >
        <logOutBtn
          v-show="$auth.loggedIn"
          :methodsName="'logout'"
          :className="'logOutBtn'"
          :class="
            [{
               'darkLogoutBtnBackGroundColor':isDarkMode,
               'normalLogoutBtnBackGroundColor':!isDarkMode
             },
             'u-font-size-ss'
            ]
          "
          @logout="logout"
        >
          logout
        </logOutBtn>
      </div>
    </div>
  </div>
</template>

<script>
import HumbergerBtn from './uniqueLayout/humbergerMenuBtn'
import logOutBtn from './globalComponent/generalBtn'
export default {
  components: {
    HumbergerBtn,
    logOutBtn
  },
  computed: {
    headerName () {
      if (this.$store.getters.getIsSignUp === true) {
        return 'login'
      } else {
        return 'sign up'
      }
    },
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    }
  },
  methods: {
    async logout (e) {
      await this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/variables';
.header {
  border-bottom:solid 1px;
  position: fixed;
  top: 0;
  height: $Ui-height;
  width: 100%;
  z-index: 10;
}
.headerContainer {
  display: flex;
}
.headerTitleContainer {
  display: flex;
  align-items: center;
  display:flex;
  justify-content: center;
}
.headerTitle {
}
.logOutBtn{
  padding: 4px;
  position: fixed;
  text-decoration: underline;
  right: 16px;
  &:hover {
    background-color: inherit;
    text-decoration: none;
  }
  &:active {
    color: brown;
  }
  &:focus {
    background-color: inherit;
    text-decoration: none;
  }
  &Container {
    display: flex;
    align-items: center;
    width: auto;
  }
}
</style>
