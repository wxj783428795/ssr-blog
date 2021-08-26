import React from "react";
import { FC } from "react";
import "tailwindcss/dist/tailwind.min.css";
import NavBar from "../navBar";

/*
 * @Author: wxj
 * @Date: 2021-08-24 23:56:05
 * @LastEditTime: 2021-08-25 00:02:25
 * @LastEditors: wxj
 * @Description: 总体布局组件
 * @FilePath: \ssr-blog\web\components\defaultLayout\index.tsx
 */
const DefaultLayout: FC = (params) => {
    return (
        <div className=" h-screen w-screen">
            <NavBar />
            {params.children}
        </div>
    );
};

export default DefaultLayout;
