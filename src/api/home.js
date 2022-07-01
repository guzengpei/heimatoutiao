import request from '@/utils/request'

// 我的频道
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}

// 获取文章列表

// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: {
      channel_id, timestamp
    }
  })
}

// 获取所有频道列表
export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}

// 频道数据持久化
export const saveChannels = (channels) => {
  return request({
    method: 'PUT',
    url: 'user/channels',
    data: {
      channels
    }
  })
}
