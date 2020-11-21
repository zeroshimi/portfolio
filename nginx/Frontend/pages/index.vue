<template>
  <div id="page" class="basePage">
    <div
      class="contentsArea u-UIpaddingTop"
      :class="[
        { isOpenNormalMenuBackGround:isOpenMenu && !$device.isDesktop && !isDarkMode },
        { isOpenDarkMenuBackGround:isOpenMenu && !$device.isDesktop && isDarkMode }
      ]"
    >
      <div
        v-show="isOpenMenu"
        id="sideBar"
        class="contentsArea_sideBar"
        @click="_closeSideMenuMobile"
      >
        <SideBar @_addFileData="_addFileData" :workbooks="workbooks"/>
        <form class="u-displayNone">
          <label>
            <input
              id="addFilesIcon"
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
              @click.stop
              @input.prevent="_uploadFile($event);"
              multiple
            >
          </label>
        </form>
      </div>
      <div class="mainContents" :class="{ 'mainContents--openMenuWidth':isOpenMenu }">
        <section v-show="!isUpload" class="mainContents_pastAnalysis">
          <nuxt-link to="demo_danfo">demo</nuxt-link>
          <Heading class="mainContents_pastAnalysis_heading">
            過去データ
          </Heading>
          <!--ここクソコード-->
          <div class="mainContents_pastAnalysis_panels">
            <UserImage
              v-for="(name, index) in [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]"
              :key="index"
              :index="index"
              :title="String(name)"
              :isOpenMenu="isOpenMenu"
              :isDarkMode="isDarkMode"
            />
          </div>
        </section>
        <section v-if="isUpload" class="mainContents_newAnalysis">
          <Heading class="mainContents_newAnalysis_heading">
            Sheet名
          </Heading>
          <div class="mainContents_newAnalysis_tabs">
            <NavigationTab :activeTabIndex="activeTabIndex" :tabs="tabs" @_activateTab="_activateTab" />
            <SheetDataView :activeTabIndex="activeTabIndex" :tabs="tabs" :tableData="table" :activeWorkbook="workbooks[displayExcelIndex]"/>
          </div>
        </section>
      </div>
    </div>
    <Modal :isDarkMode="isDarkMode" :type="type" />
  </div>
</template>

<script>
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { mapGetters } from 'vuex'
import NavigationTab from './../components/main/sheetData/navigationSheetData'
import SheetDataView from './../components/main/sheetData/sheetDataView'
import Heading from './../components/globalComponent/headingCaption'
import SideBar from './../components/sideBar/sideBar'
import UserImage from './../components/main/userPortfolio'
import Modal from './../components/modal/modal'

export default {
  components: {
    NavigationTab,
    SheetDataView,
    Heading,
    SideBar,
    UserImage,
    Modal
  },
  data () {
    return {
      name: 'main',
      resData: '',
      tabs: [
        {
          id: 1,
          name: 'Table'
        },
        {
          id: 2,
          name: 'Summery'
        },
        {
          id: 3,
          name: 'Gragph'
        },
        {
          id: 4,
          name: 'Analysis'
        }
      ],
      activeTabIndex: 0,
      tableData: '',
      type: 'welcome'
    }
  },
  beforeMount () {
    this.$store.dispatch('runSetHeaderTitle', this.name)
    this.type = this.isFirstLogin ? 'welcome' : 'alert'
  },
  computed: {
    activeTab () {
      return this.activeTabIndex
    },
    fileDatas () {
      return (this.$store.getters.getFileData.length >= 1)
    },
    table () {
      return this.tableData
    },
    ...mapGetters({
      isDarkMode: 'getIsDarkMode',
      isOpenMenu: 'getOpenMenuBtn',
      isUpload: 'getIsUpload',
      displaySheetIndex: 'getDisplaySheet',
      displayExcelIndex: 'getDisplayExcel',
      filedata: 'getDisplayFile',
      isFirstLogin: 'GET_IS_FIRST_LOGIN'
    }),
    workbooks () {
      this.$store.dispatch('runSetIsUpload', this.$store.getters.getWb.length !== 0)
      return this.$store.getters.getWb
    },
    faTimes () {
      return faTimes
    },
    isModalOpen: {
      get () {
        return this.$store.getters.GET_IS_MODAL_OPEN
      },
      set ({ bool }) {
        this.$store.dispatch('RUN_RE_SET_IS_MODAL_OPEN', bool)
      }
    }
  },
  methods: {
    _postExpress () {
      this.$axios.$post(`${process.env.BASE_URL}/api/post`, { data: 'You Post it' }).then((res) => {
        console.log(res.data)
        return 0
      }).catch((e) => {
        return e
      })
    },
    _getDjango () {
      this.$axios.$post(`${process.env.BASE_URL}/api/django`, { data: { method: 'POST', postData: 'Shaka' } }).then((res) => {
        console.log(res)
        return 0
      }).catch((e) => {
        return e
      })
    },
    _activateTab (index) {
      this.activeTabIndex = index
    },
    // アップロード処理
    _uploadFile (e) {
      const files = e.target.files
      files.forEach((file) => {
        console.log(file)
        this._readFile(file).then((wb) => {
          this.$store.dispatch('runSetWb', { workbook: wb, name: file.name })
          this.$store.dispatch('runSetIsUpload', true)
        })
      })
      // 初期化処理
      e.target.value = ''
    },
    _addFileData (data) {
      this.$store.dispatch('runAddFileData', data)
    },
    _closeSideMenuMobile () {
      if (!this.$device.isDesktop) {
        this.$store.dispatch('runSetOpenMenuBtn', this.$store.getters.isOpenMenu)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/variables';
.fade-enter-active, .fade-leave-active {
  transition: all .5s linear;
}

.fade-enter, .fade-leave-to {
  width: 0;
}

@media (max-width: 767px) {
  .fade-enter-active, .fade-leave-active {
    transition: all .5s linear;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}

.mainContents{
  background-color: inherit;
  padding:16px 8px 16px 8px;
  transition: all .5s linear;
  &_pastAnalysis {
    height: 100%;
    width: 100%;
    &_heading {
      align-items: center;
      display: flex;
      height: 5%;
    }
    &_panels {
      height: 90%;
      overflow: scroll;
    }
  }
  &_newAnalysis {
    height: 100%;
    width: 100%;
    &_heading {
      align-items: center;
      display: flex;
      height: 5%;
    }
    &_tabs {
      height: 95%;
    }
  }
  &--openMenuWidth {
    transition: all .5s linear;
    width: 70%;
  }
}

.isOpenNormalMenuBackGround {
  background-color:rgba(0, 0, 0, 0.5);
}

.isOpenDarkMenuBackGround {
  background-color:rgba(255, 255, 255, 0.2);
}
.modal {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
  &_main {
    background-color: #ddd;
    border-radius: 16px;
    height: 50%;
    min-width: 540px;
    overflow: hidden;
    width: 50%;
    z-index: 501;
    &_header {
      align-items: center;
      display: flex;
      height: 48px;
      justify-content: center;
      padding: 0 16px;
      position: relative;
      width: 100%;
      &--backgroundColor {
        background-color: $dark-sub-color;
      }
      &_close {
        position: absolute;
        right: 16px;
        top: 16px;
        &:hover {
          cursor: pointer;
          &:active {
            color: red;
          }
        }
      }
      &_title {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        width: 100%;
      }
    }
    &_content {
      height: calc(100% - 48px);
      padding: 16px;
      width: 100%;
    }
  }
}
</style>
