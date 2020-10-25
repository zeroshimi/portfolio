// csvかexcelの判定いれる
const _fileNameRemaker = (text, sumNum, MainWordCount, expWordCount) => {
  const relacedText = String(text).replace(/.xlsx/g, '').replace(/.csv/g, '')
  if (relacedText.length < sumNum) { return relacedText }
  return (expWordCount === 0) ? relacedText.slice(0, MainWordCount) + '...' : relacedText.slice(0, MainWordCount) + '...' + relacedText.slice(-expWordCount)
}

export default _fileNameRemaker
