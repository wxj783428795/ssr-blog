/*
 * @Author: wxj
 * @Date: 2021-08-28 00:58:32
 * @LastEditTime: 2021-08-30 18:03:29
 * @LastEditors: wxj
 * @Description:
 * @FilePath: \ssr-blog\web\components\articleForm\index.tsx
 */
import { TagsData } from "@/interface/tags-index";
import React, { FC, useRef } from "react";
import { useState } from "react";

const Index: FC<{ tags: TagsData | undefined }> = (props) => {
    const { tags } = { ...props };
    const imageInputRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [imageUploaded, setimageUploaded] = useState(false);
    const [showDeleteImage, setshowDeleteImage] = useState(false);
    const [showTagsModal, setshowTagsModal] = useState(false);
    const [selectedTags, setselectedTags] = useState<string[]>([]);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        let url;
        if (files) {
            url = window.webkitURL.createObjectURL(files[0]);
            if (imgRef.current && imageInputRef.current) {
                imageInputRef.current.value = "";
                imgRef.current.src = url;
                setimageUploaded(true);
            }
        } else {
            url = "";
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`e`, e);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-6">
                <label className=" text-base font-bold">标题：</label>
                <input name="title" className="outline-none border w-8/12 h-8 pl-4 text-sm"></input>
            </div>
            <div className="mb-6 items-center flex">
                <div className="text-base font-bold">封面：</div>
                <div
                    onClick={(e) => imageInputRef.current?.click()}
                    className="relative bg-cover text-gray-400 font-bold text-3xl w-40 h-24 border border-dashed border-gray-300 hover:bg-gray-100 rounded-lg flex justify-center items-center cursor-pointer"
                >
                    <img
                        onMouseOver={(e) => setshowDeleteImage(true)}
                        onMouseOut={(e) => setshowDeleteImage(false)}
                        className="h-full w-full"
                        style={{ display: imageUploaded ? "unset" : "none" }}
                        ref={imgRef}
                    ></img>
                    <span style={{ display: !imageUploaded ? "unset" : "none" }}>+</span>
                    <span
                        onMouseOver={(e) => setshowDeleteImage(true)}
                        className="absolute -top-2.5 -right-2.5 w-5 h-5 text-sm text-center rounded-full bg-gray-400 text-white cursor-pointer"
                        style={{ display: imageUploaded && showDeleteImage ? "unset" : "none" }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (imgRef.current) {
                                imgRef.current.src = "";
                            }
                            setimageUploaded(false);
                        }}
                    >
                        X
                    </span>
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
            <div className="mb-6 flex items-center relative">
                <label className=" text-base font-bold">标签：</label>
                {tags?.tagsData?.data
                    .filter((item) => selectedTags.includes(item.id))
                    .map((item) => (
                        <div className="w-max h-8 mx-1 p-1 border cursor-pointer border-blue-100 bg-blue-50 text-blue-500 relative flex justify-center items-center">
                            {item.name}
                            <div
                                className="ml-2 top-auto right-auto w-5 h-5 text-sm text-center rounded-full hover:bg-gray-400 text-blue-500 hover:text-white cursor-pointer"
                                onClick={(e) =>
                                    setselectedTags([
                                        ...selectedTags.filter((tagid) => tagid !== item.id),
                                    ])
                                }
                            >
                                X
                            </div>
                        </div>
                    ))}
                <div
                    className="outline-none border w-max h-8 px-4 text-sm flex items-center hover:bg-blue-100 hover:text-blue-500 cursor-pointer"
                    onClick={(e) => setshowTagsModal(true)}
                >
                    + 添加文章标签
                </div>
                <div
                    className="absolute w-full h-80 border shadow -bottom-80"
                    style={{ display: showTagsModal ? "block" : "none" }}
                >
                    <title className="h-8 w-full border-b flex justify-center items-center relative ">
                        <span>标签</span>
                        <span
                            className="absolute right-2 cursor-pointer"
                            onClick={(e) => setshowTagsModal(false)}
                        >
                            X
                        </span>
                    </title>
                    <div className="p-4">
                        <input
                            className="w-full border px-4 mb-4 h-8 outline-none"
                            placeholder="输入标签名称 + Enter创建新标签"
                        />
                        {tags?.tagsData?.data.map((item) => (
                            <div
                                key={item.id}
                                className={`w-max h-max inline-block mx-1 p-1 border cursor-pointer ${
                                    selectedTags.includes(item.id)
                                        ? `bg-blue-500 text-white`
                                        : `bg-gray-200 text-blue-500`
                                }`}
                                onClick={(e) => {
                                    selectedTags.includes(item.id)
                                        ? setselectedTags([
                                              ...selectedTags.filter((tagid) => tagid !== item.id),
                                          ])
                                        : setselectedTags([...selectedTags, item.id]);
                                }}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="w-24 h-12 border p-3  rounded-2xl bg-yellow-300 text-white font-bold">
                    发布
                </button>
            </div>
        </form>
    );
};

export default Index;
