import { Provide } from '@midwayjs/decorator'
// import mock from '../mock/tags'
import { InjectEntityModel } from '@midwayjs/orm';
import { ArticleTags } from '../entity/t_article_tags'
import { Repository } from 'typeorm';
import { TagData } from 'typings/api';
// @Provide('TagsService')
// export class ApiTagsService {
//   async index (): Promise<any> {
//     return await Promise.resolve(mock)
//   }
// }

@Provide('ArticleTagsService')
export class ApiArticleTagsService {
  @InjectEntityModel(ArticleTags)
  tagModel: Repository<ArticleTags>

  /**
   * 插入文章与标签关系
   */
  async create(tags: TagData[]): Promise<any> {
   
  }
}