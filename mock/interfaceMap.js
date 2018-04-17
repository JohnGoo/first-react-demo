const tableList = require('./datas/tableList')

const prefix = '.json'

module.exports = {
  [`/list${prefix}`]: tableList,
}
