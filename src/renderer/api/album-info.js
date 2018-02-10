import {URL, COMMON_PARAMS} from './config'
import jsonp from '@/common/js/jsonp'

export default function (id) {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.album.getAlbumInfo',
    album_id: id
  })
  return jsonp(URL, params)
}
