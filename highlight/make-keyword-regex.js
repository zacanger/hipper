const caseSensitive = (a) => new RegExp(`/\b(${a.join('|')})\b/g`)
const caseInsensitive = (a) => new RegExp(`/\b(${a.join('|')})\b/gi`)
module.exports = { caseSensitive, caseInsensitive }
