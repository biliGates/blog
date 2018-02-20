import {toTwo} from './utils'

// 获取当前时间
function getTime () {
  let date = new Date()
  return date.getTime()
}

// 获取今天0点的时间
function getTodayTime () {
  let date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

// 获取标准年月日时间
function getLastDate (time) {
  let date = new Date(time)
  let month = toTwo(date.getMonth() + 1)
  let day = toTwo(date.getDate())
  let year = date.getFullYear()
  return `${year}-${month}-${day}`
}

// 转换时间
export default function getFormatTime (timestamp) {
  let now = getTime()
  let today = getTodayTime()
  let timer = (now - timestamp) / 1000
  let tip = ''
  if (timer <= 0) {
    tip = '刚刚'
  } else if (Math.floor(timer / 60) <= 0) {
    tip = '刚刚'
  } else if (timer < 3600) {
    tip = Math.floor(timer / 60) + '分钟前'
  } else if (timer >= 3600 && (timestamp - today >= 0)) {
    tip = Math.floor(timer / 3600) + '小时前'
  } else if (timer / 86400 <= 31) {
    tip = Math.ceil(timer / 86400) + '天前'
  } else {
    tip = getLastDate(timestamp)
  }
  return tip
}
