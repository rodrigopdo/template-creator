import React, { useState, useEffect, useRef } from 'react';
import Modal from "react-modal";
import { AiOutlineClose } from 'react-icons/ai';
//COMPONENTS
import Button from '../Button';
//STYLES
import colors from '../../styles/colors'
import { 
  InputField, 
  ModalContainer, 
  ModalContent, 
  TextModal,
  ButtonContainer,
  ModalError,
  TextModalError,
  ImageModal
} from './styles';
// import { ErrorMessage } from '../../pages/Login/styles';

Modal.setAppElement("#root");

function ModalForm({
  isOpen,
  onRequestClose,
  status,
  statusImg,
  onClick,
  onChange,
  onBlur,
  error,
  msg,
  resetPassword,
  confirmation,
  fieldsNameList,
  width,
  onClickModal,
  value,
  refElement,
  placeholder,
  onClickModalFillFields,
  modalTitle,
  image,
}) {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: `${width ? width : '70%'}`,
      minWidth: '250px',
      maxWidth: '850px',
      height: 'auto',
      maxHeight: '100%',
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
  
  // const togglePassword = () => {
  //   setPasswordShown(!passwordShown);
  //   setVisible(!visible);
  // };

  // const [passwordShown, setPasswordShown] = useState(false);
  // const [visible, setVisible] = useState(false);

  return (
    <ModalContainer>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <ModalContent>
          <TextModal className="textmodal">
           {modalTitle}
          </TextModal>
          <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
            text="Fechar"
          >
          <span>
            <AiOutlineClose />
          </span>
          </button>

          <form onSubmit={onClick} action="#">
            {fieldsNameList != null ? 
              <>
                {
                  fieldsNameList.map((item, index) => (
                    <InputField key={index}>
                      <input 
                        type="text" 
                        id={`input${index}`}
                        ref={refElement}
                        name={item} 
                        placeholder={item}
                        onChange={onChange}  
                        onBlur={onBlur}
                        value={value}
                        required 
                      />
                    </InputField>
                  ))
                }
              </>:
              <ModalError>
                <ImageModal>
                  <img src={image}></img>
                </ImageModal>
                <TextModalError>
                 Ops, não há campos salvos... 
                </TextModalError>
              </ModalError> 
            }
            <ButtonContainer>
              <Button
                type="button"
                bgColor="transparent"
                color={colors.pureGreen}
                text="Fechar"
                onClick={onRequestClose}
                className="btn-modal"
              />
              <Button
                type="button"
                hoverColor={colors.pureGreen}
                  text="Preencher Campos"
                disabled={fieldsNameList == null}
                className="btn-modal"
                onClick={onClickModalFillFields}
              />
            </ButtonContainer>
          </form>
        </ModalContent>
      </Modal>
    </ModalContainer>
  );
}

export default ModalForm;


