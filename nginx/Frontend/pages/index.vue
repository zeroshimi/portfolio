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
          <heading class="mainContents_pastAnalysis_heading">
            過去データ
          </heading>
          <!--ここクソコード-->
          <div class="mainContents_pastAnalysis_panels">
            <userImage
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
          <heading class="mainContents_newAnalysis_heading">
            Sheet名
          </heading>
          <div class="mainContents_newAnalysis_tabs">
            <NavigationTab :activeTabIndex="activeTabIndex" :tabs="tabs" @_activateTab="_activateTab" />
            <SheetDataView :activeTabIndex="activeTabIndex" :tabs="tabs" :tableData="table" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavigationTab from './../components/main/sheetData/navigationSheetData'
import SheetDataView from './../components/main/sheetData/sheetDataView'
import heading from './../components/globalComponent/headingCaption'
import SideBar from './../components/sideBar/sideBar'
import userImage from './../components/main/userPortfolio'

export default {
  components: {
    NavigationTab,
    SheetDataView,
    heading,
    SideBar,
    userImage
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
      tableData: ''
    }
  },
  beforeMaunt () {
    this.$store.dispatch('runSetHeaderTitle', this.name)
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
      filedata: 'getDisplayFile',
      workbooks: 'getWb'
    })
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
      height: 95%;
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
</style>
