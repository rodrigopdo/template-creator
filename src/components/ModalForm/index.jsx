import React, { useState, useEffect, useRef } from 'react';
import Modal from "react-modal";

//ASSETS
import Eye from '../../assets/img/Eye_Icon.png';
import EyeClose from '../../assets/img/Eye_Close_Icon.png';
import closeImg from "../../assets/img/close.svg";
//COMPONENTS
import Button from '../Button';
//STYLES
import colors from '../../styles/colors'
import { 
  InputField, 
  ModalContainer, 
  ModalContent, 
  TextModal,
  ButtonContainer
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
  onClickModalFillFields
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
      maxHeight: '650px',
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
          <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
          >
            <img src={closeImg} alt="Fechar Modal" />
          </button>

          <form onSubmit={onClick} action="#">
            {/* <div>
              <ImageModal className={statusImg} />
            </div> */}
            <TextModal className="textmodal">
              Preencha os campos
            </TextModal>

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
              </>: <></>

            }
            <ButtonContainer>
              <Button
                type="button"
                bgColor="transparent"
                color={colors.pureGreen}
                text="Preencher Campos"
                className="btn-modal"
                onClick={onClickModalFillFields}
              />
              <Button
                type="submit"
                hoverColor={colors.pureGreen}
                text="Gerar PDF"
                className="btn-modal"
              />
            </ButtonContainer>
          </form>
        </ModalContent>
      </Modal>
    </ModalContainer>
  );
}

export default ModalForm;


