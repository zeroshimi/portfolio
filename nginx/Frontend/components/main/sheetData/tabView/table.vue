<template>
  <section v-dragscroll id="tableContainer" v-html="tableData" />
</template>
<script>
export default {
  props: {
    tabData: {
      type: Object,
      default () {
        return ''
      }
    },
    index: {
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
  }
}
</script>
<style lang="scss" scoped>
.heading {

}
</style>
