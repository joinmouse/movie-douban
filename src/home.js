var tab = require('./component/tab.js')
var top250 = require('./component/top250.js')
var usBox = require('./component/usBox.js')
var search = require('./component/search.js')

tab.init($('footer>div'),$('.main>section'))
top250.init()
usBox.init()
search.init()
