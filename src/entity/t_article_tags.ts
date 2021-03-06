/*
 * @Author: wxj
 * @Date: 2021-09-02 00:20:12
 * @LastEditTime: 2021-09-04 01:20:12
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\src\entity\t_article_tags.ts
 */
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn, ManyToOne, OneToOne } from 'typeorm';
import { Articles } from './t_articles'
import { Tags } from './t_tags';

@EntityModel('t_article_tags')
export class ArticleTags {
    @PrimaryColumn()
    id: string;
    @Column({ name: 'tagid' })
    tagid: string;
    @Column({ name: 'articleId' })
    articleid: string;
    @ManyToOne(type => Articles, article => article.tagids)
    article: Articles
    @OneToOne(type => Tags, tags => tags.articleTag)
    tag: Tags
}
