<template>
  <button
    id="js-buttonHamburger"
    type="button"
    class="button c-button p-hamburger"
    aria-controls="global-nav"
    :aria-expanded="isOpenMenu.toString()"
    @click="_openMenuBtn"
  >
    <span :class="[{ darkHumbergerBtnLineColor:isDarkMode, normalHumbergerBtnLineColor:!isDarkMode }, 'p-hamburger_line']">
      <span class="u-visuallyHidden">
        メニューを開閉する
      </span>
    </span>
  </button>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    _openMenuBtn () {
      this.$store.dispatch('runSetOpenMenuBtn')
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    },
    isOpenMenu () {
      return this.$store.getters.getOpenMenuBtn
    },
    fileData () {
      if (this.$store.getters.getFileData.length === 0) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/variables';
.c-button {
  appearance: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: inline-block;
  position: relative;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.p-hamburger {
  bottom: 0;
  border-radius:50%;
  box-shadow: 0 0 2rem transparent;
  height: 48px;
  left: 7px;
  outline: none;
  position: absolute;
  right: 0;
  top: 7px;
  width: 48px;
  -webkit-transition: all .3s ease-in-out;
          transition: all .3s ease-in-out;
}
.p-hamburger:hover, .p-hamburger:focus{
  box-shadow: 0 0 .5rem rgba(255, 255, 255, .3);
}

.p-hamburger_line {
  bottom: 0;
  height: 2px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;
  -webkit-transition: inherit;
          transition: inherit;
}
.p-hamburger_line::before,
.p-hamburger_line::after {
  background-color: inherit;
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  width: 100%;
  -webkit-transition: inherit;
          transition: inherit;
}
.p-hamburger_line::before {
  top: -5px;
}
.p-hamburger_line::after {
  top: 5px;
}

.p-hamburger[aria-expanded="true"] .p-hamburger_line {
  background-color: transparent;
}

.p-hamburger[aria-expanded="true"] .p-hamburger_line::before,
.p-hamburger[aria-expanded="true"] .p-hamburger_line::after {
  background-color: #808080;
  top: 0;
}

.p-hamburger[aria-expanded="true"] .p-hamburger_line::before {
  -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
          transform: rotate(45deg);
}

.p-hamburger[aria-expanded="true"] .p-hamburger_line::after {
  -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
          transform: rotate(-45deg);
}

.u-visuallyHidden {
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

@media (max-width: 767px) {
.c-button {
  appearance: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: inline-block;
  position: relative;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.p-hamburger {
  bottom: 0;
  border-radius:50%;
  box-shadow: 0 0 2rem transparent;
  height: 48px;
  left: 7px;
  outline: none;
  position: absolute;
  right: 0;
  top: 7px;
  width: 48px;
  -webkit-transition: all .3s ease-in-out;
          transition: all .3s ease-in-out;
}
.p-hamburger:hover {
  box-shadow: 0 0 .5rem rgba(255, 255, 255, .5 );
}

.p-hamburger_line {
  bottom: 0;
  height: 2px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;
  -webkit-transition: inherit;
          transition: inherit;
}
.p-hamburger_line::before,
.p-hamburger_line::after {
  background-color: inherit;
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  width: 100%;
  -webkit-transition: inherit;
          transition: inherit;
}
.p-hamburger_line::before {
  top: -5px;
}
.p-hamburger_line::after {
  top: 5px;
}

.p-hamburger[aria-expanded="true"] .p-hamburger_line {
  background-color: transparent;
}

.p-hamburger[aria-expanded="true"] .p-hamburger_line::before,
.p-hamburger[aria-expanded="true"] .p-hamburger_line::after {
  top: 0;
}

.p-hamburger[aria-expanded="true"] .p-hamburger_line::before {
  -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
          transform: rotate(45deg);
}

.p-hamburger[aria-expanded="true"] .p-hamburger_line::after {
  -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
          transform: rotate(-45deg);
}

.u-visuallyHidden {
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
}
</style>
