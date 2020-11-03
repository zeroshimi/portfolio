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
        <SideBar @_addFileData="_addFileData" />
        <form class="u-displayNone">
          <label>
            <input
              id="addFilesIcon"
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
              @click.stop
              @input.prevent="_changeInputElement($event); _uploadFile($event);"
            >
          </label>
        </form>
      </div>
      <div class="mainContents" :class="{ 'mainContents--openMenuWidth':isOpenMenu }">
        <section v-show="!fileDatas" class="mainContents_pastAnalysis">
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
        <section v-if="fileDatas" class="mainContents_newAnalysis">
          <heading class="mainContents_newAnalysis_heading">
            Sheet名
          </heading>
          <div class="mainContents_newAnalysis_tabs">
            <NavigationTab :activeTabIndex="activeTabIndex" :tabs="tabs" @_activateTab="_activateTab" />
            <SheetDataView :activeTabIndex="activeTabIndex" :tabs="tabs" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationTab from './../components/layouts/navigationSheetData'
import SheetDataView from './../components/layouts/sheetDataView'
import heading from './../components/layouts/headingCaption'
import SideBar from './../components/layouts/sideMenu'
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
      activeTabIndex: 0
    }
  },
  beforeMaunt () {
    this.$store.dispatch('runSetHeaderTitle', this.name)
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    },
    isOpenMenu () {
      return this.$store.getters.getOpenMenuBtn
    },
    activeTab () {
      return this.activeTabIndex
    },
    fileDatas () {
      return (this.$store.getters.getFileData.length >= 1)
    },
    filedata () {
      return this.$store.getters.getDisplayFile
    },
    displaySheetIndex () {
      return this.$store.getters.displaySheetIndex
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
    _changeInputElement (e) {
      const f = e.target.files[0]
      /* ここはe.target.files
      if (Object.keys(e.target.files).length >= 2) {
        e.target.files[Symbol.iterator] = function* () {
          const properties = Object.keys(this)
          for (const i of properties) {
            yield [this[i]]
          }
        }
        for (const v of e.target.files) {
          this._addFileData(v)
        }
      } else {
        this._addFileData([...e.target.files])
      } */
      this._readFile(f).then((wb) => {
        this.$store.dispatch('runSetWb', wb)
        // 初期値は0で良い気がする
        const json = this._getSheetJson(wb, 0)
        const header = json.shift()
        const body = json
        // Object.values() はvalueの配列を返す
        const headers = Object.keys(header).map((key) => {
          return {
            headerKey: key,
            headerName: header.key,
            isShow: true,
            width: 200
          }
        })
        this.$store.dispatch('runSetTableHeaders', headers)
        this.$store.dispatch('runSetRowList', body)
      })
      this._addFileData([...e.target.files])
      // 初期化処理
      e.target.value = ''
    },
    _uploadFile (e) {
      // const file = e.target.files[0]
      // this.$axios.$post('http:172.0.0.1:3000/api/post', { data: file }).then((res) => {
      //   console.log('success')
      //   console.log(res)
      // }).catch((error) => {
      //   console.log(error)
      // })
      console.log(this.$axios.post())
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
