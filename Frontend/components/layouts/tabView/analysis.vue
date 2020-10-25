<template>
  <section>
    <heading>
      {{ String(tabData.name) }}
    </heading>
  </section>
</template>
<script>
import heading from './../headingCaption'
export default {
  mounted () {
  },
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
