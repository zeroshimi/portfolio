<template>
  <section class="uploadedFiles">
    <ul class="ul uploadedFiles_list">
      <li
        v-for="(file, index) in fileList"
        :key="index"
        class="uploadedFiles_list_panels uploadedFiles_list_panels--boxShadow  uploadedFiles_list_panels--cursor u-font-size-s"
        :class="
          [
            { darkMainFontColor:isDarkMode, normalMainFontColor:!isDarkMode },
            { darkFileListBackGroundColor:isDarkMode, normalFileListBackGroundColor:!isDarkMode }
          ]
        "
      >
        <FileBtnContaienr :index="index" :file="file" />
      </li>
    </ul>
  </section>
</template>

<script>
import FileBtnContaienr from './../ui/container/fileBtnContainer'
export default {
  data () {
    return {}
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    },
    fileList () {
      return this.$store.getters.getFileData
    }
  },
  methods: {
    _switchExpanded (e) {
    },
    _setExcel (file) {
      this.$store.dispatch('runSetDisplayFile', file)
    }
  },
  components: {
    FileBtnContaienr
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/variables';
.uploadedFiles {
  padding: 32px 0;
  width: 100%;
  &_list {
    flex-wrap: wrap;
    &_panels {
      border-radius: 5px;
      margin:0 0 4px 0;
      padding: 8px 0 8px 0;
      width: 100%;
      &--boxShadow {
        box-shadow: 0 0 .5rem rgba(255, 255, 255, .2 );
      }
      &--cursor {
        cursor: pointer;
      }
    }
  }
}
</style>
