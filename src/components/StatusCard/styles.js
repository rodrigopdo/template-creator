import styled from 'styled-components';

import colors from '../../styles/colors';

export const Card = styled.div `
  position: relative;
  width: 100%;
  min-width: 190px;
  max-width: 380px;
  height: 150px;
  min-height: 130px;
  /* max-height: 300px; */
  flex-direction: column;
  padding: 35px 25px;
  background-image:  ${({ theme }) => theme.cardBg};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 14px;
  border-radius: 5px;
  transition: color .9s ease 0s;
  margin: 10px 10px 30px 10px;
  border-right: 2px solid ${colors.cleanGreen2};
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    box-shadow: rgba(149, 157, 165, 0.05) 10px 8px 18px;
  }
  
  div:nth-child(1) {
    margin: 5px 0 20px auto;
    text-align: end;
    h4 {
      position: absolute;
      top: 20px;
      right: 20px;
      left: auto;
      max-width: 80%;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.cardTitle};
      opacity: 0.8;
      @media(max-width: 870px) {
        font-size: 0.7rem;
      }
    }
    h5 {
      position: absolute;
      max-width: 170px;
      text-align: end;
      top: 65px;
      right: 20px;
      font-size: 0.7rem;
      font-weight: 500;
      color: ${({ theme }) => theme.cardSubTitle};
    }
  }

  div:nth-child(2) {
 
    h4 {
      position: absolute;
      top: 80px;
      right: 20px;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.cardTitle};
      opacity: 0.8;
      @media(max-width: 870px) {
        font-size: 0.rem;
      }
    }
    h5 {
      position: absolute;
      max-width: 155px;
      text-align: end;
      top: 110px;
      right: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      color: ${({ theme }) => theme.cardSubTitle};
    }
  }
  p {
    position: absolute;
    top: 105px;
    right: 20px;
    font-size: 0.6rem;
    color:${({ theme }) => theme.cardLinkText};
  }

  div:nth-child(3) {
    position: absolute;
      top: 110px;
      right: 20px;
    img {
    height: 15px;
    color: ${colors.alertRed};
  }

  }
  
`;

