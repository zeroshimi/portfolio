<template>
  <section v-dragscroll>
    <!--クソコード-->
    <slot />
  </section>
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
    }
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
.heading {

}
</style>
