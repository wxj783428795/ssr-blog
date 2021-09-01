/*
 * @Author: wxj
 * @Date: 2021-09-01 15:08:35
 * @LastEditTime: 2021-09-01 15:08:36
 * @LastEditors: wxj
 * @Description: 
 * @FilePath: \ssr-blog\web\utils\utils.ts
 */
export const getCookie = __isBrowser__
    ? (key: string) => {
        var name = key + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
    : (key: string) => ``;