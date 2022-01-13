import { useContext, useRef } from "react"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
/* import 'codemirror/theme/neat.css' */
import "codemirror/mode/xml/xml"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/css/css"
import { Controlled } from "react-codemirror2"

import { saveCode } from "../../util/CodeAPI"
import CodeContext from "../../context/CodeContext"

export default function Editor({ displayName, language, value, onChange, currentTab }) {
  const { currentCode } = useContext(CodeContext)
  const codeRef = useRef()

  function handleChange(editor, data, value) {
      onChange(value)
      saveCode(currentCode, displayName.toLowerCase(), value)
  }


  return (
    <div style={{ display: currentTab === language ? 'flex' : 'none'}} className={`editor-container tabcontent ${language}`}>
      <div className="editor-title">
        {displayName}
      </div>

      <Controlled
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        ref={codeRef}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true,
        }}
      ></Controlled>
    </div>
  )
}
