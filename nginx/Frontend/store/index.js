const state = () => ({
  isDarkMode: false,
  openMenuBtn: true,
  headerName: 'home',
  fileData: [],
  isUpload: false,
  displayFile: null,
  displayExcelIndex: 0,
  displaySheetIndex: 0,
  isSignUp: true,
  wb: [],
  rowList: [],
  tableHeaders: [],
  isModalOpen: true,
  // 初回ログイン時→DB上にデータがあればfalse
  isFirstLogin: true
})

const getters = {
  getIsDarkMode (state) {
    return state.isDarkMode
  },
  getOpenMenuBtn (state) {
    return state.openMenuBtn
  },
  getHeaderName (state) {
    return state.headerName
  },
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
  getIsSignUp (state) {
    return state.isSignUp
  },
  getWb (state) {
    return state.wb
  },
  getRowList (state) {
    return state.rowList
  },
  getTableHeaders (state) {
    return state.tableHeaders
  },
  GET_IS_MODAL_OPEN (state) {
    return state.isModalOpen
  },
  GET_IS_FIRST_LOGIN (state) {
    return state.isFirstLogin
  }
}

const mutations = {
  setIsDarkMode (state, boolean) {
    state.isDarkMode = boolean
  },
  setOpenMenuBtn (state) {
    state.openMenuBtn = !state.openMenuBtn
  },
  setHeaderName (state, name) {
    state.headerName = name
  },
  resetMenuBtn (state, boolean) {
    state.openMenuBtn = boolean
  },
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
  setIsSignUp (state, bool) {
    state.isSignUp = bool
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
  },
  RE_SET_IS_MODAL_OPEN (state, bool) {
    state.isModalOpen = bool
  },
  RE_SET_IS_FIRST_LOGIN (state, bool) {
    state.isFirstLogin = bool
  }
}

const actions = {
  runSetIsDarkMode ({ commit }, boolean) {
    commit('setIsDarkMode', boolean)
  },
  runSetOpenMenuBtn ({ commit }) {
    commit('setOpenMenuBtn')
  },
  runSetHeaderName ({ commit }, name) {
    commit('setHeaderName', name)
  },
  runResetMenuBtn ({ commit }, boolean) {
    commit('resetMenuBtn', boolean)
  },
  runSetFileData: ({ commit }, dataList) => {
    commit('setFileData', dataList)
  },
  runAddFileData: ({ commit }, dataList) => {
    commit('addFileData', dataList)
  },
  runSetIsUpload ({ commit }, boolean) {
    commit('setIsUpload', boolean)
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
  runSetIsSignUp ({ commit }, bool) {
    commit('setIsSignUp', bool)
  },
  runSetWb ({ commit }, wbObject) {
    commit('setWb', wbObject)
  },
  runSetRowList ({ commit }, rowData) {
    commit('setRowList', rowData)
  },
  runSetTableHeaders ({ commit }, headers) {
    commit('setTableHeaders', headers)
  },
  RUN_DELETE_FILE_DATA ({ commit }, index) {
    commit('DELETE_FILE_DATA', index)
  },
  RUN_RE_SET_IS_MODAL_OPEN ({ commit }, bool) {
    commit('RE_SET_IS_MODAL_OPEN', bool)
  },
  RUN_RE_SET_IS_FIRST_LOGIN ({ commit }, bool) {
    commit('RE_SET_IS_FIRST_LOGIN', bool)
  }
}

export default { state, getters, mutations, actions }
