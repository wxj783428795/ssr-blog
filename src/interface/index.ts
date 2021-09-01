export interface IApiService {
  index: () => Promise<any>
}

export interface ITagsService {
  index: () => Promise<any>
}

export * from './detail'
