<template>
  <div
    :class="[{ darkUploadAreaBorderColor:isDarkMode, normalUploadAreaBorderColor:!isDarkMode }
             ,'uploadArea']"
    @dragover.prevent
    @drop.prevent="_dropFIles"
  >
    <slot />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFIlesDropped: false
    }
  },
  methods: {
    // 詰まったとこ
    _dropFIles (e) {
      if (e.dataTransfer.files === null) {
        return 0
      }
      const f = e.dataTransfer.files[0]
      /* else if (e.dataTransfer.files.length === 1) {
        // ここはe.dataTransfer.files
        this._addFileData([...e.dataTransfer.files])
        this.isFIlesDropped = true
      } else {
        e.dataTransfer.files[Symbol.iterator] = function* () {
          const properties = Object.keys(this)
          for (const i of properties) {
            yield [this[i]]
          }
        } */
      this._readFile(f).then((wb) => {
        console.log(wb)
        this.$store.dispatch('runSetWb', wb)
        this.$store.dispatch('runSetRowList', this._getSheetJson(wb, this.displaySheetIndex))
      })
      // this._addFileData([...e.target.files])
      // 初期化処理
      e.target.value = ''
    },
    _addFileData (data) {
      this.$store.dispatch('runAddFileData', data)
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    },
    isDesktop () {
      return this.$device.isDesktop
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/variables';
.uploadArea {
  border-radius: 48px 48px 48px 48px / 48px 48px 48px 48px;
  display: flex;
  height: 90%;
  justify-content: center;
  width: 100%;
}

.fileUpload {

}
.uploadGuideText {
  text-align: center;
}
</style>
