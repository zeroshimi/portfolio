import XLSX from 'xlsx'

const _readFile = async (req) => {
  console.log(req.body)
  let workbook
  // await new Promise((resolve, reject) => {
  //   const reader = new FileReader()
  //   reader.onload = (e) => {
  //     const data = new Uint8Array(e.target.result)
  //     resolve(XLSX.read(data, { type: 'array' }))
  //     /* DO SOMETHING WITH workbook HERE */
  //   }
  //   reader.readAsArrayBuffer(data)
  // }).then((result) => {
  //   workbook = result
  // })
  // workbook = XLSX.readFile(data.name)
  // return workbook
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

export default { _readFile, _getSheetList, _getSheet, _getSheetJson, _getSheetHtml }
  