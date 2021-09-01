import { Provide } from '@midwayjs/decorator'
// import mock from '../mock/tags'
import { InjectEntityModel } from '@midwayjs/orm';
import { Tags } from '../entity/t_tags'
import { Repository } from 'typeorm';
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
    // return await Promise.resolve(mock)
    const tags = await this.tagModel.find()
    return { data: tags }
  }
}