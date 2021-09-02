import { TagData, PostBlogData } from 'typings/api';

export interface IApiService {
  index: () => Promise<any>
}

export interface ITagsService {
  index: () => Promise<any>
  create: (tagNames: TagData[]) => Promise<any>
}
export interface IArticlesService {
  index: () => Promise<any>
  create: (articleData: PostBlogData) => Promise<any>
}

export * from './detail'
