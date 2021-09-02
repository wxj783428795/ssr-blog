/*
 * @Author: wxj
 * @Date: 2021-09-02 09:51:50
 * @LastEditTime: 2021-09-02 10:27:33
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\typings\api.d.ts
 */
export type TagData = {
    id: string; name: string
}
export type PostBlogData = {
    md: string;
    html: string;
    title: string;
    cover: string;
    tags: TagData[];
    newTags: TagData[];
}