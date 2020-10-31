const mutations = {
  setFileData: (state, dataList) => {
    state.fileData = dataList
  },
  addFileData: (state, dataList) => {
    state.fileData.push(dataList)
  },
  setIsUpload (state, boolean) {
    state.isUpload = boolean
  },
  setDisplayExcel (state, excelIndex) {
    state.displayExcelIndex = excelIndex
  },
  setDisplaySheet (state, sheetIndex) {
    state.displaySheetIndex = sheetIndex
  },
  setDisplayFile (state, fileData) {
    state.displayFile = fileData
  },
  setWb (state, wbData) {
    state.wb = wbData
  },
  setRowList (state, rowData) {
    state.rowList = rowData
  },
  setTableHeaders (state, headers) {
    state.tableHeaders = headers
  }
}

export default mutations
