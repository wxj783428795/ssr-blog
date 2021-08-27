/*
 * @Author: wxj
 * @Date: 2021-08-28 00:58:32
 * @LastEditTime: 2021-08-28 01:12:36
 * @LastEditors: wxj
 * @Description:
 * @FilePath: \ssr-blog\web\components\articleForm\index.tsx
 */
import React, { useRef } from "react";

const Index = () => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const inputDivRef = useRef<HTMLDivElement>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`e`, e);
        const files = e.target.files;
        let url;
        if (files) {
            url = window.webkitURL.createObjectURL(files[0]);
            if (inputDivRef.current) {
                inputDivRef.current.style.backgroundImage = `url(${url})`;
            }
        } else {
            url = "";
        }
    };

    return (
        <form>
            <div className="mb-6">
                <label className=" text-base font-bold">标题：</label>
                <input name="title" className="outline-none border w-8/12 h-8 pl-4 text-sm"></input>
            </div>
            <div className="items-center flex">
                <div className="text-base font-bold">封面：</div>
                <div
                    ref={inputDivRef}
                    onClick={(e) => imageInputRef.current?.click()}
                    className="bg-cover text-gray-400 font-bold text-3xl  w-40 h-24 border border-dashed border-gray-300 hover:bg-gray-100 rounded-lg flex justify-center items-center cursor-pointer"
                >
                    +
                </div>
                <input
                    ref={imageInputRef}
                    type="file"
                    id="imageInput"
                    name="imageInput"
                    className=" opacity-0"
                    onChange={(e) => handleImageChange(e)}
                ></input>
            </div>
        </form>
    );
};

export default Index;
