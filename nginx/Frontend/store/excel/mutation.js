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
    state.wb.push(wbData)
  },
  setRowList (state, rowData) {
    state.rowList = rowData
  },
  setTableHeaders (state, headers) {
    state.tableHeaders = headers
  },
  DELETE_FILE_DATA (state, index) {
    const newWb = JSON.parse(JSON.stringify(state.wb))
    newWb.splice(index, 1)
    state.wb = JSON.parse(JSON.stringify(newWb))
  }
}

export default mutations
