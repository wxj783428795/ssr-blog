import DefaultLayout from "@/components/defaultLayout";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { IContext, SProps } from "ssr-types-react";
import styles from "./index.module.less";
import Typed from "typed.js";
import { ArticleData, ArticlesData, PaginationState } from "@/interface";
import { TagSvg, TimeSvg } from "@/components/svgs";

export default function Index(props: SProps) {
    const { state, dispatch } = useContext<IContext<ArticlesData & PaginationState>>(
        window.STORE_CONTEXT
    );

    // useEffect(() => {
    //     if (state?.paginationState) {
    //         dispatch?({
    //             type: "updateContext",
    //             payload: {
    //                 search: {
    //                     text: e.target.value,
    //                 },
    //             },
    //         });
    //     }
    // }, [state?.paginationState.pageIndex, state?.paginationState.pageSize]);
    console.log(`state`, state);
    useEffect(() => {
        var typed = new Typed("#typed", {
            strings: "今日事&#44;今日毕,Never put off till tomorrow what you can do today".split(
                ","
            ),
            startDelay: 300,
            typeSpeed: 150,
            loop: true,
            backSpeed: 50,
        });
    }, []);
    return (
        <DefaultLayout>
            {/* <div className="banner w-screen h-screen bg-index-bg"></div> */}
            <div className={styles["banner"]}>
                <div className="absolute top-2/4 w-full -mt-12 left-0">
                    <p className="title text-white text-2xl md:text-4xl text-center font-bold md:mb-5 mb-0">
                        Josh's blog
                    </p>
                    <div className="subtitle flex text-white text-base md:text-2xl justify-center items-center">
                        <div id="typed"></div>
                    </div>
                </div>
            </div>
            <div className="h-screen w-full flex justify-center py-5 md:py-10">
                <div className="content-left max-w-7xl w-full px-5">
                    {state?.articlesData?.data.map((item, index) => (
                        <ArticleCard key={item.id} index={index} item={item} />
                    ))}
                </div>
                <div className="content-right"></div>
            </div>
        </DefaultLayout>
    );
}

const ArticleCard: FC<{ item: ArticleData; index: number }> = (props) => {
    const { item, index } = { ...props };
    const ref = useRef<HTMLDivElement>(null);
    const [brief, setbrief] = useState("");
    useEffect(() => {
        if (ref.current) {
            setbrief(`${ref.current.innerText.substr(0, 300)}...`);
        }
    }, []);
    return (
        <div
            key={item.id}
            className={`border rounded-lg shadow-lg lg:w-8/12 h-72 w-full hover:shadow-xl transition-all duration-500 flex items-center
${index & 1 ? "flex-row-reverse" : ""} ${index ? `mt-5` : ""}`}
        >
            <div
                className={`h-full w-5/12 overflow-hidden ${
                    index & 1 ? "rounded-r-lg" : "rounded-l-lg"
                }`}
            >
                <a href={`/article/${item.id}`}>
                    <img
                        className="transform hover:scale-110 w-full h-full object-cover transition-all duration-500"
                        src={item.cover}
                    />
                </a>
            </div>
            <div className=" w-7/12 px-8 py-4 overflow-hidden justify-center">
                <a className="text-black text-2xl" href={`/article/${item.id}`}>
                    {item.title}
                </a>
                <div className=" text-gray-500 flex items-center mt-2">
                    <div className="h-4 w-4 mr-1">
                        <TimeSvg />
                    </div>
                    {`发布于：${item.createtime.split(" ")[0]}`}
                    <span className="ml-3">|</span>
                    <div className="h-4 w-4 mr-1 ml-3">
                        <TagSvg />
                    </div>
                    {item.tags.map((tag, index) => (
                        <>
                            {index ? <span className="mx-1">·</span> : null}
                            <a
                                className=" text-gray-500"
                                href={`/tags/${tag.tagid}`}
                                key={tag.tagid}
                            >
                                {tag.name}
                            </a>
                        </>
                    ))}
                </div>
                <div
                    className="overflow-hidden mt-3"
                    dangerouslySetInnerHTML={{ __html: brief }}
                ></div>
                <div
                    ref={ref}
                    className="hidden"
                    dangerouslySetInnerHTML={{ __html: item.html }}
                ></div>
            </div>
        </div>
    );
};
