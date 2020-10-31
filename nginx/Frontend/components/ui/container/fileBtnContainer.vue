<template>
  <section>
    <section class="fileBtnContainer">
      <OpenSheetBtn
        :trueImage="isDarkMode ? `/images/filePulldownIcon/${ 'darkSheetBtnIcon.png'}`:`/images/filePulldownIcon/${'normalSheetBtnIcon.png'}`"
        :falseImage="isDarkMode ? `/images/filePulldownIcon/${ 'darkSheetOpenBtnIcon.png'}`:`/images/filePulldownIcon/${'normalSheetOpenBtnIcon.png'}`"
        :index="index"
        @_switchExpanded="_switchExpanded"
        @_switchSheetList="_switchSheetList"
        :value="isOpen"
      />
      <object
        id="excel-svg"
        type="image/svg+xml"
        :data="`/images/excelIcon/${ isDarkMode ? 'darkXlsx.svg':'normalXlsx.svg' }`"
        class="excelImage"
      />
      <div class="fileNameContainer" :class="[{ darkMainFontColor:isDarkMode, normalMainFontColor:!isDarkMode }]">
        {{ _fileNameRemaker(file[0].name, 9, 5, 0) }}
      </div>
      <div class="deleateFileBtnContainer" @click="_deleateExcelFileData(index)">
        <a :class="['deleateFileBtn','u-font-size-m',{ darkMainFontColor:isDarkMode, normalMainFontColor:!isDarkMode }, 'a']">
          &#215;
        </a>
      </div>
    </section>
    <!--こっから下改修ずみ-->
    <!--
    <xlsx-read :file="file[0]">
      <template #default="{loading}">
        <span v-if="loading" class="loadingText">Loading...</span>
        <xlsx-sheets
          v-if="isOpen"
          :id="`fileBtnList${index}`"
          aria-hidden="true"
          class="sheet"
        >
          <template #default="{ sheets }">
            <ul class="ul sheet_list">
              <li
                v-for="(sheet, sheetIndex) in sheets"
                :key="sheetIndex"
                :value="sheet"
                :class="[
                  'sheet_list_files',
                  {
                    darkFileListBackGroundColor:isDarkMode,
                    normalFileListBackGroundColor:!isDarkMode
                  } ,
                  { 'is-active': (activeExcelIndex===index && activeSheetIndex===sheetIndex) ,
                    '': !(activeExcelIndex===index && activeSheetIndex===sheetIndex)
                  }
                ]"
                :aria-controls="`Excel${index}Sheet${sheetIndex}`"
                :aria-expanded="String(activeExcelIndex===index && activeSheetIndex===sheetIndex)"
                @click="_activate(index, sheetIndex)"
              >
                <a :id="`Excel${index}Sheet${sheetIndex}`" :aria-hidden="String(!(activeExcelIndex===index && activeSheetIndex===sheetIndex))">
                  {{ _fileNameRemaker(sheet, 9, 7, 0) }}
                </a>
              </li>
            </ul>
          </template>
        </xlsx-sheets>
      </template>
    </xlsx-read>
    -->
    <div
      v-if="isOpen"
      :id="`fileBtnList${index}`"
      aria-hidden="true"
      class="sheet"
    >
      <ul class="ul sheet_list">
        <li
          v-for="(sheet, sheetIndex) in sheets"
          :key="sheetIndex"
          :value="sheet.name"
          :class="[
            'sheet_list_files',
            {
              darkFileListBackGroundColor:isDarkMode,
              normalFileListBackGroundColor:!isDarkMode
            } ,
            { 'is-active': (activeExcelIndex===index && activeSheetIndex===sheetIndex) ,
              '': !(activeExcelIndex===index && activeSheetIndex===sheetIndex)
            }
          ]"
          :aria-controls="`Excel${index}Sheet${sheetIndex}`"
          :aria-expanded="String(activeExcelIndex===index && activeSheetIndex===sheetIndex)"
          @click="_activate(index, sheetIndex)"
        >
          <a :id="`Excel${index}Sheet${sheetIndex}`" :aria-hidden="String(!(activeExcelIndex===index && activeSheetIndex===sheetIndex))">
            {{ _fileNameRemaker(sheet.name, 9, 7, 0) }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import OpenSheetBtn from './../btn/openSheetBtn'
export default {
  props: {
    index: {
      type: Number,
      default () {
        return null
      }
    },
    file: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    if (this.index === 0) {
      this.$store.dispatch('runSetDisplayFile', this.file[0])
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    },
    activeExcelIndex () {
      return this.$store.getters.getDisplayExcel
    },
    activeSheetIndex () {
      return this.$store.getters.getDisplaySheet
    },
    fileList () {
      return this.$store.getters.getFileData
    },
    sheets () {
      return this._getSheetList(this.$store.getters.getWb)
    }
  },
  components: {
    OpenSheetBtn
  },
  methods: {
    _switchExpanded (e) {
      console.log('Open')
    },
    _deleateExcelFileData (index) {
      const data = this.fileList.filter(n => this.fileList.indexOf(n) !== index)
      this.$store.dispatch('runSetFileData', data)
    },
    _switchSheetList () {
      this.isOpen = !this.isOpen
    },
    _activate (index, sheetIndex) {
      this.$store.dispatch('runSetDisplayFile', this.fileList[index][0])
      this.$store.dispatch('runSetDisplayExcel', index)
      this.$store.dispatch('runSetDisplaySheet', sheetIndex)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../../assets/scss/variables';
.fileBtnContainer {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding:0 0 0 16px;
}
.excelImage {
  height: 24px;
  width: 24px;
}

.loadingText{
  padding-left: 16px;
}

.deleateFileBtnContainer {
  width: auto;
}
.deleateFileBtn {
  cursor: pointer;
}

.fileNameContainer {
  overflow: hidden;
  width: 45%;
}

.sheet {
  padding: 0 8px 0 8px;
  &_list {
    &_files{
      border-radius: 5px;
      padding: 8px 0 8px 16px;
      &:hover {
        text-decoration: underline;
      }
      &.darkFileListBackGroundColor {
        &.is-active{
          background-color: $dark-sub-color;
        }
      }
      &.normalFileListBackGroundColor {
        &.is-active{
          background-color: $normal-sub-color;
        }
      }
    }
  }
}
</style>
