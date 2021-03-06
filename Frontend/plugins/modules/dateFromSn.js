//  日数とミリ秒を変換する係数
const COEFFICIENT = 24 * 60 * 60 * 1000
//  「1900/1/0」～「1970/1/1」 (日数)
const DATES_OFFSET = 70 * 365 + 17 + 1 + 1
//  UTCとJSTの時差 (ミリ秒)
const MILLIS_DIFFERENCE = 9 * 60 * 60 * 1000

//  シリアル値→UNIX時間(ミリ秒)
function convertSn2Ut (serialNumber) {
  return (serialNumber - DATES_OFFSET) * COEFFICIENT - MILLIS_DIFFERENCE
}

// シリアル値→Date
function dateFromSn (serialNumber) {
  return new Date(convertSn2Ut(serialNumber))
}

export default dateFromSn
