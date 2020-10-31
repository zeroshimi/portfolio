<template>
  <li class="generalPanel" :class="className">
    <slot />
    <div class="generalPanel_name">{{ dataList.name }}</div>
    <div class="generalPanel_type">{{ dataList.type }}</div>
    <div class="generalPanel_length">{{ dataList.length }}</div>
  </li>
</template>
<script>
export default {
  mounted () {
  },
  props: {
    className: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    dataList: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
