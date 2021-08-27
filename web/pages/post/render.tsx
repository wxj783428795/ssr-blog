// import { Editor as IEditor } from "@toast-ui/react-editor";
import { EditorOptions } from "@toast-ui/editor";
import React, { useEffect, useState } from "react";
import { SProps } from "ssr-types-react";

let Editor = {
    Editor: class Editor {
        constructor(option: EditorOptions) {}
    },
};

const Post = (props: SProps) => {
    const [editorReady, seteditorReady] = useState(false);
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
                height: "500px",
                initialEditType: "markdown",
                previewStyle: "vertical",
            });
        }
    }, [editorReady]);
    return <div id="editor"></div>;
};
// let Editor = 123 as any;
// const Post = () => {
//     const editorRef = useRef<IEditor>(null);
//     const [editorReady, seteditorReady] = useState(false);
//     const initEditor = async () => {
//         Editor = (await import("@toast-ui/react-editor")).Editor as any;
//     };
//     useEffect(() => {
//         initEditor();
//         seteditorReady(true);
//     }, []);

//     const handleClick = () => {
//         console.log(111);
//     };

//     return (
//         <div id="editor">
//             {editorReady ? (
//                 <>
//                     <Editor
//                         previewStyle="vertical"
//                         height="400px"
//                         initialEditType="markdown"
//                         initialValue="hello"
//                         ref={editorRef}
//                     />
//                     <button onClick={handleClick}>make bold</button>
//                 </>
//             ) : null}
//         </div>
//     );
// };

export default Post;
