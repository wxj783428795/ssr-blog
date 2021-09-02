/*
 * @Author: wxj
 * @Date: 2021-08-25 00:01:22
 * @LastEditTime: 2021-09-02 22:24:57
 * @LastEditors: wxj
 * @Description: 顶部导航
 * @FilePath: \ssr-blog\web\components\navBar\index.tsx
 */
import React from "react";
import { HomeSvg, TagSvg, FileSvg, MenuSvg } from "./svgs";
import styles from "./index.module.less";
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
        <div className="nav-bar h-14 px-6 md:px-9 w-full flex justify-between items-center bg-gray-500 fixed top-0 left-0 z-10">
            {/* <div className={styles["nav-bar"]}> */}
            <div className="blog-title font-bold text-lg text-white"> Josh's blog</div>
            {/* <div className={styles["blog-title"]}> Josh's blog</div> */}
            <ul className="nav-items hidden mb-0 md:flex">
                {/* <ul className={styles["nav-items"]}> */}
                {navItems.map((item, index) => (
                    <a className="mr-5" key={item.link} href={item.link}>
                        <li className="hover:text-blue-400 text-white after:h-2 after:bg-blue-300 transition-colors ease-in-out duration-500">
                            <div className="nav-item flex items-center">
                                {/* <div className={styles["nav-item"]}> */}
                                <div className="w-4 h-4 mr-1">{item.logo}</div>
                                {/* <img src={item.logo} className="w-4 h-4 mr-1"></img> */}
                                <span className="text-sm">{item.title}</span>
                            </div>
                        </li>
                    </a>
                ))}
            </ul>
            <div className='md:hidden w-5 h-5 cursor-pointer'>
                <MenuSvg />
            </div>
        </div>
    );
};

export default NavBar;
