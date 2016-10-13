// if it's not html5, it's not in here
const
  styles    = require('../lib/styles')
, keyword   = /<\/?\b(doctype|a|abbr|acronym|address|area|article|aside|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr)\b ?\/?>/gi
, number    = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string    = /('[^']*')|("[^"]*")/g
, tag       = /(<([^>]+)>)/ig

exports.highlight = q => {
  q.wrap(tag     , styles.green)
  q.wrap(number  , styles.magenta)
  q.wrap(string  , styles.red)
  q.wrap(keyword , styles.yellow)
}

exports.test = file => /\.html$/.test(file)
