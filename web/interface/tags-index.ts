/*
 * @Author: wxj
 * @Date: 2021-08-30 10:27:10
 * @LastEditTime: 2021-08-30 10:28:51
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\web\interface\tags-index.ts
 */
export interface TagsData {
    tagsData?: {
        data: { id: string; createtime: string; updatetime: string; name: string }[]
    }
}