import { useState, useEffect, useContext } from "react"
import CodeContext from "../../context/CodeContext"
import Editor from "../Editor/Editor"
import { getCode, getTitle } from "../../util/CodeAPI"
import "./Tab.css"

export default function Tab({ setSrcDoc }) {
  const [currentTab, setCurrentTab] = useState("xml")
  const [html, setHtml] = useState("")
  const [css, setCss] = useState("")
  const [js, setJs] = useState("")

  const { setCodePage, currentCode, setCurrentCode } = useContext(CodeContext)

  useEffect(() => {
    setHtml(getCode(currentCode, "html"))
    setCss(getCode(currentCode, "css"))
    setJs(getCode(currentCode, "js"))
  }, [currentCode])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js, setSrcDoc])

  function scrollToBottom() {
    const iframe = document.querySelector(".output")
    iframe.scrollIntoView()
  }


  return (
    <>
      <div className="tab">

        <div className="tablink header">
          <span>{getTitle(currentCode).trim()}</span>

{/*           <button className="copy">
            <span className="tooltiptext">Copy to clipboard</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20,2H10C8.897,2,8,2.897,8,4v4H4c-1.103,0-2,0.897-2,2v10c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2v-4h4 c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M4,20V10h10l0.002,10H4z M20,14h-4v-4c0-1.103-0.897-2-2-2h-4V4h10V14z" />
              <path d="M6 12H12V14H6zM6 16H12V18H6z" />
            </svg>
          </button> */}

          <span className="scroll-down" onClick={() => scrollToBottom()}>
            <span className="tooltiptext">Scroll Down</span>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="mouse"
              >
                <path d="M11.975,22H12c3.859,0,7-3.14,7-7V9c0-3.841-3.127-6.974-6.981-7C12.013,2,12.006,2,12,2c-0.002,0-0.016,0-0.018,0 c-0.009,0-0.016,0-0.023,0C8.119,2.022,5,5.157,5,9v6C5,18.86,8.129,22,11.975,22z M7,9c0-2.751,2.238-4.994,4.985-5 C14.75,4.006,17,6.249,17,9v6c0,2.757-2.243,5-5,5h-0.025C9.186,20,7,17.804,7,15V9z" />
                <path d="M11 6H13V12H11z" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="arrow"
              >
                <path d="M18.707 12.707L17.293 11.293 13 15.586 13 6 11 6 11 15.586 6.707 11.293 5.293 12.707 12 19.414z" />
              </svg>
            </div>
          </span>
        </div>
        <button
          className={`tablink ${currentTab === "xml" ? "active" : ""}`}
          onClick={(e) => setCurrentTab("xml")}
        >
          HTML
        </button>
        <button
          className={`tablink ${currentTab === "css" ? "active" : ""}`}
          onClick={(e) => setCurrentTab("css")}
        >
          CSS
        </button>
        <button
          className={`tablink ${currentTab === "javascript" ? "active" : ""}`}
          onClick={(e) => setCurrentTab("javascript")}
        >
          Javascript
        </button>
        <button
          onClick={() => {
            setCurrentCode(null)
            setCodePage(false)
          }}
          className="tablink"
        >
          HomePage
        </button>

        <Editor
          displayName="HTML"
          language="xml"
          value={html}
          onChange={setHtml}
          currentTab={currentTab}
        />
        <Editor
          displayName="CSS"
          language="css"
          value={css}
          onChange={setCss}
          currentTab={currentTab}
        />
        <Editor
          displayName="JS"
          language="javascript"
          value={js}
          onChange={setJs}
          currentTab={currentTab}
        />
      </div>
    </>
  )
}
