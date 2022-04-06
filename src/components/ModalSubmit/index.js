import React, { useState } from 'react';
import Modal from "react-modal";

//ASSETS
import Eye from '../../assets/img/Eye_Icon.png';
import EyeClose from '../../assets/img/Eye_Close_Icon.png';
import closeImg from "../../assets/img/close.svg";
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
          >
            <img src={closeImg} alt="Fechar Modal" />
          </button>
          <form onSubmit={onClick} action="#">
            <div>
              <ImageModal className={statusImg} />
            </div>
            <TextModal className="textmodal">{status}</TextModal>
            {forgotPassword &&
              <>
                <InputSmaller>
                  <i class="fas fa-envelope"></i>
                  <input type="email" name="email" placeholder="E-mail" autoFocus required />
                </InputSmaller>

                {/* <ErrorMessage className="error-msg" color={error ? colors.alertRed : colors.darkGreen}>{msg}</ErrorMessage> */}

                <Button
                  type="submit"
                  hoverColor={colors.pureGreen}
                  text="Enviar"
                  className="btn-modal"
                />
              </>

            }

            {resetPassword && (
              <>
                <InputSmaller>
                  <i className="fas fa-lock"></i>
                  <input
                    required
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    placeholder="Senha"
                  />
                  <img className="eye-toggle" src={visible ? Eye : EyeClose} alt="password toggle" onClick={togglePassword} />
                </InputSmaller>

                {/* <ErrorMessage className="error-msg" color={error ? colors.alertRed : colors.darkGreen}>{msg}</ErrorMessage> */}

                <Button
                  type="submit"
                  hoverColor={colors.pureGreen}
                  text="Alterar"
                  className="btn-modal"
                />
              </>
            )
            }

            {confirmation && (
              <Button
                type="submit"
                hoverColor={colors.pureGreen}
                text="Ok"
                className="btn-statusmodal"
                onClick={onRequestClose}
              />
            )
            }
          </form>
        </ModalContent>
      </Modal>
    </ModalContainer>
  );
}

export default ModalSubmit;


