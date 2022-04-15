import React, { useState } from 'react';
import Modal from "react-modal";

//COMPONENTS
import Button from '../Button';
//STYLES
import colors from '../../styles/colors'
import { ImageModal, InputSmaller, ModalContainer, ModalContent, TextModal } from './styles';
// import { ErrorMessage } from '../../pages/Login/styles';

Modal.setAppElement("#root");

function ModalSubmit({
  isOpen,
  onRequestClose,
  status,
  statusImg,
  onClick,
  error,
  msg,
  resetPassword,
  confirmation,
  forgotPassword,
  width,
  onClickModal
}) {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: `${width ? width : '25%'}`,
      minWidth: '250px',
      height: '296px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999
    },
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const [visible, setVisible] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setVisible(!visible);
  };

  return (
    <ModalContainer>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <ModalContent>
          <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
            text="Fechar"
          >
            {/* <img src={closeImg} alt="Fechar Modal" /> */}
          </button>
          <form onSubmit={onClick} action="#">
            <div>
              <ImageModal className={statusImg} />
            </div>
            <TextModal className="textmodal">{status}</TextModal>
            

            

            
          </form>
        </ModalContent>
      </Modal>
    </ModalContainer>
  );
}

export default ModalSubmit;


