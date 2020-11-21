<template>
  <div>
    <div
      v-for="(tabData, index) in tabs"
      :id="'sheetData'+index"
      :key="index"
      :aria-hidden="String(!(activeTabIndex===index))"
      v-show="activeTabIndex===index"
      class="sheetDataView_container"
      :class="[
        { darkPageBackGroundColor:isDarkMode, normalPageBackGroundColor:!isDarkMode }
        , { 'is-active':(activeTabIndex===index), '':!(activeTabIndex===index) }
      ]"
    >
      <Table
        v-if="index===0"
        :tabData="tabData"
        :index="index"
        :tableData="tableData"
        class="table table--smoothScroll"
      />
      <Summery v-if="index===1" :tabData="tabData">
        <GeneralPanel>
          <heading class="u-displayNone">
            {{ JSON.stringify(activeWorkbook) }}
          </heading>
          あああああああ
        </GeneralPanel>
      </Summery>
      <Graph v-if="index===2" :tabData="tabData" />
      <Analysis v-if="index===3" :tabData="tabData" />
    </div>
  </div>
</template>

<script>
import Table from './tabView/table'
import Summery from './tabView/summery'
import Graph from './tabView/graph'
import Analysis from './tabView/analysis'
import GeneralPanel from './../../globalComponent/generalPanel'
import heading from './../../globalComponent/headingCaption'
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
    },
    tableData: {
      type: String,
      required: true,
      default () {
        return '<table></table>'
      }
    },
    activeWorkbook: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      jsonOptions: {
        raw: false
      }
    }
  },
  components: {
    Table,
    Summery,
    Graph,
    Analysis,
    GeneralPanel,
    heading
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    },
    filedata () {
      return this.$store.getters.getDisplayFile
    },
    sheetIndex () {
      return this.$store.getters.getDisplaySheet
    }
  },
  methods: {
    _remakeArray (array, key) {
      let num = 0
      const newArray = array.map((data) => {
        const obj = {
          value: data[key],
          name: key,
          id: num
        }
        num = num + 1
        return obj
      })
      return newArray
    },
    check (data) {
      console.log(data)
      return data
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../../assets/scss/variables';
.sheetDataView {
  height: 95%;
  &_container {
    height: 100%;
    padding: 8px;
    overflow: scroll;
    &.darkPageBackGroundColor {
      &.is-active {
        background-color: $dark-sub-color;
      }
    }
    &.normalPageBackGroundColor {
      &.is-active {
        background-color: $normal-sub-color;
      }
    }
  }
}
.table {
  height: 100%;
  overflow: scroll;
  width: 100%;
  &--smoothScroll {
    will-change: transform;
  }
  &_heading {
    align-items: 5%;
    display: flex;
    height: 5%;
    width: 100%;
  }
  &_main {
    height: 95%;
    width: 100%;
    &:active {
      cursor: move;
    }
  }
}
</style>
