export * from './page-index'
export * from './detail-index'
export interface ArticlesData {
    articlesData?: {
        data: { id: string; createtime: string; updatetime: string; title: string; html: string; cover: string; markdown: string; }[]
    }
}