import XLSX from 'xlsx'

const _readFile = async (file) => {
  let workbook
  await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      resolve(XLSX.read(data, { type: 'array' }))
      /* DO SOMETHING WITH workbook HERE */
    }
    reader.readAsArrayBuffer(file)
  }).then((result) => {
    workbook = result
  })
  return workbook
}
const _getSheetList = (workbook) => {
  const sheets = workbook.Workbook.Sheets
  return sheets
}

const _getSheet = (workbook, name) => {
  const sheet = workbook.Sheets[name]
  return sheet
}

const _getSheetJson = (workbook, index) => {
  const worksheet = workbook.Sheets[workbook.SheetNames[index]]
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 'A' })
  return data
}

const _getSheetHtml = (workbook, index) => {
  const worksheet = workbook.Sheets[workbook.SheetNames[index]]
  const data = XLSX.utils.sheet_to_html(worksheet, { id: 'table' })
  return data
}

const _getColumnData = (workbook) => {
  const sheetNameList = workbook.SheetNames
  // シート1をデータを取得します
  const Sheet1 = workbook.Sheets[sheetNameList[0]]
  // エクセルデータの末端の行数を取得する
  const endCol = Sheet1['!ref'].match(/\[A-Z+]([0-9]+)/)[1]
  // 取得したいセルの範囲を指定し直す。下記の例ではA6からK列の末端行まで
  Sheet1['!ref'] = `A6:K6${endCol}`
  // JSONオブジェクトとして取得
  const Sheet1Json = XLSX.utils.sheet_to_json(Sheet1)
  let ct = 0
  for (const cl of Sheet1Json) {
    // 指定したセル範囲の中でも2行目から6行目だけを取得する処理
    if (ct >= 1 && ct < 5) {
      console.log(cl)
    }
    if (cl['A1の内容'] === '') { break }
    ct++
  }
}

export default { _readFile, _getSheetList, _getSheet, _getSheetJson, _getSheetHtml, _getColumnData }
