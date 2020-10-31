const getters = {
  getFileData: (state) => {
    return state.fileData
  },
  getIsUpload (state) {
    return state.isUpload
  },
  getDisplaySheet (state) {
    return state.displaySheetIndex
  },
  getDisplayExcel (state) {
    return state.displayExcelIndex
  },
  getDisplayFile (state) {
    return state.displayFile
  },
  getWb (state) {
    return state.wb
  },
  getRowList (state) {
    return state.rowList
  },
  getTableHeaders (state) {
    return state.tableHeaders
  }
}

export default getters
