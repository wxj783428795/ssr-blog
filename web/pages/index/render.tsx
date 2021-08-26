import DefaultLayout from "@/components/defaultLayout";
import React, { useEffect } from "react";
import { SProps } from "ssr-types-react";
import styles from "./render.less";
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
                <div className="absolute top-2/4 w-full -mt-12">
                    <p className="title text-white text-4xl text-center font-bold">Josh's blog</p>
                    <div className="subtitle flex text-white text-2xl justify-center items-center mt-2">
                        <div id="typed"></div>
                    </div>
                </div>
            </div>
            <div className="h-screen w-screen"></div>
        </DefaultLayout>
    );
}
