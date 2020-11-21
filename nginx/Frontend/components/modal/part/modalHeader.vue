<template>
  <div class="header header--backgroundColor" :class="{normalModalHeader: !isDarkMode, darkModalHeader: isDarkMode}">
    <Heading><span class="header_title u-font-size-s">{{ type }}</span></Heading>
    <fa :icon="faTimes" draggable="false" class="header_close" @click="isModalOpen=!isModalOpen"/>
  </div>
</template>

<script>
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Heading from './../../globalComponent/headingCaption'
export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: false,
      default () {
        return true
      }
    },
    type: {
      type: String,
      required: true,
      default () {
        return 'welcome'
      }
    }
  },
  components: {
    Heading
  },
  computed: {
    isModalOpen: {
      get () {
        return this.$store.getters.GET_IS_MODAL_OPEN
      },
      set ({ bool }) {
        this.$store.dispatch('RUN_RE_SET_IS_MODAL_OPEN', bool)
      }
    },
    faTimes () {
      return faTimes
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/variables';
.header {
  align-items: center;
  display: flex;
  height: 48px;
  justify-content: flex-start;
  padding: 0 16px;
  position: relative;
  width: 100%;
  &--backgroundColor {
    background-color: $dark-sub-color;
  }
  &_close {
    position: absolute;
    right: 16px;
    top: 16px;
    &:hover {
      cursor: pointer;
      &:active {
        color: red;
      }
    }
  }
  &_title {
    text-transform: capitalize;
  }
}
</style>
