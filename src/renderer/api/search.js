import {URL, COMMON_PARAMS} from './config'
import jsonp from '@/common/js/jsonp'

export function searchSuggest (word) {
  let params = Object.assign({}, COMMON_PARAMS, {
    query: word,
    method: 'baidu.ting.search.suggestion'
  })
  return jsonp(URL, params)
}

export function search (word, page = 1, pageSize = 30) {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.search.common',
    query: word,
    page_no: page,
    page_size: pageSize
  })
  return jsonp(URL, params)
}
