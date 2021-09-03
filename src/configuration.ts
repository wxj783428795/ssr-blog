/*
 * @Author: wxj
 * @Date: 2021-09-01 17:28:47
 * @LastEditTime: 2021-09-03 14:31:29
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\src\configuration.ts
 */
// configuration.ts
import { Configuration, 
    // App 
} from '@midwayjs/decorator';
// import * as Upload from '@midwayjs/faas-middleware-upload';
import * as orm from '@midwayjs/orm';
import { join } from 'path';

@Configuration({
    imports: [
        orm, // 加载 orm 组件
        // Upload														
    ],
    importConfigs: [
        join(__dirname, './config')			// 加载配置文件（eggjs 下不需要）
    ]
})
export class ContainerConfiguratin {
    // @App()
    // app;

    // async onReady() {
    //     const uploadMW = await this.app.generateMiddleware(Upload.Upload);
    //     this.app.use(uploadMW);

    // }
}