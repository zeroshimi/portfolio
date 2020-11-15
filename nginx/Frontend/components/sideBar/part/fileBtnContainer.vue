<template>
  <section>
    <section class="fileBtnContainer">
      <fa :icon="faAngleRight" draggable="false" @click="isOpen=!isOpen" :class="{'u-rotate-90': isOpen}" />
      <fa :icon="faFileExcel" draggable="false" />
      <div class="fileNameContainer" :class="[{ darkMainFontColor:isDarkMode, normalMainFontColor:!isDarkMode }]">
        {{ _fileNameRemaker(workbook.name, 9, 5, 0) }}
      </div>
      <div class="deleateFileBtnContainer" @click="_delete(index)">
        <a :class="['deleateFileBtn','u-font-size-s',{ darkMainFontColor:isDarkMode, normalMainFontColor:!isDarkMode }, 'a']">
          <fa :icon="faTrashAlt" draggable="false" />
        </a>
      </div>
    </section>
    <div
      v-if="isOpen"
      :id="`fileBtnList${index}`"
      aria-hidden="true"
      class="sheet"
    >
      <ul class="ul sheet_list">
        <li
          v-for="(sheet, sheetIndex) in _getSheetList(workbook.workbook)"
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
//  ここで選択sheet選択し、以下変更
import { faAngleRight, faFileExcel, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import OpenSheetBtn from './openSheetBtn'
export default {
  props: {
    index: {
      type: Number,
      default () {
        return null
      }
    },
    workbook: {
      type: Object,
      required: true,
      default () {
        return {}
      }
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
    },
    faAngleRight () {
      return faAngleRight
    },
    faFileExcel () {
      return faFileExcel
    },
    faTrashAlt () {
      return faTrashAlt
    }
  },
  components: {
    // OpenSheetBtn
  },
  methods: {
    _switchExpanded (e) {
      console.log('Open')
    },
    _deleateExcelFileData (index) {
      const data = this.fileList.filter(n => this.fileList.indexOf(n) !== index)
      this.$store.dispatch('runSetFileData', data)
    },
    _delete (index) {
      this.$store.dispatch('RUN_DELETE_FILE_DATA', index)
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
  padding:0 16px;
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
