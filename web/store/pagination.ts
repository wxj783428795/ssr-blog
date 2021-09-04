/*
 * @Author: wxj
 * @Date: 2021-09-05 00:58:44
 * @LastEditTime: 2021-09-05 01:00:41
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\web\store\pagination.ts
 */
const state = {
    paginationState: {
        pageSize: 10,
        pageIndex: 1
    }
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'updatePaginationState':
            return { ...state, ...action.payload }
    }
}

export { state, reducer }