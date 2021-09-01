/*
 * @Author: wxj
 * @Date: 2021-09-01 17:28:47
 * @LastEditTime: 2021-09-02 00:27:56
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\src\configuration.ts
 */
// configuration.ts
import { Configuration } from '@midwayjs/decorator';
import * as orm from '@midwayjs/orm';
import { join } from 'path';

@Configuration({
    imports: [
        orm  														// 加载 orm 组件
    ],
    importConfigs: [
        join(__dirname, './config')			// 加载配置文件（eggjs 下不需要）
    ]
})
export class ContainerConfiguratin {

}