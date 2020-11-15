<template>
  <section>
    <heading>
      {{ String(tabData.name) }}
    </heading>
    <GeneralBtn>
      通信
    </GeneralBtn>
  </section>
</template>
<script>
import heading from './../../../globalComponent/headingCaption'
import GeneralBtn from './../../../globalComponent/generalBtn'
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
    heading,
    GeneralBtn
  }
}
</script>
