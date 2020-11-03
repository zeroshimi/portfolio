<template>
  <div
    class="sideMenu u-UIpaddingBottom"
    :class="[{ darkSideMenuBackGroundColor:isDarkMode, normalSideMenuBackGroundColor:!isDarkMode }
             , { darkSideMenuColor:isDarkMode, normalSideMenuColor:!isDarkMode }]"
    @click.prevent.stop
  >
    <section class="sideMenu_upload">
      <div class="sideMenu_upload_header">
        <fa :icon="faUpload" @click="_logInput" draggable="false" class="addExcelBtn"/>
        <div class="sideMenu_upload_heading">
          <heading>
            アップロード
          </heading>
        </div>
      </div>
      <!--pre-->
      <button class="button" @click="returnSheetData">コンソール</button>
      <upload>
        <template>
          <UploadFileList />
        </template>
      </upload>
    </section>
    <DarkModeBtn />
  </div>
</template>

<script>
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import DarkModeBtn from './../ui/btn/darkModeBtn'
import upload from './uploadArea'
import heading from './headingCaption'
import UploadFileList from './uploadFileList'
export default {
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
    wb () {
      return this.$store.getters.getWb
    },
    faUpload () {
      return faUpload
    }
  },
  components: {
    DarkModeBtn,
    upload,
    heading,
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
