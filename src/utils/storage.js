export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}

export function setItem (key, val) {
  if (typeof val === 'object') {
    window.localStorage.setItem(key, JSON.stringify(val))
  } else {
    window.localStorage.setItem(key, val)
  }
}

// 根据key删除一个
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

// 清除所有本地存储
export function clearItem () {
  window.localStorage.clearItem()
}
