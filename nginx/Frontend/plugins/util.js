import Vue from 'vue'
import { XlsxRead, XlsxSheets, XlsxWorkbook, XlsxDownload, XlsxTable, XlsxJson } from 'vue-xlsx/dist/vue-xlsx.es.js'
import VueDragscroll from 'vue-dragscroll'
import _fileNameRemaker from './modules/_stringReMaker'
import _range from './modules/_range'
import _dateFromSn from './modules/dateFromSn'
import _dateToSn from './modules/dateToSn'
import _localStrage from './modules/_localStrage'
import xlsx from './modules/_xlsx'

const _readFile = xlsx._readFile
const _getSheetList = xlsx._getSheetList
const _getSheet = xlsx._getSheet
const _getSheetJson = xlsx._getSheetJson
const _getSheetHtml = xlsx._getSheetHtml

Vue.mixin({
  methods: {
    _fileNameRemaker,
    _range,
    _dateFromSn,
    _dateToSn,
    _readFile,
    _getSheetList,
    _getSheet,
    _getSheetJson,
    _getSheetHtml
  },
  components: {
    XlsxRead,
    XlsxSheets,
    XlsxWorkbook,
    XlsxDownload,
    XlsxTable,
    XlsxJson
  }
})

Vue.use(VueDragscroll)

export default _localStrage
