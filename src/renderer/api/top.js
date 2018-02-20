import {URL, COMMON_PARAMS} from './config'
import jsonp from '@/common/js/jsonp'

export function getTops (type, amount) {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.billboard.billList',
    type: type,
    offset: 0,
    size: amount
  })
  return jsonp(URL, params)
}

export const type = {
  '新歌榜': 1,
  '热歌榜': 2,
  'KTV热歌榜': 6,
  'billboard': 8,
  '摇滚榜': 11,
  '爵士榜': 12,
  'hito中文榜': 18,
  '欧美金曲榜': 21,
  '经典老歌': 22,
  '情歌对唱': 23,
  '影视金曲榜': 24,
  '网络歌曲榜': 25
}
