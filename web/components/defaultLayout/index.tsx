import React from "react";
import { FC } from "react";
// import "tailwindcss/dist/base.min.css";
// import "tailwindcss/dist/components.min.css";
// import "tailwindcss/dist/utilities.min.css";
// import "tailwindcss/dist/tailwind-experimental.min.css"
import NavBar from "../navBar";
import styles from "./index.module.less";

/*
 * @Author: wxj
 * @Date: 2021-08-24 23:56:05
 * @LastEditTime: 2021-09-02 17:19:14
 * @LastEditors: wxj
 * @Description: 总体布局组件
 * @FilePath: \ssr-blog\web\components\defaultLayout\index.tsx
 */
const DefaultLayout: FC = (params) => {
    return (
        <div className="defaultLayout h-screen w-full">
            {/* // <div className={styles["defaultLayout"]}> */}
            <NavBar />
            {params.children}
        </div>
    );
};

export default DefaultLayout;
