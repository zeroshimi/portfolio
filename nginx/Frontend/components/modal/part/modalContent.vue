<template>
  <div class="content">
    <slot name="welcome" v-if="type==='welcome'"/>
    <slot name="alert" v-else-if="type==='alert'"/>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      default () {
        return 'welcome'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  height: calc(100% - 98px);
  overflow: hidden;
  padding: 16px;
  width: 100%;
  &_slide {
    height: 100%;
    width: 100%;
  }
}
</style>
