/*
 * @Author: wxj
 * @Date: 2021-08-25 00:01:22
 * @LastEditTime: 2021-08-26 14:43:26
 * @LastEditors: wxj
 * @Description: 顶部导航
 * @FilePath: \ssr-blog\web\components\navBar\index.tsx
 */
import React from "react";
import { HomeSvg, TagSvg, FileSvg } from "./svgs";

const navItems: NavItem[] = [
    {
        title: "首页",
        link: "/",
        logo: <HomeSvg />,
    },
    {
        title: "标签",
        link: "/tags",
        logo: <TagSvg />,
    },
    {
        title: "归档",
        link: "/archives",
        logo: <FileSvg />,
    },
];

const NavBar = () => {
    return (
        <div className="h-14 px-9 w-full flex justify-between items-center bg-gray-500">
            <div className="blog-title font-bold text-lg text-white"> Josh's blog</div>
            <ul className="nav-items flex">
                {navItems.map((item, index) => (
                    <a className="mr-5" key={item.link} href={item.link}>
                        <li className="hover:text-blue-400 text-white after:h-2 after:bg-blue-300 transition-colors ease-in-out duration-500">
                            <div className="flex items-center">
                                <div className="w-4 h-4 mr-1">{item.logo}</div>
                                {/* <img src={item.logo} className="w-4 h-4 mr-1"></img> */}
                                <span className="text-sm">{item.title}</span>
                            </div>
                        </li>
                    </a>
                ))}
            </ul>
        </div>
    );
};

export default NavBar;
