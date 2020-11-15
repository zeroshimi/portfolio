<template>
  <xlsx-read
    :file="filedata"
    class="sheetDataView"
  >
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
        <template #default="{loading}">
          <span v-if="loading" class="loadingText">Loading...</span>
          <xlsx-json :sheet="sheetIndex" :options="jsonOptions">
            <template #default="{collection}">
              <!--v-if="collection"大事-->
              <ul v-if="collection" class="ul">
                <GeneralPanel
                  v-for="(raw, index) in Object.keys(collection[0])"
                  :key="index"
                  :dataList="_remakeArray(collection, raw)"
                >
                  <heading class="u-displayNone">
                    {{ raw }}
                  </heading>
                  あああああああ
                </GeneralPanel>
              </ul>
            </template>
          </xlsx-json>
        </template>
      </Summery>
      <Graph v-if="index===2" :tabData="tabData" />
      <Analysis v-if="index===3" :tabData="tabData" />
    </div>
  </xlsx-read>
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
