import DefaultLayout from "@/components/defaultLayout";
import React, { useEffect } from "react";
import { SProps } from "ssr-types-react";
import styles from "./index.module.less";
import Typed from "typed.js";

export default function Index(props: SProps) {
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
                    <div className="rounded-lg shadow-lg lg:w-8/12 h-72 w-full hover:shadow-xl transition-all duration-500">
                        <div className="h-full w-5/12 overflow-hidden rounded-l-lg">
                            <img
                                className=" transform hover:scale-110 w-full h-full object-cover transition-all duration-500"
                                src="/static/images/ts.png"
                            />
                        </div>
                        <div className="h-full w-7/12"></div>
                    </div>
                </div>
                <div className="content-right"></div>
            </div>
        </DefaultLayout>
    );
}
