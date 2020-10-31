//  日数とミリ秒を変換する係数
const COEFFICIENT = 24 * 60 * 60 * 1000
//  「1900/1/0」～「1970/1/1」 (日数)
const DATES_OFFSET = 70 * 365 + 17 + 1 + 1
//  UTCとJSTの時差 (ミリ秒)
const MILLIS_DIFFERENCE = 9 * 60 * 60 * 1000

//  UNIX時間(ミリ秒)→シリアル値
function convertUt2Sn (unixTimeMillis) {
  return (unixTimeMillis + MILLIS_DIFFERENCE) / COEFFICIENT + DATES_OFFSET
}

// Date→シリアル値
function dateToSn (date) {
  return convertUt2Sn(date.getTime())
}

export default dateToSn
