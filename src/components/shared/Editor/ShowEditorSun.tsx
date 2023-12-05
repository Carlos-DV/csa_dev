import dynamic from "next/dynamic";
import { FC, useRef, ReactElement, useState, useEffect } from "react";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
})


interface EditorProps {
    infoS3: string
}

const ShowEditorSun: FC<EditorProps> = ({ infoS3 }) => {
    const editorRef = useRef<any>(null);
    const [newdata, setNewdata] = useState("");
    // const initialContent = infoS3;

    // }, 1000);
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setContents(infoS3);
        }
    }, [infoS3]);

    return (
        <>
            <SunEditor
                lang="es"
                width="100%"
                // height={'250'}
                defaultValue={infoS3}
                setContents={infoS3}
                disable={true}
                hideToolbar={true}
                setOptions={{
                    buttonList: [
                        ['undo', 'redo'],
                        ['font', 'fontSize', 'formatBlock'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['removeFormat'],
                        ['fontColor', 'hiliteColor'],
                        ['indent', 'outdent'],
                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                        ['table', 'link', 'image'],
                        ['fullScreen', 'showBlocks', 'codeView'],
                        ['preview', 'print'],
                        ['save']
                    ]
                }}
                setDefaultStyle="font-family: Comic Sans MS"
            // setContents={initialContent}
            />
        </>
    )
}

export { ShowEditorSun }

