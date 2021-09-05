/*
 * @Author: wxj
 * @Date: 2021-09-05 23:02:32
 * @LastEditTime: 2021-09-05 23:32:07
 * @LastEditors: wxj
 * @Description:
 * @FilePath: \ssr-blog\web\components\avatar\index.tsx
 */
import React from "react";
import { GithubSvg } from "../svgs";

const Index = () => {
    return (
        <div
            // key={item.id}
            className={` px-6 pt-5 pb-8 w-full border rounded-lg shadow-lg  hover:shadow-xl  flex items-center flex-col`}
        >
            <img className="w-28 h-28 rounded-full" src={`/static/images/avatar.jpg`} />
            <p className="text-2xl font-medium mt-2 mb-0">Josh</p>
            <div className="w-full flex mt-3 text-base ">
                <a className="w-1/2 flex flex-col items-center text-black">
                    <span>文章</span>
                    <span>9</span>
                </a>
                <a className="w-1/2 flex flex-col items-center text-black">
                    <span>标签</span>
                    <span>13</span>
                </a>
            </div>
            <a className="flex  justify-center items-center w-full text-center  bg-blue-400 hover:bg-red-400 text-white leading-loose hover:text-white mt-3 transition-all duration-500">
                <div className=" w-4 h-4 mr-2">
                    <GithubSvg />
                </div>
                Follow Me
            </a>
        </div>
    );
};

export default Index;
