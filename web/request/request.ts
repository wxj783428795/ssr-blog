/*
 * @Author: wxj
 * @Date: 2021-09-02 09:11:03
 * @LastEditTime: 2021-09-03 11:29:21
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\web\request\request.ts
 */
import { PostBlogData, TagData } from '@/../typings/api';
import { getCookie } from '@/utils/utils';
import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'x-csrf-token': getCookie('csrfToken')
    }
})

export const postImage = (data: ArrayBuffer) => instance.post<ArrayBuffer>('/postImage', {
    data: data
})

export const postBlog = (data: PostBlogData) => instance.post<PostBlogData>('/postblog', {
    data: data
})

export const createTags = (data: TagData[]) => instance.post<TagData[]>('/createTags', { data: data })