import {URL, COMMON_PARAMS} from '@/api/config'
import jsonp from '@/common/js/jsonp'

export function getRadioStationList () {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.radio.getCategoryList'
  })
  return jsonp(URL, params)
}

export function getChannelSong (amount = 0, radioType) {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.radio.getChannelSong',
    pn: 0,
    rn: amount,
    channelname: radioType
  })
  return jsonp(URL, params)
}
