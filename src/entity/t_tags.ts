/*
 * @Author: wxj
 * @Date: 2021-09-02 00:20:12
 * @LastEditTime: 2021-09-04 00:30:15
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\src\entity\t_tags.ts
 */
import { EntityModel } from '@midwayjs/orm';
import { Column, OneToOne, PrimaryColumn } from 'typeorm';
import { ArticleTags } from './t_article_tags';

@EntityModel('t_tags')
export class Tags {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    createtime: string;
    @Column()
    updatetime: string;
    @OneToOne(type => ArticleTags, a => a.tag)
    articleTag: ArticleTags
}