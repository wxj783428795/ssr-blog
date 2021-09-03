/*
 * @Author: wxj
 * @Date: 2021-09-02 00:20:12
 * @LastEditTime: 2021-09-04 01:49:45
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\src\entity\v_article_tags.ts
 */
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Articles } from './t_articles'

@EntityModel('v_article_tags')
export class V_ArticleTags {
    @PrimaryColumn()
    id: string;
    @Column({ name: 'tagid' })
    tagid: string;
    @Column({ name: 'articleId' })
    articleid: string;
    @Column()
    name:string;
    @ManyToOne(type => Articles, article => article.tagids)
    article: Articles
}
