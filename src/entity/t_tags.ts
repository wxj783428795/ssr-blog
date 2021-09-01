/*
 * @Author: wxj
 * @Date: 2021-09-02 00:20:12
 * @LastEditTime: 2021-09-02 00:37:26
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\src\entity\t_tags.ts
 */
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn  } from 'typeorm';

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
}