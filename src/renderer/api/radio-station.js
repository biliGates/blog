import {URL, COMMON_PARAMS} from '@/api/config'
import jsonp from '@/common/js/jsonp'

export const getRadioStationList = () => {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.radio.getCategoryList'
  })
  return jsonp(URL, params)
}

export const getChannelSong = (amount, radioType) => {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.radio.getChannelSong',
    pn: 0,
    rn: amount,
    channelname: radioType
  })
  return jsonp(URL, params)
}

//  * 电台列表
//   * method=baidu.ting.radio.getCategoryList
//     * -------------------------------------------
//  * 电台下的歌曲列表  返回数据是随机的
//   * method=baidu.ting.radio.getChannelSong
//     * pn=0
//       * rn=10   显示条目
//         * channelname=public_tuijian_ktv  获取的电台列表里返回的参数
