<template>
  <label class="darkModeBtn darkModeBtn--color" :aria-expanded="isDarkMode.toString()" @click="_changeUiMode">
    <input type="checkbox" class="darkModeBtn_input u-displayNone"/>
    <div class="darkModeBtn_circle darkModeBtn_circle--color">
      <fa :icon="faSun" class="switchSVGSize" v-show="!isDarkMode" />
      <fa :icon="faMoon" class="switchSVGSize" v-show="isDarkMode" />
    </div>
  </label>
</template>

<script>
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
export default {
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    },
    faSun () {
      return faSun
    },
    faMoon () {
      return faMoon
    }
  },
  methods: {
    _changeUiMode () {
      this.$store.dispatch('runSetIsDarkMode', !this.$store.getters.getIsDarkMode)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/variables';
.darkModeBtn {
  border-radius: 9999px;
  bottom: 56px;
  display: flex;
  height: 34px;
  left: 10px;
  position: relative;
  width: 64px;
  transition: all .6s ease-in-out;
  &:focus{
    outline: blue;
  }
  &:hover{
    outline: blue;
    cursor: pointer;
  }
  &--color{
    &[aria-expanded="true"] {
      background-color: #357edd;
      border: 1px solid #357edd;
      .darkModeBtn_circle {
        align-items:center;
        background-color: #FFF;
        border-radius: 9999px;
        display: flex;
        justify-content: center;
        transition: all .3s ease-in-out;
        transform: translateX(100%);
        width: 32px;
        &--color {
          background-color: #FFF;
        }
      }
    }
    &[aria-expanded="false"] {
      background-color: rgba(220, 220, 220, .1);
      border: 1px solid rgba(0, 0, 0, .3);
      .darkModeBtn_circle {
        align-items:center;
        border-radius: 9999px;
        display: flex;
        justify-content: center;
        transition: all .3s ease-in-out;
        width: 32px;
        &--color {
          background-color: #FFF;
          border: 1px solid rgba(0, 0, 0, .3);
        }
      }
    }
  }
}

.darkModeBtn_input {
    display: none;
}

.switchSVGSize {
  height: 24px;
  width: 24px;
}

@media (max-width: 767px) {
  .darkModeBtn {
    border-radius: 9999px;
    bottom: $Ui-height;
    display: flex;
    height: 34px;
    left: 10px;
    position: fixed;
    width: 64px;
    transition: all .6s ease-in-out;
    &--color {
      &[aria-expanded="true"] {
        background-color: #357edd;
        border: 1px solid #357edd;
        .darkModeBtn__circle {
          align-items:center;
          border-radius: 9999px;
          display: flex;
          justify-content: center;
          transition: all .3s ease-in-out;
          transform: translateX(100%);
          width: 32px;
          &--color {
            background-color: #FFF;
          }
        }
      }
      &[aria-expanded="false"] {
        background-color: rgba(220, 220, 220, .1);
        border: 1px solid rgba(0, 0, 0, .3);
        .darkModeBtn__circle {
          align-items:center;
          border-radius: 9999px;
          display: flex;
          justify-content: center;
          transition: all .3s ease-in-out;
          width: 32px;
          &--color {
            background-color: #FFF;
            border: 1px solid rgba(0, 0, 0, .3);
          }
        }
      }
    }
  }
}

.darkModeBtn__input {}

.switchSVGSize {
  height: 24px;
  width: 24px;
}

</style>
