import { Inject, Controller, Provide, Get, Post } from '@midwayjs/decorator'
import { Context } from 'egg'
import { IApiService, IApiDetailService, ITagsService } from '../interface'

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
}
