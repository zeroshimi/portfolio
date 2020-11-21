<template>
  <div
    v-if="isOpen"
    :id="`fileBtnList${bookIndex}`"
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
        { 'is-active': (activeExcelIndex===bookIndex && activeSheetIndex===sheetIndex) ,
          '': !(activeExcelIndex===bookIndex && activeSheetIndex===sheetIndex)
        }
      ]"
      :aria-controls="`Excel${bookIndex}Sheet${sheetIndex}`"
      :aria-expanded="String(activeExcelIndex===bookIndex && activeSheetIndex===sheetIndex)"
      @click="_activate(bookIndex, sheetIndex)"
    >
      <a :id="`Excel${bookIndex}Sheet${sheetIndex}`" :aria-hidden="String(!(activeExcelIndex===bookIndex && activeSheetIndex===sheetIndex))">
        {{ _fileNameRemaker(sheet.name, 9, 7, 0) }}
      </a>
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    bookIndex: {
      type: Boolean,
      required: false,
      default () {
        return false
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
    sheets () {
      return this._getSheetList(this.$store.getters.getWb)
    }
  },
  methods: {
    _switchSheetList () {
      this.isOpen = !this.isOpen
    },
    _activate (bookIndex, sheetIndex) {
      this.$store.dispatch('runSetDisplayExcel', bookIndex)
      this.$store.dispatch('runSetDisplaySheet', sheetIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../../assets/scss/variables';
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
