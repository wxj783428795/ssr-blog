/*
 * @Author: wxj
 * @Date: 2021-09-01 17:31:12
 * @LastEditTime: 2021-09-02 00:14:59
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\src\entity\t_articles.ts
 */
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn  } from 'typeorm';

@EntityModel('articles')
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
    content: string;
    @Column()
    cover: string;
}