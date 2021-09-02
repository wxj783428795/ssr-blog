import { IApiDetailService, IApiService, ITagsService } from "src/interface";
import { Context } from 'egg'

/*
 * @Author: wxj
 * @Date: 2021-08-30 10:03:22
 * @LastEditTime: 2021-09-02 11:07:23
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\typings\ctx.d.ts
 */

interface IEggContext extends Context {
    apiService: IApiService
    apiDeatilservice: IApiDetailService
    apiTagsService: ITagsService
}
interface IBody<T> {
    data: T
}