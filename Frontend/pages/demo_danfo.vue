<template>
  <div id="page" class="basePage">
    <div
      class="contentsArea u-UIpaddingTop"
      :class="[
        { isOpenNormalMenuBackGround:isOpenMenu && !$device.isDesktop && !isDarkMode },
        { isOpenDarkMenuBackGround:isOpenMenu && !$device.isDesktop && isDarkMode }
      ]"
    >
      <label>
        アップロード
        <input type="file" @change="_upload($event)" />
      </label>
      <div ref="box"></div>
      <div ref="table"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataFrame: null
    }
  },
  methods: {
    _upload (e) {
      /*  const dfd = require('danfojs-node')
      console.log(e.target)
      const filePath = e.target.files[0].name
      dfd.read_excel({ source: filePath })
        .then((df) => {
          console.log(df)
        })
      console.log(filePath) */
    }
  },
  computed: {
    isOpenMenu () {
      return this.$store.getters.getOpenMenuBtn
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
