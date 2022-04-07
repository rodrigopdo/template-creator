import styled from 'styled-components';
import Modal from "react-modal";

import colors from '../../styles/colors';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  position: relative;

  ${'' /* @media(max-width: 900px) {
    width: 50% !important;
  }

  @media(max-width: 1200px) {
    width: 50% !important;
  } */}
`;

export const ModalContent = styled.div`
  overflow: hidden;
  width: 100%;
  
  .react-modal-close{
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;
    transition: filter 0.2s;

    &:hover{
    filter: brightness(0.8);
    }
  }

  form{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .eye-toggle{
    position: absolute;
    right: 20px;
    top: 10px;
    width: 22px;
    height: 22px;
    cursor: pointer;
  }
}

  .btn-modal{
    margin: 0 !important;
    width: 130px;
  }

  .btn-statusmodal{
    margin-top: 30px;
    width: 130px;
  }

  @media(max-width: 768px) {
    width: 100% !important;
  }

`;

// export const ImageModal = styled.i`
//   margin: 20px 0;
//   width: 70%;
//   color: ${colors.cleanGreen3};
//   font-size: 72px;
// `;

export const TextModal = styled.p`
  text-align: center;
  margin-top: 100px;
  font-weight: 500;
  font-size: 1rem;
  color: ${colors.gray2};

  /* .textsuccess {
    font-weight: 500;
    color: ${colors.cleanGreen2};
    font-size: 1.2rem;
  }
  .texterror {
    font-weight: 500;
    color: ${colors.gray4};
    font-size: 1.2rem;
  } */
`;

export const InputField = styled.div`
  max-width: 650px;
  width: 100%;
  background-color: ${colors.gray6};
  margin: 10px 0;
  height: 55px;
  border-radius: 50px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  align-items: center;
  position: relative;

  i {
  text-align: center;
  color: ${colors.gray4};
  transition: 0.5s;
  font-size: 1rem;
  }
  input {
  background: none;
  font-weight: 600;
  font-size: 1rem;
  color: ${colors.gray1};
  }
  input::placeholder {
  color: ${colors.gray4};
  font-size: 0.8rem;
  font-weight: 500;
  }
`;

export const InputSmaller = styled(InputField)`
  height: 45px;
  margin: 20px 0;
  font-size: 0.8rem;
`


