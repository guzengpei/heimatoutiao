import request from '@/utils/request'

// 搜索关键词
export const getSuggestList = q => {
  return request({
    url: '/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索结果列表
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: { page, per_page, q }
  })
}
