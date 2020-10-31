const actions = {
  runSetFileData: ({ commit }, dataList) => {
    commit('setFileData', dataList)
  },
  runAddFileData: ({ commit }, dataList) => {
    commit('addFileData', dataList)
  },
  runSetIsUpload ({ commit }, boolean) {
    commit('isUpload', boolean)
  },
  runSetDisplayExcel ({ commit }, excelIndex) {
    commit('setDisplayExcel', excelIndex)
  },
  runSetDisplaySheet ({ commit }, sheetIndex) {
    commit('setDisplaySheet', sheetIndex)
  },
  runSetDisplayFile ({ commit }, fileData) {
    commit('setDisplayFile', fileData)
  },
  runSetWb ({ commit }, wbObject) {
    commit('setWb', wbObject)
  },
  runSetRowList ({ commit }, rowData) {
    commit('setRowList', rowData)
  },
  runSetTableHeaders ({ commit }, headers) {
    commit('setTableHeaders', headers)
  }
}

export default actions
