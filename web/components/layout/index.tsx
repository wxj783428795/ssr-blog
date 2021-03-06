import React from "react";
import { LayoutProps } from "ssr-types-react";
import App from "./App";

const Layout = (props: LayoutProps) => {
    // 注：Layout 只会在服务端被渲染，不要在此运行客户端有关逻辑
    const { injectState } = props;
    const { injectCss, injectScript } = props.staticList!;

    return (
        <html lang="en" style={{ overflowX: "hidden" }}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="theme-color" content="#000000" />
                <title>Josh's Blog</title>
                <link rel="stylesheet" href="/static/css/tailwind.min.css"></link>
                <link rel="stylesheet" href="/static/css/toastui-editor.css"></link>
                {/* <link rel="stylesheet" href="/static/css/antd.css"></link> */}
                <link rel="stylesheet" href="/static/css/custom.css"></link>
                {/* <script dangerouslySetInnerHTML={{ __html: "var w = document.documentElement.clientWidth / 3.75;document.getElementsByTagName('html')[0].style['font-size'] = w + 'px'" }} /> */}
                {injectCss}
            </head>
            <body>
                <div id="app">
                    <App children={props.children} />
                </div>
                {injectState}
                {injectScript}
            </body>
        </html>
    );
};

export default Layout;
