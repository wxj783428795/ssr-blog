/*
 * @Author: wxj
 * @Date: 2021-09-01 17:31:12
 * @LastEditTime: 2021-09-04 01:50:57
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\src\entity\t_articles.ts
 */
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ArticleTags } from './t_article_tags'
import { V_ArticleTags } from './v_article_tags'

@EntityModel('t_articles')
export class Articles {
    @PrimaryColumn()
    id: string;
    @Column()
    title: string;
    @Column()
    createtime: string;
    @Column()
    updatetime: string;
    @Column()
    html: string;
    @Column()
    markdown: string;
    @Column()
    cover: string;
    @OneToMany(type => ArticleTags, articleTags => articleTags.article, {
        cascade: true
    })
    tagids: ArticleTags[]
    @OneToMany(type => V_ArticleTags, articleTags => articleTags.article, {
        cascade: true
    })
    tags: V_ArticleTags[]
}