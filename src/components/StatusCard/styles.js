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
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 5px;
  transition: color .5s ease 0s;
  margin: 10px 10px 30px 10px;
  border-right: 2px solid ${colors.cleanGreen2};

  div:nth-child(1) {
 
    h4 {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.cardTitle};
      opacity: 0.8;
      @media(max-width: 870px) {
        font-size: 1.05rem;
      }
    }
    h5 {
      position: absolute;
      max-width: 170px;
      text-align: end;
      top: 55px;
      right: 20px;
      font-size: 0.8rem;
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
        font-size: 1.05rem;
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
  /* p {
    position: absolute;
    top: 95px;
    right: 20px;
    font-size: 0.6rem;
    color:${({ theme }) => theme.cardLinkText};
  } */
`;

