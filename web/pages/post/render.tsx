import { TagsData } from "@/interface/tags-index";
import { EditorOptions } from "@toast-ui/editor";
import React, { useContext, useEffect, useState } from "react";
import { IContext, SProps } from "ssr-types-react";
import ArticleForm from "../../components/articleForm";
import 'antd/dist/antd.css';
let Editor = {
    Editor: class Editor {
        constructor(option: EditorOptions) {}
    },
};

const Post = (props: SProps) => {
    const { state, dispatch } = useContext<IContext<TagsData>>(window.STORE_CONTEXT);

    const [editorReady, seteditorReady] = useState(false);
    const [editorIns, seteditorIns] = useState<any>();
    const initEditor = async () => {
        Editor = (await import("@toast-ui/editor")) as any;
        seteditorReady(true);
    };
    useEffect(() => {
        initEditor();
    }, []);
    useEffect(() => {
        if (editorReady) {
            const editor = new Editor.Editor({
                el: document.querySelector("#editor") as HTMLElement,
                height: "100%",
                initialEditType: "markdown",
                previewHighlight: true,
                previewStyle: "vertical",
                language: "zh-cn",
            });
            seteditorIns(editor);
        }
    }, [editorReady]);

    // const handleClick = () => {
    //     const md_html = editorIns.getHTML();
    //     const md = editorIns.getMarkdown();
    //     console.log(`md_html`, md_html);
    //     // const data = matter(md_html);
    //     // console.log(`data`, data)
    // };
    return (
        <div className="flex p-8 h-screen bg-gray-100">
            <div className="w-2/6 h-full bg-white mr-8 border rounded p-8">
                <ArticleForm tags={state} editorIns={editorIns} />
            </div>
            <div id="editor" className="w-4/6 h-full bg-white"></div>
        </div>
    );
};

export default Post;
