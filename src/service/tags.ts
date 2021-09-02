import { Provide } from '@midwayjs/decorator'
// import mock from '../mock/tags'
import { InjectEntityModel } from '@midwayjs/orm';
import { Tags } from '../entity/t_tags'
import { Repository } from 'typeorm';
import { TagData } from 'typings/api';
// @Provide('TagsService')
// export class ApiTagsService {
//   async index (): Promise<any> {
//     return await Promise.resolve(mock)
//   }
// }

@Provide('TagsService')
export class ApiTagsService {
  @InjectEntityModel(Tags)
  tagModel: Repository<Tags>

  async index(): Promise<any> {
    const tags = await this.tagModel.find()
    return { data: tags }
  }

  /**
   * 插入新标签
   */
  async create(tags: TagData[]): Promise<any> {
    return await this.tagModel.save(tags.map(tag => {
      const newTag = new Tags();
      newTag.id = tag.id;
      newTag.name = tag.name;
      newTag.createtime = new Date().toLocaleString();
      newTag.updatetime = null;
      return newTag
    })).then(tags => tags).catch(error => Promise.reject(error))
  }
}