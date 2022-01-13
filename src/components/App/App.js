import { useEffect, useState } from "react"

import "./App.css"
import Tab from "../Tab/Tab"
import CodeContext from "../../context/CodeContext"
import { getData, useCodePage, useCurrentCode } from "../../util/CodeAPI"
import Modal from "../Modal/Modal"
import DeleteModal from "../Modal/DeleteModal"

function App() {
  const [srcDoc, setSrcDoc] = useState("")
  const [codePage, setCodePage] = useCodePage()
  const [currentCode, setCurrentCode] = useCurrentCode(null)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteCodeId, setDeleteCodeId] = useState(null)

  const [codeData, setCodeData] = useState(getData())

  useEffect(() => {
    setCodeData(getData())
  }, [currentCode, codePage, deleteCodeId, deleteModal])

  function goToCode(codeId) {
    setCurrentCode(codeId)

    setCodePage(true)
  }

  const showDeleteModal = (codeId) => {
    setDeleteCodeId(codeId)
    setDeleteModal(true)
  }

  return (
    <CodeContext.Provider
      value={{
        setCodePage: setCodePage,
        currentCode: currentCode,
        setCurrentCode: setCurrentCode,
      }}
    >
      {codePage ? (
        <div className="page">
          <Tab setSrcDoc={setSrcDoc} />
          <iframe
            className="output"
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
          />
        </div>
      ) : (
        <>
          <div className="home">
            <div className="home__header">
              <h1>Codend</h1>
            </div>

            <div className="home__contents">
              <button onClick={() => setModal(true)} className="add-code">
                <span>+</span> New Code
              </button>
            
              <div className="home__codes">
                {codeData.map((code) => (
                  <div key={code.id} className="home__code">
                    <div className="code__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.375 16.781l1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4C2.138 11.409 2 11.696 2 12s.138.591.375.781L7.375 16.781zM16.625 7.219l-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4C21.862 12.591 22 12.304 22 12s-.138-.591-.375-.781L16.625 7.219z" />
                        <path
                          transform="rotate(102.527 12 12)"
                          d="M2.78 11H21.219V13.001H2.78z"
                        />
                      </svg>
                    </div>
                    <div
                      className="code__title"
                      onClick={() => goToCode(code.id)}
                    >
                      {code.title.length > 21
                        ? code.title.substring(0, 18).concat("...")
                        : code.title}
                    </div>
                    <button
                      onClick={() => showDeleteModal(code.id)}
                      className="code__delete"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Modal
            modal={modal}
            setCodePage={setCodePage}
            setModal={setModal}
            setCurrentCode={setCurrentCode}
          />

          <DeleteModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            codeId={deleteCodeId}
            setCodeId={setDeleteCodeId}
          />
        </>
      )}
    </CodeContext.Provider>
  )
}

export default App
