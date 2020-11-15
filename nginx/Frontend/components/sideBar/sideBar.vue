<template>
  <div
    class="sideMenu u-UIpaddingBottom"
    :class="[{ darkSideMenuBackGroundColor:isDarkMode, normalSideMenuBackGroundColor:!isDarkMode }
             , { darkSideMenuColor:isDarkMode, normalSideMenuColor:!isDarkMode }]"
    @click.prevent.stop
  >
    <section class="sideMenu_upload">
      <div class="sideMenu_upload_header">
        <fa :icon="faUpload" @click="_logInput" draggable="false" class="addExcelBtn" />
        <div class="sideMenu_upload_heading">
          <Heading>
            アップロード
          </Heading>
        </div>
      </div>
      <Upload>
        <template>
          <UploadFileList :workbooks="workbooks" v-if="workbooks.length!==0"/>
        </template>
      </Upload>
    </section>
    <DarkModeBtn />
  </div>
</template>

<script>
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import DarkModeBtn from './../uniqueLayout/darkModeBtn'
import Upload from './part/uploadArea'
import Heading from './../globalComponent/headingCaption'
import UploadFileList from './part/uploadFileList'
export default {
  props: {
    workbooks: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    },
    fileList () {
      return this.$store.getters.getFileData
    },
    isOpenMenu () {
      return this.$store.getters.getOpenMenuBtn
    },
    computedWorkbooks () {
      console.log(this.workbooks)
      return this.workbooks
    },
    faUpload () {
      return faUpload
    }
  },
  components: {
    DarkModeBtn,
    Upload,
    Heading,
    UploadFileList
  },
  methods: {
    _clickInput () {
      const input = this.$refs.addExcelFile
      input.click()
    },
    _logInput () {
      document.getElementById('addFilesIcon').click()
    },
    // test
    returnSheetData () {
      const json = this._getSheetJson(this.wb, 0)
      console.log(json)
    }
  },
  data () {
    return {
      clickUpload: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/variables';
.sideMenu {
  padding: 16px 8px 0 8px;
  &_upload {
    height: 100%;
    width: 100%;
    &_header{
      align-items: center;
      display: flex;
      flex-direction: row-reverse;
      height: auto;
    }
    &_heading{
    height: auto;
    overflow:hidden;
    white-space: nowrap;
  }
  }
}
.excelDisplayBtnContaner{
  padding: 32px 5% 0 5%;
}

.submitBtn-enter-active,
.submitBtn-leave-active {
  transition: opacity 0.5s;
}

.submitBtn-enter,
.submitBtn-leave-active {
  opacity: 0;
}
.addExcelBtn {
  color: inherit;
  cursor: pointer;
  height: 32px;
  width: 32px;
  &:active {
    color: #999999;
  }
}
@media (max-width: 767px) {
  .sideMenu {
    width: 80%;
    z-index: 9;
    &_upload {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 40%;
      justify-content: space-between;
      padding: 0 5% 0 5%;
      width: 100%;
    }
  }
}
</style>
