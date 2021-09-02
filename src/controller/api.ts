import { Inject, Controller, Provide, Get, Post, Body, ALL } from '@midwayjs/decorator'
import { Context } from 'egg'
import { PostBlogData, TagData } from 'typings/api'
import { IBody } from 'typings/ctx'
import { IApiService, IApiDetailService, ITagsService, IArticlesService } from '../interface'

@Provide()
@Controller('/api')
export class Api {
  @Inject()
  ctx: Context

  @Inject('ApiService')
  service: IApiService

  @Inject('ApiDetailService')
  detailService: IApiDetailService

  @Inject('TagsService')
  tagsService: ITagsService

  @Inject('ArticlesService')
  articlesService: IArticlesService

  @Get('/index')
  async getIndexData() {
    const data = await this.service.index()
    return data
  }
  @Get('/tags')
  async getTagsData() {
    const data = await this.tagsService.index()
    return data
  }
  @Post('/postImage')
  async postImage() {
    return {
      "status": "done",
    }
  }

  @Get('/detail/:id')
  async getDetailData() {
    const { ctx, detailService } = this
    const id = ctx.params.id
    const data = await detailService.index(id)
    return data
  }
  @Post('/postblog')
  async postBlog(@Body(ALL) data: IBody<PostBlogData>) {
    return this.articlesService.create(data.data)
      .then(data => {
        return { state: true, message: '插入成功', data: data }
      }).catch(error => {
        return ({ state: false, message: '插入失败', data: error })
      })
  }
  @Post('/createTags')
  async createTag(@Body(ALL) data: IBody<TagData[]>) {
    return data.data.length ?
      this.tagsService.create(data.data).
        then(data => {
          return { state: true, message: '插入成功', data: data }
        })
        .catch(error => {
          return ({ state: false, message: '插入失败', data: error })
        })
      :
      { state: false, message: '未执行插入操作', data: data }
  }


}
