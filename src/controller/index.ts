import { Readable } from 'stream'
import { Controller, Get, Provide, Inject } from '@midwayjs/decorator'
import { render } from 'ssr-core-react'
import { IApiService, IApiDetailService, ITagsService, IArticlesService } from '../interface'
import { IEggContext } from 'typings/ctx'



@Provide()
@Controller('/')
export class Index {
  @Inject()
  ctx: IEggContext

  @Inject('ApiService')
  apiService: IApiService

  @Inject('ApiDetailService')
  apiDeatilservice: IApiDetailService

  @Inject('TagsService')
  tagsService: ITagsService

  @Inject('ArticlesService')
  articlesService: IArticlesService

  @Get('/')
  @Get('/detail/:id')
  async handler(): Promise<void> {
    try {
      this.ctx.apiService = this.apiService
      this.ctx.apiDeatilservice = this.apiDeatilservice
      this.ctx.apiArticlesService = this.articlesService
      const stream = await render<Readable>(this.ctx, {
        stream: true
      })
      this.ctx.body = stream
    } catch (error) {
      console.log(error)
      this.ctx.body = error
    }
  }
  @Get('/post')
  async postHandler(): Promise<void> {
    try {
      this.ctx.apiTagsService = this.tagsService
      const stream = await render<Readable>(this.ctx, {
        stream: true
      })
      this.ctx.body = stream
    } catch (error) {
      console.log(error)
      this.ctx.body = error
    }
  }
}
