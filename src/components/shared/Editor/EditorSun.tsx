import dynamic from "next/dynamic";
import { FC, useRef, ReactElement, useState, useEffect } from "react";
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
})

interface EditorProps {
  infoS3?: string
  handleChangeDataEditor?: (infoChild: string) => void;
}

const EditorSun: FC<EditorProps> = ({ infoS3 = "", handleChangeDataEditor }): ReactElement => {
  const [sunText, setSunText] = useState('')
  const editorRef = useRef<any>(null);

  const initialContent = infoS3;

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContents(infoS3);
    }
  }, [infoS3]);

  const handleEditorChange = (content: string) => {
    setSunText(content);
    if (handleChangeDataEditor) {
      handleChangeDataEditor(content);
    }
    console.log(content)
  };

  const isEditorDisabled = infoS3.length > 0;

  return (
    <div>
      <SunEditor
        lang="es"
        width="100%"
        // height={isEditorDisabled ? '500' : '400'}
        defaultValue={infoS3}
        disable={isEditorDisabled}
        hideToolbar={isEditorDisabled}
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
        onChange={handleEditorChange}
        placeholder={isEditorDisabled ? '' : 'Describe el problema que presentas'}
        // setContents={initialContent}
        setDefaultStyle="font-family: Comic Sans MS"
      />
    </div>
  )
}

export { EditorSun }