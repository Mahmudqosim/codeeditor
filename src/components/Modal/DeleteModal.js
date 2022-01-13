import { deleteCode } from "../../util/CodeAPI"
import "./Modal.css"

export default function DeleteModal({
  deleteModal,
  setDeleteModal,
  codeId,
  setCodeId,
}) {
  const handleClose = (e) => {
    if (e.target.classList.contains("modal__container")) {
      setDeleteModal(false)
    }
  }

  const handleDelete = () => {
    deleteCode(codeId)
    setCodeId(null)
    setDeleteModal(false)
  }

  return (
    <div
      style={{ display: deleteModal ? "flex" : "none" }}
      className="modal__container"
      onClick={(e) => handleClose(e)}
    >
      <div className="modal delete-modal">
        <div className="modal__message">Are you sure you want to delete this code?</div>
        <div className="modal__button-group">
          <button className="modal__button delete" onClick={() => handleDelete()}>
            Yes
          </button>
          <button
            className="modal__button"
            onClick={() => setDeleteModal(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}
