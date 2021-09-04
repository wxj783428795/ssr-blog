export * from './page-index'
export * from './detail-index'
export interface ArticlesData {
    articlesData?: {
        data: ArticleData[]
    }
}
export interface PaginationState {
    paginationState: {
        pageSize: 10,
        pageIndex: 1
    }
}


export interface ArticleData {
    id: string; createtime: string; updatetime: string; title: string; html: string; cover: string; markdown: string;
    tags: { tagid: string; name: string; }[]
}