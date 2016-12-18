// case sensitive
const cs = (a) => new RegExp(`\\b(${a.join('|')})\\b`, 'g')
// case insensitive
const ci = (a) => new RegExp(`\\b(${a.join('|')})\\b`, 'gi')
module.exports = { ci, cs }
