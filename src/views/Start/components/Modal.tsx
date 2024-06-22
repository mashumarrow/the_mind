import { useState } from "react";
import { Modal } from "@mui/material";

const ModalCard = () => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal: any = () => {
    setModal(false);
  };
  return (
    <>
      <button onClick={openModal}>modal</button>
      <Modal open={modal} onClose={closeModal}>
        <div className="text-4xl text-center font-extrabold mt-[310px] border-y-4 text-white border-double">
          判定中
        </div>
      </Modal>
    </>
  );
};
export default ModalCard;
