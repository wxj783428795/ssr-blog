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

  async index(): Promise<any> {
    const articles = await this.articleModel.find()
    return { data: articles }
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