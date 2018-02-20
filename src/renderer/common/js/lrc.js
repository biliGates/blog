const reg = {
  // 匹配包含时间戳的一条歌词
  // 分组1可匹配多条时间戳
  // 分组2 匹配一条时间戳
  // 分组3匹配歌词
  lrcs: /((\[\d{2}:\d{2}.\d{2}\]){1,})([^\n]*)/,
  // 匹配歌曲信息
  // 分组1匹配tag
  // 分组2匹配信息
  info: /\[([a-zA-Z]{2}):(.*)\]/,
  // 匹配时间, 不带括号, 全局模式匹配多条
  timer: /\[(\d{2}:\d{2}.\d{2})\]/
}
// 返回整数时间数 单位 秒
const timer = (t) => {
  t = reg.timer.exec(t)[1].split(/\.|:/)
  return (t[0] * 60 + parseFloat(t[1]) + parseFloat(t[2] / 100)).toFixed(2)
}
// 时间戳排序
const sortTimer = (obj) => {
  return Object.keys(obj).sort((a, b) => {
    return parseInt(a) - parseInt(b)
  })
}
// 歌曲信息排序
const sortInfo = (obj) => {
  let arr = []
  'ti' in obj && obj['ti'] !== '0' && arr.push(`歌曲：${obj['ti']}`)
  'ar' in obj && obj['ar'] !== '0' && arr.push(`歌手：${obj['ar']}`)
  'al' in obj && obj['al'] !== '0' && arr.push(`专辑：${obj['al']}`)
  'by' in obj && obj['by'] !== '0' && arr.push(`歌词制作：${obj['by']}`)
  return arr
}

export default (lrc) => {
  let lrcs = {}
  let info = {}
  let aline = null
  let lrcArr = lrc.split(/\n/)

  for (let i = 0; i < lrcArr.length; i++) {
    aline = reg.lrcs.exec(lrcArr[i])
    // 当aline匹配到歌词时
    if (aline !== null) {
      // [00:00.30][00:00.40] 有可能匹配到有多个时间戳的歌词
      if (aline[1].length > 10) {
        // 全局模式，匹配多条时间戳返回数组
        let timerParrent = new RegExp(reg.timer, 'g')
        let fullLrc = aline[1].match(timerParrent)
        for (let i = 0; i < fullLrc.length; i++) {
          lrcs[timer(fullLrc[i])] = aline[3]
        }
      } else {
        lrcs[timer(aline[1])] = aline[3]
      }
      // 当aline匹配到歌曲信息时
    } else {
      aline = reg.info.exec(lrcArr[i])
      // 有可能匹配到[00: -00.**]，即歌词时间为负数，用处不大
      if (aline !== null) {
        info[aline[1]] = aline[2]
      }
    }
  }
  info = sortInfo(info)
  let keys = sortTimer(lrcs)
  return {
    lrcs,
    info,
    keys
  }
}
