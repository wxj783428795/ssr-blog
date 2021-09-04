// 用户自定义 store，用法查看文档 http://doc.ssr-fc.com/docs/features$communication#React%20%E5%9C%BA%E6%99%AF
import { state as paginationState, reducer as paginationReducer } from './pagination'
const state = {
  ...paginationState
}

function reducer() {
return paginationReducer
}

export {
  state,
  reducer
}
