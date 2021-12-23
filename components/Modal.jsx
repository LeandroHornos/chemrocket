import React from "react";

export const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
          <button
            class="btn btn-sm btn-outline-danger"
            type="button"
            onClick={handleClose}
          >
            Cerrar
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
