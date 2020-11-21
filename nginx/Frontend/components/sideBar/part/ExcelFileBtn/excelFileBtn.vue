<template>
  <section>
    <section class="fileBtnContainer" @click="isOpen=!isOpen">
      <fa :icon="faAngleRight" draggable="false" :class="{'u-rotate-90': isOpen}" class="openBtn u-font-size-s"/>
      <fa :icon="faFileExcel" draggable="false" class="u-font-size-ss" />
      <div class="fileNameContainer" :class="[{ darkMainFontColor:isDarkMode, normalMainFontColor:!isDarkMode }]">
        {{ _fileNameRemaker(workbook.name, 9, 5, 0) }}
      </div>
      <div class="deleateFileBtnContainer" @click="_delete(index)">
        <a :class="['deleateFileBtn','u-font-size-ss',{ darkMainFontColor:isDarkMode, normalMainFontColor:!isDarkMode }, 'a']">
          <fa :icon="faTrashAlt" draggable="false" />
        </a>
      </div>
    </section>
    <transition name="pulldown">
      <Pulldown
        :isOpen="isOpen"
        :bookIndex="bookIndex"
        :workbook="workbook"
      />
    </transition>
  </section>
</template>
<script>
//  ここで選択sheet選択し、以下変更
import { faAngleRight, faFileExcel, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Pulldown from './pulldown'
export default {
  props: {
    bookIndex: {
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
    Pulldown
  },
  methods: {
    _switchExpanded (e) {
      console.log('Open')
    },
    _delete (index) {
      this.$store.dispatch('RUN_DELETE_FILE_DATA', index)
    },
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
.openBtn {
  transition: transform 0.5s ease;
}

.pulldown-enter-active, .pulldown-leave-active {
  transition: opacity .5s;
}
.pulldown-enter, .pulldown-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity:0;
}
</style>
