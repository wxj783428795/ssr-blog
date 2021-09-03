import { Inject, Controller, Provide, Get, Post, Body, ALL } from '@midwayjs/decorator'
import { Context } from 'egg'
import { PostBlogData, TagData } from 'typings/api'
import { IBody } from 'typings/ctx'
import { IApiService, IApiDetailService, ITagsService, IArticlesService } from '../interface'
import * as fs from 'fs';
import * as path from 'path';
import * as awaitStream from 'await-stream-ready';
import * as sendToWormHole from 'stream-wormhole';
import { v4 as uuidv4 } from 'uuid';

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
  @Get('/articles')
  async getArticles() {
    const data = await this.articlesService.index()
    return data
  }
  @Post('/postImage')
  async postImage() {
    //定义文件上传根路径
    const uploadPath = process.cwd() + '/build/upload'
    const parts = this.ctx.multipart();//从formData中获取数据
    let part = null;
    while ((part = await parts()) != null) {
      // const fileName = `${uuidv4()} ${part.filename}`;
      const fileName = part.filename.split('.').join(` ${uuidv4()}.`);
      const dirname = new Date().toLocaleDateString().split('/').join('');
      const mkdirResult = this.mkdirSync(path.join(uploadPath, dirname));
      if (!mkdirResult) {
        return { state: false, message: '创建文件夹错误', data: '' };
      }
      const target = path.join(uploadPath, dirname, fileName);
      const writeStream = fs.createWriteStream(target);//创建可写流
      try {
        await awaitStream.write(part.pipe(writeStream));//将图片写入可写流
        const p = uploadPath.split('/').reverse()[0];
        return { state: true, data: `/${p}/` + dirname + '/' + fileName, message: '上传成功' };
      } catch (err) {
        // 如果出错就关闭管道
        await sendToWormHole(part);
        return { state: false, message: '文件错误' };
      }
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

  mkdirSync(dirname: string): boolean {
    if (fs.existsSync(dirname)) {
      return true;
    }
    try {
      fs.mkdirSync(dirname);
      return true;
    } catch (err) {
      return false;
    }
  }
}
