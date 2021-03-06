import { ArticleTags } from './../entity/t_article_tags';
import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { Articles } from '../entity/t_articles'
import { Repository } from 'typeorm';
import { PostBlogData } from 'typings/api';
import { v4 as uuidv4 } from 'uuid';

@Provide('ArticlesService')
export class ApiArticlesService {
  @InjectEntityModel(Articles)
  articleModel: Repository<Articles>

  @InjectEntityModel(ArticleTags)
  articleTagsModel: Repository<ArticleTags>


  async index(pageSize: number = 10, pageIndex: number = 1): Promise<any> {
    try {
      //这边用skip和take实现的分页，回导致文章的tag永远只返回一个，暂时没解决
      const articles = await this.articleModel.createQueryBuilder('a')
        .leftJoinAndSelect('a.tags', 'at')
        // .skip(pageSize * (pageIndex - 1))
        // .take(pageSize).printSql()
        .select(['a.id', 'a.title', 'a.cover', 'a.html', 'a.createtime', 'a.updatetime', 'at.tagid', 'at.name'])
       .getMany();
      return { data: articles.slice(pageSize * (pageIndex - 1), pageSize * pageIndex) }
    } catch (error) {
      return { data: error }
    }
  }

  async create(data: PostBlogData): Promise<any> {
    const newArticle = new Articles();
    const articleTags = []
    newArticle.id = uuidv4();
    newArticle.title = data.title;
    newArticle.cover = data.cover;
    newArticle.createtime = new Date().toLocaleString();
    newArticle.updatetime = null;
    newArticle.html = data.html;
    newArticle.markdown = data.md;

    //保存article和tag的关联关系
    data.tags.forEach(tag => {
      const newRel = new ArticleTags();
      newRel.id = uuidv4();
      newRel.articleid = newArticle.id;
      newRel.tagid = tag.id;
      articleTags.push(newRel)
    })
    newArticle.tagids = articleTags

    return await this.articleModel.save(newArticle).then(e => e).catch(e => Promise.reject(e))
  }

}