<template>
  <section>
    <heading>
      {{ String(tabData.name) }}
    </heading>
    <slot />
  </section>
</template>
<script>
import heading from './../headingCaption'
export default {
  props: {
    tabData: {
      type: Object,
      default () {
        return ''
      }
    }
  },
  components: {
    heading
  }
}
</script>
