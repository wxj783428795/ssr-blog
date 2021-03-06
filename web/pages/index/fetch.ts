import { RouteComponentProps } from 'react-router'
import { IEggContext } from '../../../typings/ctx'

export default async (ctx: RouteComponentProps & IEggContext) => {
  // 阅读文档获得更多信息 http://doc.ssr-fc.com/docs/features$fetch#%E5%88%A4%E6%96%AD%E5%BD%93%E5%89%8D%E7%8E%AF%E5%A2%83
  const { pageSize = 10, pageIndex = 1 } = { ...ctx.query }
  const data = __isBrowser__ ? await (await window.fetch(`/api/articles?pageSize=${pageSize}&pageIndex=${pageIndex}`)).json()
    : await ctx.apiArticlesService.index(pageSize, pageIndex)

  return {
    // 建议根据模块给数据加上 namespace防止数据覆盖
    articlesData: data
  }
}
