import { useEffect, useRef } from "react"
import { createCode, getData } from "../../util/CodeAPI"
import "./Modal.css"

export default function Modal({ modal, setModal, setCodePage, setCurrentCode }) {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleClose = e => {
      if(e.target.classList.contains('modal__container')) {
          setModal(false)
      }
  }

  const handleCreate = () => {
    const inputValue = inputRef.current.value.trim()
    if(inputValue !== '') {
        createCode(inputValue.trim())
        const code = getData()
        const codeId = code[code.length - 1]['id']
        setCurrentCode(codeId)
        setModal(false)
        setCodePage(true)
    }
  }

  return (
    <div
      style={{ display: modal ? "flex" : "none" }}
      className="modal__container"
      onClick={e => handleClose(e)}
    >
      <div className="modal">
        <span className="modal__close" onClick={() => setModal(false)}>&times;</span>
        <label htmlFor="title">Add a Title</label>
        <input
          className="modal__input"
          id="title"
          ref={inputRef}
          placeholder="Write a title..."
          name="title"
        />
        <button onClick={() => handleCreate()} className="modal__button">Create</button>
      </div>
    </div>
  )
}
