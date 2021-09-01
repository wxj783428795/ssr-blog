import { Provide } from '@midwayjs/decorator'
import mock from '../mock/tags'

@Provide('TagsService')
export class ApiTagsService {
  async index (): Promise<any> {
    return await Promise.resolve(mock)
  }
}
