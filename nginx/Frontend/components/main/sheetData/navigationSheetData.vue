<template>
  <nav class="sheetNavigation">
    <ul class="ul sheetNavigation_list sheetNavigation_list--cursor">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="sheetNavigation_list_tab sheetNavigation_list_tab--cursor"
        :class="[
          { darkNavigation:isDarkMode, normalNavigation: !isDarkMode }
          ,{ 'is-active': (activeTabIndex===index), '': !(activeTabIndex===index)}
        ]"
        @click="_activate(index)"
      >
        <a
          href="#"
          :aria-controls="'sheetData'+index"
          :aria-expanded="activeTabIndex===index"
          class="a"
          :class="{ 'u-font-size-ss' :!$device.isDesktop }"
        >
          {{ tab.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    activeTabIndex: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    }
  },
  methods: {
    _activate (index) {
      this.$emit('_activateTab', index)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../../assets/scss/variables';
.excelSheetNavigation {
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 5%;
  padding: 8px 16px 8px 16px;
  width: 25%;
  &.darkNavigation {
    color: $normal-base-color;
    &.is-active {
      background-color: $dark-sub-color;
    }
  }
  &.normalNavigation {
    color: $dark-base-color;
    &.is-active {
      background-color: $normal-sub-color;
    }
  }
  a {
    width: auto;
  }
}
.excelSheetNavigationContainer {
  display: flex;
}
.excelSheetNavigation {}

.sheetNavigation {
  &_list {
    display: flex;
    &_tab{
      border-radius: 5px 5px 0 0;
      display: flex;
      justify-content: center;
      height: 5%;
      padding: 8px 16px 8px 16px;
      width: 25%;
      &--cursor {
        cursor: pointer;
      }
      &.darkNavigation {
        color: $normal-base-color;
        &.is-active {
          background-color: $dark-sub-color;
          text-decoration: underline $normal-base-color;
          }
        }
      &.normalNavigation {
        color: $dark-base-color;
        &.is-active {
          background-color: $normal-sub-color;
          text-decoration: underline $dark-base-color;
        }
      }
      a {
        width: auto;
      }
    }
  }
}
</style>
